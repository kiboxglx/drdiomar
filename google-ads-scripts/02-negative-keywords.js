/**
 * ============================================================================
 * NEGATIVE KEYWORDS MANAGER — Google Ads Script
 * ============================================================================
 *
 * Analisa os termos de pesquisa dos últimos 30 dias e identifica termos
 * que gastaram acima do limite configurado (padrão: R$20) sem gerar
 * nenhuma conversão. Esses termos são adicionados automaticamente como
 * palavras-chave negativas na campanha correspondente.
 *
 * Todas as ações são registradas em uma planilha Google Sheets para
 * auditoria e acompanhamento.
 *
 * INSTALAÇÃO:
 *   1. Acesse Google Ads > Ferramentas > Scripts
 *   2. Clique em "+ Script"
 *   3. Cole este código inteiro
 *   4. Crie uma planilha Google Sheets e copie a URL
 *   5. Configure as variáveis na seção CONFIG abaixo
 *   6. Autorize o script quando solicitado
 *   7. Agende execução semanal (recomendado: segunda-feira às 7h)
 *
 * FREQUÊNCIA RECOMENDADA: Semanal
 *
 * @author Dr. Diomar Ads Automation
 * @version 1.0.0
 */

// =============================================================================
// CONFIG — Ajuste os parâmetros abaixo conforme necessário
// =============================================================================

var CONFIG = {
  // URL da planilha Google Sheets para log das negativas adicionadas
  // Crie uma planilha vazia e cole a URL aqui
  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit',

  // Nome da aba na planilha (será criada automaticamente se não existir)
  SHEET_NAME: 'Negative Keywords Log',

  // Gasto mínimo (em R$) sem conversão para considerar o termo como negativo
  MIN_COST_THRESHOLD: 20.00,

  // Período de análise em dias
  LOOKBACK_DAYS: 30,

  // Número mínimo de cliques para considerar o termo
  MIN_CLICKS: 3,

  // Tipo de correspondência da palavra-chave negativa
  // Opções: 'EXACT', 'PHRASE', 'BROAD'
  NEGATIVE_MATCH_TYPE: 'EXACT',

  // Filtro de campanhas: '' = todas, ou nome parcial
  CAMPAIGN_NAME_CONTAINS: '',

  // Apenas analisar, sem adicionar negativas? (true = modo de teste)
  DRY_RUN: false,

  // Email para notificação (deixe vazio para não enviar)
  EMAIL_RECIPIENTS: '',

  // Máximo de negativas a adicionar por execução (segurança)
  MAX_NEGATIVES_PER_RUN: 50,

  // Ignorar termos que já são palavras-chave negativas
  SKIP_EXISTING_NEGATIVES: true
};

// =============================================================================
// MAIN — Função principal executada pelo Google Ads
// =============================================================================

function main() {
  Logger.log('=== Negative Keywords Manager — Início da execução ===');
  Logger.log('Data: ' + new Date().toISOString());
  Logger.log('Modo: ' + (CONFIG.DRY_RUN ? '🔍 DRY RUN (apenas análise)' : '🚀 PRODUÇÃO (adicionando negativas)'));

  var startDate = getDateString(CONFIG.LOOKBACK_DAYS);
  var endDate = getDateString(1);

  Logger.log('Período: ' + startDate + ' a ' + endDate);
  Logger.log('Threshold: R$ ' + CONFIG.MIN_COST_THRESHOLD.toFixed(2) + ' gasto, 0 conversões');

  // Buscar termos problemáticos
  var wasteTerms = findWasteSearchTerms(startDate, endDate);
  Logger.log('Termos identificados: ' + wasteTerms.length);

  if (wasteTerms.length === 0) {
    Logger.log('✅ Nenhum termo de pesquisa problemático encontrado. Tudo limpo!');
    return;
  }

  // Limitar número de negativas por execução
  if (wasteTerms.length > CONFIG.MAX_NEGATIVES_PER_RUN) {
    Logger.log('⚠️ Limitando a ' + CONFIG.MAX_NEGATIVES_PER_RUN + ' negativas (de ' + wasteTerms.length + ' encontradas)');
    wasteTerms = wasteTerms.slice(0, CONFIG.MAX_NEGATIVES_PER_RUN);
  }

  // Ordenar por gasto (maior primeiro)
  wasteTerms.sort(function(a, b) { return b.cost - a.cost; });

  // Adicionar negativas
  var added = [];
  var skipped = [];
  var errors = [];

  for (var i = 0; i < wasteTerms.length; i++) {
    var term = wasteTerms[i];
    var result = addNegativeKeyword(term);

    if (result.status === 'added') {
      added.push(term);
    } else if (result.status === 'skipped') {
      skipped.push(term);
    } else {
      errors.push({ term: term, error: result.error });
    }
  }

  // Log resultados
  Logger.log('');
  Logger.log('=== RESULTADOS ===');
  Logger.log('Adicionadas: ' + added.length);
  Logger.log('Ignoradas (já existem): ' + skipped.length);
  Logger.log('Erros: ' + errors.length);

  // Calcular economia estimada
  var totalWaste = 0;
  for (var j = 0; j < added.length; j++) {
    totalWaste += added[j].cost;
  }
  Logger.log('💰 Gasto eliminado (estimativa mensal): R$ ' + totalWaste.toFixed(2));

  // Registrar na planilha
  logToSpreadsheet(added, skipped, errors);

  // Enviar notificação por email
  if (CONFIG.EMAIL_RECIPIENTS && added.length > 0) {
    sendNotificationEmail(added, totalWaste);
  }

  Logger.log('=== Negative Keywords Manager — Execução finalizada ===');
}

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Busca termos de pesquisa com gasto alto e zero conversões.
 * @param {string} startDate - Data inicial (YYYYMMDD)
 * @param {string} endDate - Data final (YYYYMMDD)
 * @returns {Array} Lista de termos problemáticos
 */
