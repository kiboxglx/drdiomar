/**
 * ============================================================================
 * LINK CHECKER — Google Ads Script
 * ============================================================================
 *
 * Verifica se as URLs de destino (final URLs) de todos os anúncios ativos
 * retornam HTTP 200. Quando uma URL está quebrada (4xx, 5xx ou timeout):
 *
 *   - Pausa o anúncio automaticamente (se AUTO_PAUSE = true)
 *   - Registra o problema em Google Sheets
 *   - Envia alerta por email com a lista de URLs com problema
 *
 * Verificações incluem: status HTTP, redirecionamentos, e timeout.
 * Modo DRY RUN disponível para analisar sem pausar anúncios.
 *
 * INSTALAÇÃO:
 *   1. Acesse Google Ads > Ferramentas > Scripts
 *   2. Clique em "+ Script"
 *   3. Cole este código inteiro
 *   4. Crie uma planilha Google Sheets e copie a URL
 *   5. Configure as variáveis na seção CONFIG abaixo
 *   6. Autorize o script quando solicitado
 *   7. Agende execução diária (recomendado: 7h da manhã)
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
  // URL da planilha Google Sheets para log das verificações
  // Crie uma planilha vazia e cole a URL aqui
  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit',

  // Nome da aba na planilha (será criada automaticamente se não existir)
  SHEET_NAME: 'Link Checker Log',

  // Email(s) para receber alertas (separar múltiplos com vírgula)
  EMAIL_RECIPIENTS: 'seu-email@exemplo.com',

  // Pausar automaticamente anúncios com URLs quebradas?
  // true = pausa anúncios, false = apenas reporta
  AUTO_PAUSE: true,

  // Apenas analisar, sem pausar anúncios? (true = modo de teste)
  DRY_RUN: false,

  // Timeout em milissegundos para requisição HTTP (10s padrão)
  REQUEST_TIMEOUT_MS: 10000,

  // Códigos HTTP considerados válidos (normalmente apenas 200)
  VALID_HTTP_CODES: [200, 301, 302],

  // Seguir redirecionamentos? (Google Ads Scripts segue por padrão)
  FOLLOW_REDIRECTS: true,

  // Filtro de campanhas: '' = todas, ou nome parcial para filtrar
  CAMPAIGN_NAME_CONTAINS: '',

  // Incluir campanhas pausadas na verificação?
  INCLUDE_PAUSED_CAMPAIGNS: false,

  // Máximo de URLs a verificar por execução (evitar timeout do script)
  // Google Ads Scripts tem limite de 30 minutos de execução
  MAX_URLS_PER_RUN: 500,

  // Intervalo entre requisições em ms (evitar rate limiting)
  DELAY_BETWEEN_REQUESTS_MS: 200,

  // Máximo de anúncios a pausar por execução (segurança)
  MAX_PAUSES_PER_RUN: 50,

  // Assunto do email de alerta
  EMAIL_SUBJECT: '[ALERTA] URLs Quebradas Detectadas — Google Ads'
};

// =============================================================================
// MAIN — Função principal executada pelo Google Ads
// =============================================================================

function main() {
  Logger.log('=== Link Checker — Início da execução ===');
  Logger.log('Data: ' + new Date().toISOString());
  Logger.log('Modo: ' + (CONFIG.DRY_RUN ? 'DRY RUN (sem alterações)' : 'PRODUÇÃO'));

  var brokenLinks = [];
  var checkedCount = 0;
  var pausedCount = 0;
  var errorCount = 0;

  // Coletar todas as URLs únicas dos anúncios ativos
  var adUrls = collectAdUrls();
  Logger.log('Total de anúncios para verificar: ' + adUrls.length);

  if (adUrls.length === 0) {
    Logger.log('Nenhum anúncio encontrado para verificar.');
    return;
  }

  // Verificar cada URL
  for (var i = 0; i < adUrls.length && i < CONFIG.MAX_URLS_PER_RUN; i++) {
    var adInfo = adUrls[i];
    checkedCount++;

    if (i > 0 && CONFIG.DELAY_BETWEEN_REQUESTS_MS > 0) {
      Utilities.sleep(CONFIG.DELAY_BETWEEN_REQUESTS_MS);
    }

    var result = checkUrl(adInfo.finalUrl);

    if (!result.isValid) {
      errorCount++;
      var brokenInfo = {
        campaignName: adInfo.campaignName,
        adGroupName: adInfo.adGroupName,
        adId: adInfo.adId,
        headline: adInfo.headline,
        finalUrl: adInfo.finalUrl,
        httpStatus: result.statusCode,
        errorMessage: result.errorMessage,
        action: 'Nenhuma'
      };

      // Pausar anúncio se configurado
      if (CONFIG.AUTO_PAUSE && !CONFIG.DRY_RUN && pausedCount < CONFIG.MAX_PAUSES_PER_RUN) {
        var paused = pauseAd(adInfo.campaignName, adInfo.adGroupName, adInfo.adId);
        if (paused) {
          brokenInfo.action = 'Pausado';
          pausedCount++;
        } else {
          brokenInfo.action = 'Erro ao pausar';
        }
      } else if (CONFIG.DRY_RUN) {
        brokenInfo.action = 'DRY RUN — seria pausado';
      } else if (pausedCount >= CONFIG.MAX_PAUSES_PER_RUN) {
        brokenInfo.action = 'Limite de pausas atingido';
      }

      brokenLinks.push(brokenInfo);
      Logger.log('❌ QUEBRADA: ' + adInfo.finalUrl + ' → HTTP ' + result.statusCode +
                  ' (' + adInfo.campaignName + ')');
    } else {
      Logger.log('✅ OK: ' + adInfo.finalUrl + ' → HTTP ' + result.statusCode);
    }

    // Log progresso a cada 50 URLs
    if (checkedCount % 50 === 0) {
      Logger.log('Progresso: ' + checkedCount + '/' + Math.min(adUrls.length, CONFIG.MAX_URLS_PER_RUN) +
                  ' URLs verificadas...');
    }
  }

  // Resumo
  Logger.log('');
  Logger.log('=== RESUMO ===');
  Logger.log('URLs verificadas: ' + checkedCount);
  Logger.log('URLs com problema: ' + errorCount);
  Logger.log('Anúncios pausados: ' + pausedCount);

  // Registrar em Google Sheets
  if (brokenLinks.length > 0) {
    logToSheets(brokenLinks);
  }

  // Enviar alerta por email
  if (brokenLinks.length > 0 && CONFIG.EMAIL_RECIPIENTS) {
    sendAlert(brokenLinks, checkedCount, pausedCount);
  }

  Logger.log('=== Link Checker — Execução concluída ===');
}

// =============================================================================
// COLETA DE URLs
// =============================================================================

/**
 * Coleta todas as URLs finais dos anúncios ativos.
 * Retorna array de objetos com informações do anúncio.
 */
