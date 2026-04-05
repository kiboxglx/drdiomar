/**
 * ============================================================================
 * BID ADJUSTER — Google Ads Script
 * ============================================================================
 *
 * Ajusta lances (bids) de palavras-chave automaticamente com base no CPA
 * (Custo Por Aquisição) target. Regras de ajuste:
 *
 *   - Keywords com CPA < CPA target → Aumenta bid em +15%
 *   - Keywords com CPA entre target e 2x target → Mantém bid atual
 *   - Keywords com CPA > 2x target → Reduz bid em -20%
 *
 * Todos os thresholds e percentuais são configuráveis. Inclui modo DRY RUN
 * para análise sem fazer alterações, limites de segurança, e log completo
 * em Google Sheets.
 *
 * INSTALAÇÃO:
 *   1. Acesse Google Ads > Ferramentas > Scripts
 *   2. Clique em "+ Script"
 *   3. Cole este código inteiro
 *   4. Crie uma planilha Google Sheets e copie a URL
 *   5. Configure as variáveis na seção CONFIG abaixo
 *   6. Autorize o script quando solicitado
 *   7. Agende execução diária (recomendado: 6h da manhã)
 *
 * FREQUÊNCIA RECOMENDADA: Diária
 *
 * @author Dr. Diomar Ads Automation
 * @version 1.0.0
 */

// =============================================================================
// CONFIG — Ajuste os parâmetros abaixo conforme necessário
// =============================================================================

var CONFIG = {
  // CPA target em R$ — referência para ajuste de bids
  CPA_TARGET: 25.00,

  // Multiplicador para considerar CPA "muito alto" (2.0 = 2x o target)
  CPA_HIGH_MULTIPLIER: 2.0,

  // Percentual de aumento para keywords com bom CPA (0.15 = +15%)
  BID_INCREASE_PERCENT: 0.15,

  // Percentual de redução para keywords com CPA muito alto (0.20 = -20%)
  BID_DECREASE_PERCENT: 0.20,

  // Bid máximo permitido em R$ (trava de segurança)
  MAX_BID: 15.00,

  // Bid mínimo permitido em R$ (trava de segurança)
  MIN_BID: 0.50,

  // Período de análise em dias para calcular CPA
  LOOKBACK_DAYS: 14,

  // Mínimo de conversões no período para considerar a keyword
  MIN_CONVERSIONS: 2,

  // Mínimo de cliques no período para considerar a keyword
  MIN_CLICKS: 10,

  // Filtro de campanhas: '' = todas, ou nome parcial
  CAMPAIGN_NAME_CONTAINS: '',

  // Apenas analisar, sem ajustar bids? (true = modo de teste)
  DRY_RUN: false,

  // Máximo de keywords a ajustar por execução (segurança)
  MAX_ADJUSTMENTS_PER_RUN: 100,

  // URL da planilha Google Sheets para log dos ajustes
  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit',

  // Nome da aba na planilha
  SHEET_NAME: 'Bid Adjustments Log',

  // Email para notificação (deixe vazio para não enviar)
  EMAIL_RECIPIENTS: '',

  // Assunto do email de notificação
  EMAIL_SUBJECT: '[BID ADJUSTER] Relatório de Ajustes — Google Ads'
};

// =============================================================================
// MAIN — Função principal executada pelo Google Ads
// =============================================================================