function findWasteSearchTerms(startDate, endDate) {
  var statusFilter = "CampaignStatus = 'ENABLED' AND AdGroupStatus = 'ENABLED'";

  var nameFilter = CONFIG.CAMPAIGN_NAME_CONTAINS
    ? " AND CampaignName CONTAINS_IGNORE_CASE '" + CONFIG.CAMPAIGN_NAME_CONTAINS + "'"
    : '';

  var query = 'SELECT Query, CampaignName, AdGroupName, Impressions, Clicks, Cost, Conversions ' +
    'FROM SEARCH_QUERY_PERFORMANCE_REPORT ' +
    'WHERE ' + statusFilter + nameFilter + ' ' +
    'AND Conversions < 1 ' +
    'AND Cost > ' + CONFIG.MIN_COST_THRESHOLD.toFixed(2) + ' ' +
    'AND Clicks >= ' + CONFIG.MIN_CLICKS + ' ' +
    'DURING ' + startDate + ',' + endDate;

  var report = AdsApp.report(query);
  var rows = report.rows();
  var terms = [];

  while (rows.hasNext()) {
    var row = rows.next();
    terms.push({
      query: row['Query'],
      campaignName: row['CampaignName'],
      adGroupName: row['AdGroupName'],
      impressions: parseInt(row['Impressions'], 10) || 0,
      clicks: parseInt(row['Clicks'], 10) || 0,
      cost: parseFloat(row['Cost']) || 0,
      conversions: parseFloat(row['Conversions']) || 0
    });
  }

  return terms;
}

/**
 * Adiciona um termo como palavra-chave negativa na campanha.
 * @param {Object} term - Objeto com dados do termo
 * @returns {Object} Resultado: { status, error? }
 */
