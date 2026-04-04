/**
 * ============================================================================
 * ANOMALY DETECTOR — Google Ads Script
 * ============================================================================
 *
 * Detecta anomalias nas métricas de campanhas comparando o dia anterior
 * com a média dos últimos 7 dias. Envia alertas por email quando:
 *   - CTR cai mais de 30%
 *   - Conversões caem mais de 30%
 *   - CPC aumenta mais de 50%
 *
 * INSTALAÇÃO:
 *   1. Acesse Google Ads > Ferramentas > Scripts
 *   2. Clique em "+ Script"
 *   3. Cole este código inteiro
 *   4. Configure as variáveis na seção CONFIG abaixo
 *   5. Autorize o script quando solicitado
 *   6. Agende execução diária (recomendado: 8h da manhã)
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
  // Email(s) para receber alertas (separar múltiplos com vírgula)
  EMAIL_RECIPIENTS: 'seu-email@exemplo.com',

  // Limites de variação para disparar alerta (em decimal: 0.30 = 30%)
  CTR_DROP_THRESHOLD: 0.30,         // Queda de 30% no CTR
  CONVERSIONS_DROP_THRESHOLD: 0.30, // Queda de 30% nas conversões
  CPC_INCREASE_THRESHOLD: 0.50,     // Aumento de 50% no CPC

  // Período de referência para cálculo da média (em dias)
  LOOKBACK_DAYS: 7,

  // Mínimo de impressões no período para considerar a campanha
  MIN_IMPRESSIONS: 100,

  // Mínimo de cliques no período para considerar a campanha
  MIN_CLICKS: 10,

  // Filtro de campanhas: '' = todas, ou nome parcial para filtrar
  // Ex: 'Search' para apenas campanhas com "Search" no nome
  CAMPAIGN_NAME_CONTAINS: '',

  // Incluir campanhas pausadas na análise?
  INCLUDE_PAUSED: false,

  // Assunto do email de alerta
  EMAIL_SUBJECT: '[ALERTA] Anomalia Detectada — Google Ads'
};

// =============================================================================
// MAIN — Função principal executada pelo Google Ads
// =============================================================================

function main() {
  Logger.log('=== Anomaly Detector — Início da execução ===');
  Logger.log('Data: ' + new Date().toISOString());

  var today = getDateString(0);
  var yesterday = getDateString(1);
  var lookbackStart = getDateString(CONFIG.LOOKBACK_DAYS + 1);
  var lookbackEnd = getDateString(2); // Exclui ontem para comparação justa

  Logger.log('Analisando: ' + yesterday + ' vs média de ' + lookbackStart + ' a ' + lookbackEnd);

  var anomalies = [];

  // Buscar métricas de ontem
  var yesterdayData = getCampaignMetrics(yesterday, yesterday);

  // Buscar métricas do período de referência
  var lookbackData = getCampaignMetrics(lookbackStart, lookbackEnd);

  // Comparar cada campanha
  var campaignNames = Object.keys(yesterdayData);
  Logger.log('Campanhas analisadas: ' + campaignNames.length);

  for (var i = 0; i < campaignNames.length; i++) {
    var name = campaignNames[i];
    var yd = yesterdayData[name];
    var ld = lookbackData[name];

    if (!ld) {
      Logger.log('Campanha "' + name + '" sem dados no período de referência — ignorando.');
      continue;
    }

    // Calcular médias diárias do período de referência
    var avgCtr = ld.impressions > 0 ? (ld.clicks / ld.impressions) : 0;
    var avgConversions = ld.conversions / CONFIG.LOOKBACK_DAYS;
    var avgCpc = ld.clicks > 0 ? (ld.cost / ld.clicks) : 0;

    // Métricas de ontem
    var ydCtr = yd.impressions > 0 ? (yd.clicks / yd.impressions) : 0;
    var ydConversions = yd.conversions;
    var ydCpc = yd.clicks > 0 ? (yd.cost / yd.clicks) : 0;

    // Filtrar campanhas com volume insuficiente
    if (ld.impressions < CONFIG.MIN_IMPRESSIONS || ld.clicks < CONFIG.MIN_CLICKS) {
      continue;
    }

    var campaignAnomalies = [];

    // Verificar queda no CTR
    if (avgCtr > 0) {
      var ctrChange = (ydCtr - avgCtr) / avgCtr;
      if (ctrChange < -CONFIG.CTR_DROP_THRESHOLD) {
        campaignAnomalies.push({
          metric: 'CTR',
          yesterday: (ydCtr * 100).toFixed(2) + '%',
          average: (avgCtr * 100).toFixed(2) + '%',
          change: (ctrChange * 100).toFixed(1) + '%'
        });
      }
    }

    // Verificar queda nas conversões
    if (avgConversions > 0) {
      var convChange = (ydConversions - avgConversions) / avgConversions;
      if (convChange < -CONFIG.CONVERSIONS_DROP_THRESHOLD) {
        campaignAnomalies.push({
          metric: 'Conversões',
          yesterday: ydConversions.toFixed(1),
          average: avgConversions.toFixed(1),
          change: (convChange * 100).toFixed(1) + '%'
        });
      }
    }

    // Verificar aumento no CPC
    if (avgCpc > 0) {
      var cpcChange = (ydCpc - avgCpc) / avgCpc;
      if (cpcChange > CONFIG.CPC_INCREASE_THRESHOLD) {
        campaignAnomalies.push({
          metric: 'CPC',
          yesterday: 'R$ ' + ydCpc.toFixed(2),
          average: 'R$ ' + avgCpc.toFixed(2),
          change: '+' + (cpcChange * 100).toFixed(1) + '%'
        });
      }
    }

    if (campaignAnomalies.length > 0) {
      anomalies.push({
        campaign: name,
        issues: campaignAnomalies
      });
    }
  }

  // Enviar alerta se anomalias encontradas
  if (anomalies.length > 0) {
    Logger.log('⚠️ ' + anomalies.length + ' campanha(s) com anomalia detectada!');
    sendAlertEmail(anomalies, yesterday);
  } else {
    Logger.log('✅ Nenhuma anomalia detectada. Métricas dentro do esperado.');
  }

  Logger.log('=== Anomaly Detector — Execução finalizada ===');
}

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Busca métricas agregadas de campanhas para um período.
 * @param {string} startDate - Data inicial (YYYYMMDD)
 * @param {string} endDate - Data final (YYYYMMDD)
 * @returns {Object} Mapa de campanha → métricas
 */