function collectAdUrls() {
  var ads = [];
  var seenUrls = {}; // Evitar verificar a mesma URL múltiplas vezes

  var campaignCondition = CONFIG.INCLUDE_PAUSED_CAMPAIGNS
    ? "CampaignStatus IN ['ENABLED', 'PAUSED']"
    : "CampaignStatus = 'ENABLED'";

  var nameFilter = CONFIG.CAMPAIGN_NAME_CONTAINS
    ? " AND CampaignName CONTAINS_IGNORE_CASE '" + CONFIG.CAMPAIGN_NAME_CONTAINS + "'"
    : '';

  var query = 'SELECT CampaignName, AdGroupName, Id, HeadlinePart1, ' +
              'CreativeFinalUrls, Status ' +
              'FROM AD_PERFORMANCE_REPORT ' +
              'WHERE ' + campaignCondition +
              " AND Status = 'ENABLED'" +
              ' AND Impressions > 0' +
              nameFilter +
              ' DURING LAST_30_DAYS';

  var report = AdsApp.report(query);
  var rows = report.rows();

  while (rows.hasNext()) {
    var row = rows.next();
    var finalUrls = row['CreativeFinalUrls'];

    // CreativeFinalUrls retorna string no formato "[url]" ou "url"
    var url = cleanUrl(finalUrls);

    if (url && !seenUrls[url]) {
      seenUrls[url] = true;
      ads.push({
        campaignName: row['CampaignName'],
        adGroupName: row['AdGroupName'],
        adId: row['Id'],
        headline: row['HeadlinePart1'] || '(sem headline)',
        finalUrl: url
      });
    }
  }

  return ads;
}