function main() {
  Logger.log('=== Bid Adjuster — Início da execução ===');
  Logger.log('Data: ' + new Date().toISOString());
  Logger.log('Modo: ' + (CONFIG.DRY_RUN ? '🔍 DRY RUN (apenas análise)' : '🚀 PRODUÇÃO (ajustando bids)'));
  Logger.log('CPA Target: R$ ' + CONFIG.CPA_TARGET.toFixed(2));
  Logger.log('CPA Alto (>' + CONFIG.CPA_HIGH_MULTIPLIER + 'x): R$ ' + (CONFIG.CPA_TARGET * CONFIG.CPA_HIGH_MULTIPLIER).toFixed(2));

  var startDate = getDateString(CONFIG.LOOKBACK_DAYS);
  var endDate = getDateString(1);

  Logger.log('Período de análise: ' + startDate + ' a ' + endDate);

  // Buscar métricas de keywords
  var keywords = getKeywordMetrics(startDate, endDate);
  Logger.log('Keywords com dados suficientes: ' + keywords.length);

  if (keywords.length === 0) {
    Logger.log('✅ Nenhuma keyword com dados suficientes para ajuste.');
    return;
  }

  // Classificar e ajustar keywords
  var increased = [];
  var decreased = [];
  var maintained = [];
  var capped = [];
  var totalAdjustments = 0;

  for (var i = 0; i < keywords.length; i++) {
    if (totalAdjustments >= CONFIG.MAX_ADJUSTMENTS_PER_RUN) {
      Logger.log('⚠️ Limite de ' + CONFIG.MAX_ADJUSTMENTS_PER_RUN + ' ajustes atingido. Restantes serão processados na próxima execução.');
      break;
    }

    var kw = keywords[i];
    var cpa = kw.cost / kw.conversions;
    var currentBid = kw.currentBid;
    var newBid = currentBid;
    var action = 'manter';

    if (cpa < CONFIG.CPA_TARGET) {
      // CPA bom — aumentar bid para capturar mais volume
      newBid = currentBid * (1 + CONFIG.BID_INCREASE_PERCENT);
      action = 'aumentar';
    } else if (cpa > CONFIG.CPA_TARGET * CONFIG.CPA_HIGH_MULTIPLIER) {
      // CPA muito alto — reduzir bid para controlar custo
      newBid = currentBid * (1 - CONFIG.BID_DECREASE_PERCENT);
      action = 'reduzir';
    } else {
      // CPA dentro do aceitável — manter
      maintained.push({
        keyword: kw.keyword,
        campaign: kw.campaignName,
        adGroup: kw.adGroupName,
        cpa: cpa,
        currentBid: currentBid,
        newBid: currentBid,
        action: 'MANTIDO'
      });
      continue;
    }

    // Aplicar limites de segurança
    var wasCapped = false;
    if (newBid > CONFIG.MAX_BID) {
      newBid = CONFIG.MAX_BID;
      wasCapped = true;
    }
    if (newBid < CONFIG.MIN_BID) {
      newBid = CONFIG.MIN_BID;
      wasCapped = true;
    }

    // Arredondar para 2 casas decimais
    newBid = Math.round(newBid * 100) / 100;

    // Evitar ajuste se bid não mudou significativamente (< R$0.01)
    if (Math.abs(newBid - currentBid) < 0.01) {
      maintained.push({
        keyword: kw.keyword,
        campaign: kw.campaignName,
        adGroup: kw.adGroupName,
        cpa: cpa,
        currentBid: currentBid,
        newBid: currentBid,
        action: 'MANTIDO (delta < R$0.01)'
      });
      continue;
    }

    var record = {
      keyword: kw.keyword,
      campaign: kw.campaignName,
      adGroup: kw.adGroupName,
      cpa: cpa,
      currentBid: currentBid,
      newBid: newBid,
      action: action === 'aumentar' ? 'AUMENTADO' : 'REDUZIDO',
      change: ((newBid - currentBid) / currentBid * 100).toFixed(1) + '%'
    };

    // Aplicar ajuste
    var success = applyBidChange(kw, newBid);

    if (success) {
      totalAdjustments++;
      if (action === 'aumentar') {
        increased.push(record);
      } else {
        decreased.push(record);
      }
      if (wasCapped) {
        capped.push(record);
      }
    }
  }

  // Resumo
  Logger.log('');
  Logger.log('=== RESULTADOS ===');
  Logger.log('📈 Bids aumentados (CPA < R$ ' + CONFIG.CPA_TARGET.toFixed(2) + '): ' + increased.length);
  Logger.log('📉 Bids reduzidos (CPA > R$ ' + (CONFIG.CPA_TARGET * CONFIG.CPA_HIGH_MULTIPLIER).toFixed(2) + '): ' + decreased.length);
  Logger.log('➡️ Bids mantidos: ' + maintained.length);
  if (capped.length > 0) {
    Logger.log('🔒 Limitados por trava (min/max): ' + capped.length);
  }
  Logger.log('Total de ajustes: ' + totalAdjustments);

  // Registrar na planilha
  var allAdjustments = increased.concat(decreased);
  logToSpreadsheet(allAdjustments, maintained);

  // Enviar notificação por email
  if (CONFIG.EMAIL_RECIPIENTS && allAdjustments.length > 0) {
    sendNotificationEmail(increased, decreased, maintained, capped);
  }

  Logger.log('=== Bid Adjuster — Execução finalizada ===');
}

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Busca métricas de keywords com volume suficiente para análise.
 * @param {string} startDate - Data inicial (YYYYMMDD)
 * @param {string} endDate - Data final (YYYYMMDD)
 * @returns {Array} Lista de keywords com métricas
 */