function getCampaignMetrics(startDate, endDate) {
  var statusFilter = CONFIG.INCLUDE_PAUSED
    ? "CampaignStatus IN ['ENABLED', 'PAUSED']"
    : "CampaignStatus = 'ENABLED'";

  var nameFilter = CONFIG.CAMPAIGN_NAME_CONTAINS
    ? " AND CampaignName CONTAINS_IGNORE_CASE '" + CONFIG.CAMPAIGN_NAME_CONTAINS + "'"
    : '';

  var query = 'SELECT CampaignName, Impressions, Clicks, Cost, Conversions ' +
    'FROM CAMPAIGN_PERFORMANCE_REPORT ' +
    'WHERE ' + statusFilter + nameFilter + ' ' +
    'DURING ' + startDate + ',' + endDate;

  var report = AdsApp.report(query);
  var rows = report.rows();
  var data = {};

  while (rows.hasNext()) {
    var row = rows.next();
    var name = row['CampaignName'];

    if (!data[name]) {
      data[name] = { impressions: 0, clicks: 0, cost: 0, conversions: 0 };
    }

    data[name].impressions += parseInt(row['Impressions'], 10) || 0;
    data[name].clicks += parseInt(row['Clicks'], 10) || 0;
    data[name].cost += parseFloat(row['Cost']) || 0;
    data[name].conversions += parseFloat(row['Conversions']) || 0;
  }

  return data;
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
 * Envia email de alerta com detalhes das anomalias detectadas.
 * @param {Array} anomalies - Lista de anomalias por campanha
 * @param {string} date - Data analisada
 */
function sendAlertEmail(anomalies, date) {
  var formattedDate = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);

  var htmlBody = '<html><body style="font-family: Arial, sans-serif; color: #333;">';
  htmlBody += '<h2 style="color: #d32f2f;">⚠️ Anomalias Detectadas — ' + formattedDate + '</h2>';
  htmlBody += '<p>As seguintes campanhas apresentaram variações significativas em relação à média dos últimos ' +
    CONFIG.LOOKBACK_DAYS + ' dias:</p>';

  for (var i = 0; i < anomalies.length; i++) {
    var a = anomalies[i];
    htmlBody += '<h3 style="color: #1565c0; margin-top: 20px;">📊 ' + a.campaign + '</h3>';
    htmlBody += '<table style="border-collapse: collapse; width: 100%; max-width: 600px;">';
    htmlBody += '<tr style="background: #f5f5f5;">' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Métrica</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Ontem</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Média ' + CONFIG.LOOKBACK_DAYS + 'd</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Variação</th></tr>';

    for (var j = 0; j < a.issues.length; j++) {
      var issue = a.issues[j];
      var changeColor = issue.change.indexOf('+') === 0 ? '#d32f2f' : '#d32f2f';
      htmlBody += '<tr>' +
        '<td style="padding: 8px; border: 1px solid #ddd;">' + issue.metric + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">' + issue.yesterday + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">' + issue.average + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: ' + changeColor + '; font-weight: bold;">' +
        issue.change + '</td></tr>';
    }

    htmlBody += '</table>';
  }

  htmlBody += '<hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">';
  htmlBody += '<p style="font-size: 12px; color: #999;">Gerado automaticamente pelo Anomaly Detector Script.<br>';
  htmlBody += 'Configuração: CTR queda >' + (CONFIG.CTR_DROP_THRESHOLD * 100) + '% | ' +
    'Conversões queda >' + (CONFIG.CONVERSIONS_DROP_THRESHOLD * 100) + '% | ' +
    'CPC aumento >' + (CONFIG.CPC_INCREASE_THRESHOLD * 100) + '%</p>';
  htmlBody += '</body></html>';

  MailApp.sendEmail({
    to: CONFIG.EMAIL_RECIPIENTS,
    subject: CONFIG.EMAIL_SUBJECT + ' — ' + formattedDate,
    htmlBody: htmlBody
  });

  Logger.log('📧 Email de alerta enviado para: ' + CONFIG.EMAIL_RECIPIENTS);
}