/**
 * Limpa a URL removendo colchetes e espaços.
 */
function cleanUrl(urlString) {
  if (!urlString) return null;
  // Remove colchetes, aspas e espaços
  var cleaned = urlString.replace(/[\[\]"'\s]/g, '').trim();
  // Validação básica
  if (cleaned.indexOf('http') !== 0) return null;
  return cleaned;
}

// =============================================================================
// VERIFICAÇÃO DE URL
// =============================================================================

/**
 * Verifica se uma URL está acessível.
 * Retorna objeto com isValid, statusCode e errorMessage.
 */
function checkUrl(url) {
  var result = {
    isValid: false,
    statusCode: 0,
    errorMessage: ''
  };

  try {
    var options = {
      muteHttpExceptions: true,
      followRedirects: CONFIG.FOLLOW_REDIRECTS,
      validateHttpsCertificates: true
    };

    var response = UrlFetchApp.fetch(url, options);
    result.statusCode = response.getResponseCode();

    // Verificar se o código está na lista de válidos
    var isValidCode = false;
    for (var i = 0; i < CONFIG.VALID_HTTP_CODES.length; i++) {
      if (result.statusCode === CONFIG.VALID_HTTP_CODES[i]) {
        isValidCode = true;
        break;
      }
    }

    if (isValidCode) {
      result.isValid = true;
    } else {
      result.errorMessage = 'HTTP ' + result.statusCode;
    }
  } catch (e) {
    result.statusCode = 0;
    result.errorMessage = e.message || 'Erro desconhecido';

    // Classificar tipos de erro comuns
    var errorStr = String(e).toLowerCase();
    if (errorStr.indexOf('timeout') !== -1) {
      result.errorMessage = 'Timeout após ' + (CONFIG.REQUEST_TIMEOUT_MS / 1000) + 's';
    } else if (errorStr.indexOf('dns') !== -1) {
      result.errorMessage = 'DNS não resolvido';
    } else if (errorStr.indexOf('ssl') !== -1 || errorStr.indexOf('certificate') !== -1) {
      result.errorMessage = 'Erro de certificado SSL';
    }
  }

  return result;
}

// =============================================================================
// AÇÕES SOBRE ANÚNCIOS
// =============================================================================

/**
 * Pausa um anúncio específico.
 * Retorna true se pausou com sucesso.
 */
function pauseAd(campaignName, adGroupName, adId) {
  try {
    var adIterator = AdsApp.ads()
      .withCondition("CampaignName = '" + campaignName.replace(/'/g, "\\'") + "'")
      .withCondition("AdGroupName = '" + adGroupName.replace(/'/g, "\\'") + "'")
      .withCondition('Id = ' + adId)
      .get();

    if (adIterator.hasNext()) {
      var ad = adIterator.next();
      ad.pause();
      Logger.log('⏸️ Anúncio pausado: ID ' + adId + ' (' + campaignName + ' > ' + adGroupName + ')');
      return true;
    } else {
      Logger.log('⚠️ Anúncio não encontrado para pausar: ID ' + adId);
      return false;
    }
  } catch (e) {
    Logger.log('❌ Erro ao pausar anúncio ' + adId + ': ' + e.message);
    return false;
  }
}

// =============================================================================
// LOG EM GOOGLE SHEETS
// =============================================================================

/**
 * Registra os links quebrados na planilha Google Sheets.
 */
function logToSheets(brokenLinks) {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(CONFIG.SPREADSHEET_URL);
    var sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
      // Cabeçalho
      sheet.appendRow([
        'Data/Hora',
        'Campanha',
        'Grupo de Anúncios',
        'ID do Anúncio',
        'Headline',
        'URL Final',
        'HTTP Status',
        'Erro',
        'Ação Tomada'
      ]);

      // Formatar cabeçalho
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285F4');
      headerRange.setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }

    var timestamp = Utilities.formatDate(new Date(), AdsApp.currentAccount().getTimeZone(), 'dd/MM/yyyy HH:mm');

    for (var i = 0; i < brokenLinks.length; i++) {
      var link = brokenLinks[i];
      sheet.appendRow([
        timestamp,
        link.campaignName,
        link.adGroupName,
        link.adId,
        link.headline,
        link.finalUrl,
        link.httpStatus || 'N/A',
        link.errorMessage,
        link.action
      ]);
    }

    Logger.log('✅ ' + brokenLinks.length + ' registros salvos na planilha.');
  } catch (e) {
    Logger.log('❌ Erro ao salvar na planilha: ' + e.message);
    Logger.log('Verifique se a URL da planilha está correta e se o script tem permissão.');
  }
}

// =============================================================================
// ALERTA POR EMAIL
// =============================================================================

/**
 * Envia email de alerta com a lista de URLs quebradas.
 */
function sendAlert(brokenLinks, checkedCount, pausedCount) {
  var accountName = AdsApp.currentAccount().getName();
  var accountId = AdsApp.currentAccount().getCustomerId();

  var subject = CONFIG.EMAIL_SUBJECT + ' (' + accountName + ')';

  var body = [];
  body.push('🔗 LINK CHECKER — RELATÓRIO DE URLs QUEBRADAS');
  body.push('═══════════════════════════════════════════════');
  body.push('');
  body.push('Conta: ' + accountName + ' (' + accountId + ')');
  body.push('Data: ' + Utilities.formatDate(new Date(), AdsApp.currentAccount().getTimeZone(), 'dd/MM/yyyy HH:mm'));
  body.push('Modo: ' + (CONFIG.DRY_RUN ? 'DRY RUN' : 'PRODUÇÃO'));
  body.push('');
  body.push('RESUMO:');
  body.push('  URLs verificadas: ' + checkedCount);
  body.push('  URLs com problema: ' + brokenLinks.length);
  body.push('  Anúncios pausados: ' + pausedCount);
  body.push('');
  body.push('─────────────────────────────────────────────');
  body.push('DETALHES DOS PROBLEMAS:');
  body.push('─────────────────────────────────────────────');

  for (var i = 0; i < brokenLinks.length; i++) {
    var link = brokenLinks[i];
    body.push('');
    body.push((i + 1) + '. ' + link.finalUrl);
    body.push('   Campanha: ' + link.campaignName);
    body.push('   Grupo: ' + link.adGroupName);
    body.push('   Headline: ' + link.headline);
    body.push('   Status: HTTP ' + (link.httpStatus || 'N/A') + ' — ' + link.errorMessage);
    body.push('   Ação: ' + link.action);
  }

  body.push('');
  body.push('─────────────────────────────────────────────');
  body.push('');
  body.push('PRÓXIMOS PASSOS RECOMENDADOS:');
  body.push('  1. Verifique manualmente as URLs listadas acima');
  body.push('  2. Corrija as páginas de destino ou atualize as URLs dos anúncios');
  body.push('  3. Reative os anúncios pausados após a correção');
  body.push('');
  body.push('Script: Link Checker v1.0.0');
  body.push('Log completo: ' + CONFIG.SPREADSHEET_URL);

  MailApp.sendEmail({
    to: CONFIG.EMAIL_RECIPIENTS,
    subject: subject,
    body: body.join('\n')
  });

  Logger.log('📧 Email de alerta enviado para: ' + CONFIG.EMAIL_RECIPIENTS);
}