function getKeywordMetrics(startDate, endDate) {
  var nameFilter = CONFIG.CAMPAIGN_NAME_CONTAINS
    ? " AND CampaignName CONTAINS_IGNORE_CASE '" + CONFIG.CAMPAIGN_NAME_CONTAINS + "'"
    : '';

  var query = 'SELECT CampaignName, AdGroupName, Criteria, KeywordMatchType, ' +
    'Impressions, Clicks, Cost, Conversions, CpcBid ' +
    'FROM KEYWORDS_PERFORMANCE_REPORT ' +
    'WHERE CampaignStatus = \'ENABLED\' AND AdGroupStatus = \'ENABLED\' AND Status = \'ENABLED\'' +
    nameFilter + ' ' +
    'AND Conversions >= ' + CONFIG.MIN_CONVERSIONS + ' ' +
    'AND Clicks >= ' + CONFIG.MIN_CLICKS + ' ' +
    'DURING ' + startDate + ',' + endDate;

  var report = AdsApp.report(query);
  var rows = report.rows();
  var keywords = [];

  while (rows.hasNext()) {
    var row = rows.next();
    var conversions = parseFloat(row['Conversions']) || 0;

    // Pular keywords sem conversões (segurança adicional)
    if (conversions < CONFIG.MIN_CONVERSIONS) {
      continue;
    }

    keywords.push({
      keyword: row['Criteria'],
      matchType: row['KeywordMatchType'],
      campaignName: row['CampaignName'],
      adGroupName: row['AdGroupName'],
      impressions: parseInt(row['Impressions'], 10) || 0,
      clicks: parseInt(row['Clicks'], 10) || 0,
      cost: parseFloat(row['Cost']) || 0,
      conversions: conversions,
      currentBid: parseFloat(row['CpcBid']) || 0
    });
  }

  return keywords;
}

/**
 * Aplica a mudança de bid em uma keyword.
 * @param {Object} kw - Dados da keyword
 * @param {number} newBid - Novo valor de bid em R$
 * @returns {boolean} true se aplicado com sucesso
 */