function addNegativeKeyword(term) {
  if (CONFIG.DRY_RUN) {
    Logger.log('[DRY RUN] Seria adicionado: "' + term.query + '" na campanha "' + term.campaignName + '" (R$ ' + term.cost.toFixed(2) + ')');
    return { status: 'added' };
  }

  try {
    var campaignIterator = AdsApp.campaigns()
      .withCondition("Name = '" + term.campaignName.replace(/'/g, "\\'") + "'")
      .get();

    if (!campaignIterator.hasNext()) {
      return { status: 'error', error: 'Campanha não encontrada: ' + term.campaignName };
    }

    var campaign = campaignIterator.next();

    // Verificar se já existe como negativa
    if (CONFIG.SKIP_EXISTING_NEGATIVES) {
      var existingIterator = campaign.negativeKeywords()
        .withCondition("KeywordText = '" + term.query.replace(/'/g, "\\'") + "'")
        .get();

      if (existingIterator.hasNext()) {
        Logger.log('⏭️ Já existe: "' + term.query + '" em "' + term.campaignName + '"');
        return { status: 'skipped' };
      }
    }

    // Adicionar negativa com o tipo de correspondência configurado
    if (CONFIG.NEGATIVE_MATCH_TYPE === 'EXACT') {
      campaign.createNegativeKeyword('[' + term.query + ']');
    } else if (CONFIG.NEGATIVE_MATCH_TYPE === 'PHRASE') {
      campaign.createNegativeKeyword('"' + term.query + '"');
    } else {
      campaign.createNegativeKeyword(term.query);
    }

    Logger.log('✅ Adicionada: "' + term.query + '" → "' + term.campaignName + '" (R$ ' + term.cost.toFixed(2) + ' desperdiçados)');
    return { status: 'added' };

  } catch (e) {
    Logger.log('❌ Erro ao adicionar "' + term.query + '": ' + e.message);
    return { status: 'error', error: e.message };
  }
}

/**
 * Registra resultados na planilha Google Sheets.
 * @param {Array} added - Termos adicionados
 * @param {Array} skipped - Termos ignorados
 * @param {Array} errors - Termos com erro
 */
function logToSpreadsheet(added, skipped, errors) {
  try {
    var ss = SpreadsheetApp.openByUrl(CONFIG.SPREADSHEET_URL);
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

    // Criar aba se não existir
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      // Cabeçalho
      sheet.appendRow([
        'Data/Hora',
        'Termo de Pesquisa',
        'Campanha',
        'Grupo de Anúncios',
        'Impressões',
        'Cliques',
        'Custo (R$)',
        'Conversões',
        'Status',
        'Tipo Correspondência'
      ]);
      // Formatar cabeçalho
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    var timestamp = new Date().toLocaleString('pt-BR');

    // Registrar termos adicionados
    for (var i = 0; i < added.length; i++) {
      var t = added[i];
      sheet.appendRow([
        timestamp,
        t.query,
        t.campaignName,
        t.adGroupName,
        t.impressions,
        t.clicks,
        t.cost.toFixed(2),
        t.conversions,
        CONFIG.DRY_RUN ? 'DRY RUN' : 'ADICIONADA',
        CONFIG.NEGATIVE_MATCH_TYPE
      ]);
    }

    // Registrar termos ignorados
    for (var j = 0; j < skipped.length; j++) {
      var s = skipped[j];
      sheet.appendRow([
        timestamp,
        s.query,
        s.campaignName,
        s.adGroupName,
        s.impressions,
        s.clicks,
        s.cost.toFixed(2),
        s.conversions,
        'JÁ EXISTIA',
        CONFIG.NEGATIVE_MATCH_TYPE
      ]);
    }

    // Registrar erros
    for (var k = 0; k < errors.length; k++) {
      var e = errors[k];
      sheet.appendRow([
        timestamp,
        e.term.query,
        e.term.campaignName,
        e.term.adGroupName,
        e.term.impressions,
        e.term.clicks,
        e.term.cost.toFixed(2),
        e.term.conversions,
        'ERRO: ' + e.error,
        CONFIG.NEGATIVE_MATCH_TYPE
      ]);
    }

    Logger.log('📊 Resultados registrados na planilha.');

  } catch (e) {
    Logger.log('⚠️ Erro ao gravar na planilha: ' + e.message);
    Logger.log('   Verifique se a URL da planilha está correta e o script tem permissão.');
  }
}

/**
 * Retorna data no formato YYYYMMDD, N dias atrás.
 * @param {number} daysAgo - Número de dias no passado (0 = hoje)
 * @returns {string} Data formatada
 */
function getDateString(daysAgo) {
  var date = new Date();
  date.setDate(date.getDate() - daysAgo);
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return year + month + day;
}

/**
 * Envia email com resumo das negativas adicionadas.
 * @param {Array} added - Termos adicionados
 * @param {number} totalWaste - Gasto total eliminado
 */
function sendNotificationEmail(added, totalWaste) {
  var htmlBody = '<html><body style="font-family: Arial, sans-serif; color: #333;">';
  htmlBody += '<h2 style="color: #2e7d32;">🚫 Negative Keywords — Relatório</h2>';
  htmlBody += '<p><strong>' + added.length + '</strong> palavra(s)-chave negativa(s) adicionada(s).</p>';
  htmlBody += '<p>💰 Economia mensal estimada: <strong>R$ ' + totalWaste.toFixed(2) + '</strong></p>';

  htmlBody += '<table style="border-collapse: collapse; width: 100%; max-width: 700px; margin-top: 15px;">';
  htmlBody += '<tr style="background: #f5f5f5;">' +
    '<th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Termo</th>' +
    '<th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Campanha</th>' +
    '<th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Custo</th>' +
    '<th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Cliques</th></tr>';

  for (var i = 0; i < added.length; i++) {
    var t = added[i];
    htmlBody += '<tr>' +
      '<td style="padding: 8px; border: 1px solid #ddd;">' + t.query + '</td>' +
      '<td style="padding: 8px; border: 1px solid #ddd;">' + t.campaignName + '</td>' +
      '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">R$ ' + t.cost.toFixed(2) + '</td>' +
      '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">' + t.clicks + '</td></tr>';
  }

  htmlBody += '</table>';
  htmlBody += '<hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">';
  htmlBody += '<p style="font-size: 12px; color: #999;">Gerado automaticamente pelo Negative Keywords Manager Script.</p>';
  htmlBody += '</body></html>';

  MailApp.sendEmail({
    to: CONFIG.EMAIL_RECIPIENTS,
    subject: '🚫 Negative Keywords — ' + added.length + ' adicionadas (R$ ' + totalWaste.toFixed(2) + ' economizados)',
    htmlBody: htmlBody
  });

  Logger.log('📧 Email de notificação enviado para: ' + CONFIG.EMAIL_RECIPIENTS);
}