function applyBidChange(kw, newBid) {
  if (CONFIG.DRY_RUN) {
    Logger.log('[DRY RUN] ' + kw.keyword + ' (' + kw.campaignName + '): R$ ' +
      kw.currentBid.toFixed(2) + ' → R$ ' + newBid.toFixed(2));
    return true;
  }

  try {
    var keywordIterator = AdsApp.keywords()
      .withCondition("CampaignName = '" + kw.campaignName.replace(/'/g, "\\'") + "'")
      .withCondition("AdGroupName = '" + kw.adGroupName.replace(/'/g, "\\'") + "'")
      .withCondition("Text = '" + kw.keyword.replace(/'/g, "\\'") + "'")
      .withCondition("Status = 'ENABLED'")
      .get();

    if (!keywordIterator.hasNext()) {
      Logger.log('⚠️ Keyword não encontrada: "' + kw.keyword + '" em "' + kw.campaignName + '/' + kw.adGroupName + '"');
      return false;
    }

    var keyword = keywordIterator.next();
    keyword.bidding().setCpc(newBid);

    Logger.log('✅ ' + kw.keyword + ': R$ ' + kw.currentBid.toFixed(2) + ' → R$ ' + newBid.toFixed(2) +
      ' (CPA: R$ ' + (kw.cost / kw.conversions).toFixed(2) + ')');
    return true;

  } catch (e) {
    Logger.log('❌ Erro ao ajustar "' + kw.keyword + '": ' + e.message);
    return false;
  }
}

/**
 * Registra resultados na planilha Google Sheets.
 * @param {Array} adjustments - Keywords ajustadas
 * @param {Array} maintained - Keywords mantidas
 */
function logToSpreadsheet(adjustments, maintained) {
  try {
    var ss = SpreadsheetApp.openByUrl(CONFIG.SPREADSHEET_URL);
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

    // Criar aba se não existir
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      sheet.appendRow([
        'Data/Hora',
        'Keyword',
        'Campanha',
        'Grupo de Anúncios',
        'CPA (R$)',
        'CPA Target (R$)',
        'Bid Anterior (R$)',
        'Bid Novo (R$)',
        'Variação',
        'Ação'
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    var timestamp = new Date().toLocaleString('pt-BR');

    // Registrar ajustes
    for (var i = 0; i < adjustments.length; i++) {
      var a = adjustments[i];
      sheet.appendRow([
        timestamp,
        a.keyword,
        a.campaign,
        a.adGroup,
        a.cpa.toFixed(2),
        CONFIG.CPA_TARGET.toFixed(2),
        a.currentBid.toFixed(2),
        a.newBid.toFixed(2),
        a.change,
        CONFIG.DRY_RUN ? 'DRY RUN — ' + a.action : a.action
      ]);
    }

    Logger.log('📊 ' + adjustments.length + ' ajuste(s) registrado(s) na planilha.');

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
 * Envia email com resumo dos ajustes realizados.
 * @param {Array} increased - Keywords com bid aumentado
 * @param {Array} decreased - Keywords com bid reduzido
 * @param {Array} maintained - Keywords mantidas
 * @param {Array} capped - Keywords limitadas por trava
 */
function sendNotificationEmail(increased, decreased, maintained, capped) {
  var total = increased.length + decreased.length;
  var formattedDate = new Date().toLocaleDateString('pt-BR');

  var htmlBody = '<html><body style="font-family: Arial, sans-serif; color: #333;">';
  htmlBody += '<h2 style="color: #1565c0;">📊 Bid Adjuster — Relatório ' + formattedDate + '</h2>';

  // Resumo
  htmlBody += '<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">';
  htmlBody += '<p style="margin: 5px 0;"><strong>CPA Target:</strong> R$ ' + CONFIG.CPA_TARGET.toFixed(2) + '</p>';
  htmlBody += '<p style="margin: 5px 0;">📈 <strong>' + increased.length + '</strong> bid(s) aumentado(s) (CPA abaixo do target)</p>';
  htmlBody += '<p style="margin: 5px 0;">📉 <strong>' + decreased.length + '</strong> bid(s) reduzido(s) (CPA acima de ' + CONFIG.CPA_HIGH_MULTIPLIER + 'x o target)</p>';
  htmlBody += '<p style="margin: 5px 0;">➡️ <strong>' + maintained.length + '</strong> keyword(s) mantida(s)</p>';
  if (capped.length > 0) {
    htmlBody += '<p style="margin: 5px 0;">🔒 <strong>' + capped.length + '</strong> limitada(s) por trava (min R$ ' + CONFIG.MIN_BID.toFixed(2) + ' / max R$ ' + CONFIG.MAX_BID.toFixed(2) + ')</p>';
  }
  htmlBody += '</div>';

  // Tabela de ajustes
  if (total > 0) {
    var allAdjustments = increased.concat(decreased);
    htmlBody += '<h3 style="color: #333; margin-top: 20px;">Ajustes Realizados</h3>';
    htmlBody += '<table style="border-collapse: collapse; width: 100%; max-width: 800px;">';
    htmlBody += '<tr style="background: #f5f5f5;">' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Keyword</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Campanha</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: right;">CPA</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Bid Anterior</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Bid Novo</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Ação</th></tr>';

    for (var i = 0; i < allAdjustments.length; i++) {
      var adj = allAdjustments[i];
      var actionColor = adj.action === 'AUMENTADO' ? '#2e7d32' : '#d32f2f';
      var actionIcon = adj.action === 'AUMENTADO' ? '📈' : '📉';

      htmlBody += '<tr>' +
        '<td style="padding: 8px; border: 1px solid #ddd;">' + adj.keyword + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd;">' + adj.campaign + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">R$ ' + adj.cpa.toFixed(2) + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">R$ ' + adj.currentBid.toFixed(2) + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">R$ ' + adj.newBid.toFixed(2) + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: ' + actionColor + ';">' +
        actionIcon + ' ' + adj.change + '</td></tr>';
    }

    htmlBody += '</table>';
  }

  htmlBody += '<hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">';
  htmlBody += '<p style="font-size: 12px; color: #999;">Gerado automaticamente pelo Bid Adjuster Script.<br>';
  htmlBody += 'Config: CPA Target R$ ' + CONFIG.CPA_TARGET.toFixed(2) + ' | ' +
    'Aumento +' + (CONFIG.BID_INCREASE_PERCENT * 100) + '% | ' +
    'Redução -' + (CONFIG.BID_DECREASE_PERCENT * 100) + '% | ' +
    'Período ' + CONFIG.LOOKBACK_DAYS + ' dias</p>';
  htmlBody += '</body></html>';

  MailApp.sendEmail({
    to: CONFIG.EMAIL_RECIPIENTS,
    subject: CONFIG.EMAIL_SUBJECT + ' — ' + total + ' ajuste(s)',
    htmlBody: htmlBody
  });

  Logger.log('📧 Email de notificação enviado para: ' + CONFIG.EMAIL_RECIPIENTS);
}
