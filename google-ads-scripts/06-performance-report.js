/**
 * ============================================================================
 * PERFORMANCE REPORT — Google Ads Script
 * ============================================================================
 *
 * Exporta métricas diárias de desempenho das campanhas para Google Sheets,
 * criando um dashboard automático com:
 *
 *   - Impressões, Cliques, CTR, CPC, Conversões, CPA e Custo
 *   - Dados por campanha e por dia
 *   - Aba de resumo com totais e médias do período
 *   - Formatação automática (cores, negrito, formatos numéricos)
 *
 * Os dados são acumulados diariamente, formando um histórico completo
 * para análise de tendências e tomada de decisão.
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
  // URL da planilha Google Sheets para o relatório
  // Crie uma planilha vazia e cole a URL aqui
  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit',

  // Nome da aba para dados diários por campanha
  SHEET_DAILY: 'Dados Diários',

  // Nome da aba para resumo do período
  SHEET_SUMMARY: 'Resumo',

  // Período de análise em dias (padrão: últimos 30 dias)
  LOOKBACK_DAYS: 30,

  // Filtro de campanhas: '' = todas, ou nome parcial para filtrar
  CAMPAIGN_NAME_CONTAINS: '',

  // Incluir campanhas pausadas no relatório?
  INCLUDE_PAUSED: false,

  // Mínimo de impressões para incluir campanha no relatório
  MIN_IMPRESSIONS: 1,

  // Formato de data para exibição (padrão: dd/MM/yyyy)
  DATE_FORMAT: 'dd/MM/yyyy',

  // Moeda para formatação (R$ = Real brasileiro)
  CURRENCY_SYMBOL: 'R$',

  // Email para notificação quando relatório é gerado (vazio = não enviar)
  EMAIL_RECIPIENTS: '',

  // Assunto do email
  EMAIL_SUBJECT: '[RELATÓRIO] Performance Diária — Google Ads',

  // Limpar dados anteriores antes de gerar? (true = reescreve tudo)
  CLEAR_BEFORE_WRITE: true,

  // Cores do dashboard (formato HEX)
  COLORS: {
    HEADER_BG: '#1A73E8',
    HEADER_TEXT: '#FFFFFF',
    TOTAL_ROW_BG: '#E8F0FE',
    GOOD_CTR: '#34A853',     // CTR >= 3%
    MEDIUM_CTR: '#FBBC04',   // CTR entre 1% e 3%
    LOW_CTR: '#EA4335',      // CTR < 1%
    GOOD_CPA: '#34A853',     // CPA <= target
    HIGH_CPA: '#EA4335'      // CPA > target
  },

  // CPA target para coloração condicional (R$)
  CPA_TARGET: 50.00
};

// =============================================================================
// MAIN — Função principal executada pelo Google Ads
// =============================================================================

function main() {
  Logger.log('=== Performance Report — Início da execução ===');
  Logger.log('Data: ' + new Date().toISOString());

  var endDate = getDateString(1);   // Ontem
  var startDate = getDateString(CONFIG.LOOKBACK_DAYS);

  Logger.log('Período: ' + startDate + ' a ' + endDate);

  // Buscar dados de desempenho
  var dailyData = getDailyPerformance(startDate, endDate);
  Logger.log('Registros coletados: ' + dailyData.length);

  if (dailyData.length === 0) {
    Logger.log('Nenhum dado encontrado para o período.');
    return;
  }

  // Calcular resumo por campanha
  var summaryData = calculateSummary(dailyData);
  Logger.log('Campanhas no resumo: ' + summaryData.length);

  // Escrever na planilha
  writeDailySheet(dailyData);
  writeSummarySheet(summaryData);

  // Enviar email se configurado
  if (CONFIG.EMAIL_RECIPIENTS) {
    sendReport(summaryData, startDate, endDate);
  }

  Logger.log('=== Performance Report — Execução concluída ===');
}

// =============================================================================
// COLETA DE DADOS
// =============================================================================

/**
 * Busca dados diários de desempenho por campanha.
 */
function getDailyPerformance(startDate, endDate) {
  var data = [];

  var campaignCondition = CONFIG.INCLUDE_PAUSED
    ? "CampaignStatus IN ['ENABLED', 'PAUSED']"
    : "CampaignStatus = 'ENABLED'";

  var nameFilter = CONFIG.CAMPAIGN_NAME_CONTAINS
    ? " AND CampaignName CONTAINS_IGNORE_CASE '" + CONFIG.CAMPAIGN_NAME_CONTAINS + "'"
    : '';

  var query = 'SELECT CampaignName, Date, Impressions, Clicks, Ctr, ' +
              'AverageCpc, Conversions, CostPerConversion, Cost ' +
              'FROM CAMPAIGN_PERFORMANCE_REPORT ' +
              'WHERE ' + campaignCondition +
              ' AND Impressions >= ' + CONFIG.MIN_IMPRESSIONS +
              nameFilter +
              ' DURING ' + startDate.replace(/-/g, '') + ',' + endDate.replace(/-/g, '');

  var report = AdsApp.report(query);
  var rows = report.rows();

  while (rows.hasNext()) {
    var row = rows.next();

    data.push({
      date: row['Date'],
      campaign: row['CampaignName'],
      impressions: parseInt(row['Impressions'], 10) || 0,
      clicks: parseInt(row['Clicks'], 10) || 0,
      ctr: parseFloat(String(row['Ctr']).replace('%', '')) || 0,
      cpc: parseCurrency(row['AverageCpc']),
      conversions: parseFloat(row['Conversions']) || 0,
      cpa: parseCurrency(row['CostPerConversion']),
      cost: parseCurrency(row['Cost'])
    });
  }

  // Ordenar por data (mais recente primeiro) e depois por campanha
  data.sort(function(a, b) {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.campaign.localeCompare(b.campaign);
  });

  return data;
}

/**
 * Converte valor monetário do formato Google Ads para número.
 * Google Ads retorna microamounts (ex: 1500000 = R$1,50) ou strings formatadas.
 */
function parseCurrency(value) {
  if (!value) return 0;
  var str = String(value).replace(/[^\d.,\-]/g, '').replace(',', '.');
  var num = parseFloat(str);
  // Se for microamount (valor muito alto), converter
  if (num > 100000) {
    num = num / 1000000;
  }
  return isNaN(num) ? 0 : Math.round(num * 100) / 100;
}

// =============================================================================
// CÁLCULOS
// =============================================================================

/**
 * Calcula resumo agregado por campanha.
 */
function calculateSummary(dailyData) {
  var campaigns = {};

  for (var i = 0; i < dailyData.length; i++) {
    var row = dailyData[i];
    var name = row.campaign;

    if (!campaigns[name]) {
      campaigns[name] = {
        campaign: name,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        cost: 0,
        days: 0
      };
    }

    campaigns[name].impressions += row.impressions;
    campaigns[name].clicks += row.clicks;
    campaigns[name].conversions += row.conversions;
    campaigns[name].cost += row.cost;
    campaigns[name].days++;
  }

  // Converter para array e calcular métricas derivadas
  var summary = [];
  for (var campName in campaigns) {
    var camp = campaigns[campName];
    summary.push({
      campaign: camp.campaign,
      impressions: camp.impressions,
      clicks: camp.clicks,
      ctr: camp.impressions > 0 ? (camp.clicks / camp.impressions * 100) : 0,
      cpc: camp.clicks > 0 ? (camp.cost / camp.clicks) : 0,
      conversions: camp.conversions,
      cpa: camp.conversions > 0 ? (camp.cost / camp.conversions) : 0,
      cost: camp.cost,
      days: camp.days,
      avgDailyCost: camp.days > 0 ? (camp.cost / camp.days) : 0
    });
  }

  // Ordenar por custo (maior primeiro)
  summary.sort(function(a, b) {
    return b.cost - a.cost;
  });

  return summary;
}

// =============================================================================
// ESCRITA EM GOOGLE SHEETS
// =============================================================================

/**
 * Escreve os dados diários na planilha.
 */
function writeDailySheet(dailyData) {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(CONFIG.SPREADSHEET_URL);
    var sheet = spreadsheet.getSheetByName(CONFIG.SHEET_DAILY);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEET_DAILY);
    } else if (CONFIG.CLEAR_BEFORE_WRITE) {
      sheet.clear();
    }

    // Cabeçalho
    var headers = [
      'Data', 'Campanha', 'Impressões', 'Cliques',
      'CTR (%)', 'CPC (' + CONFIG.CURRENCY_SYMBOL + ')',
      'Conversões', 'CPA (' + CONFIG.CURRENCY_SYMBOL + ')',
      'Custo (' + CONFIG.CURRENCY_SYMBOL + ')'
    ];

    // Preparar dados em batch (muito mais rápido que appendRow)
    var allRows = [headers];

    for (var i = 0; i < dailyData.length; i++) {
      var row = dailyData[i];
      allRows.push([
        formatDate(row.date),
        row.campaign,
        row.impressions,
        row.clicks,
        roundTo(row.ctr, 2),
        roundTo(row.cpc, 2),
        roundTo(row.conversions, 1),
        roundTo(row.cpa, 2),
        roundTo(row.cost, 2)
      ]);
    }

    // Escrever todos os dados de uma vez
    var range = sheet.getRange(1, 1, allRows.length, allRows[0].length);
    range.setValues(allRows);

    // Formatar cabeçalho
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground(CONFIG.COLORS.HEADER_BG);
    headerRange.setFontColor(CONFIG.COLORS.HEADER_TEXT);
    headerRange.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);

    // Formatar colunas numéricas
    if (allRows.length > 1) {
      // Colunas de moeda (CPC, CPA, Custo)
      sheet.getRange(2, 6, allRows.length - 1, 1).setNumberFormat('#,##0.00');
      sheet.getRange(2, 8, allRows.length - 1, 1).setNumberFormat('#,##0.00');
      sheet.getRange(2, 9, allRows.length - 1, 1).setNumberFormat('#,##0.00');

      // CTR com percentual
      sheet.getRange(2, 5, allRows.length - 1, 1).setNumberFormat('#,##0.00');

      // Aplicar formatação condicional ao CTR
      applyConditionalFormatting(sheet, allRows.length);
    }

    // Auto-ajustar largura das colunas
    for (var c = 1; c <= headers.length; c++) {
      sheet.autoResizeColumn(c);
    }

    Logger.log('✅ Aba "' + CONFIG.SHEET_DAILY + '" atualizada com ' + dailyData.length + ' registros.');
  } catch (e) {
    Logger.log('❌ Erro ao escrever dados diários: ' + e.message);
  }
}

/**
 * Escreve o resumo por campanha na planilha.
 */
function writeSummarySheet(summaryData) {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(CONFIG.SPREADSHEET_URL);
    var sheet = spreadsheet.getSheetByName(CONFIG.SHEET_SUMMARY);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEET_SUMMARY);
    } else if (CONFIG.CLEAR_BEFORE_WRITE) {
      sheet.clear();
    }

    // Título do relatório
    var accountName = AdsApp.currentAccount().getName();
    var timezone = AdsApp.currentAccount().getTimeZone();
    var reportDate = Utilities.formatDate(new Date(), timezone, CONFIG.DATE_FORMAT);

    sheet.getRange(1, 1).setValue('📊 Relatório de Performance — ' + accountName);
    sheet.getRange(1, 1).setFontSize(14).setFontWeight('bold');
    sheet.getRange(2, 1).setValue('Período: últimos ' + CONFIG.LOOKBACK_DAYS +
                                   ' dias | Gerado em: ' + reportDate);
    sheet.getRange(2, 1).setFontColor('#666666');

    // Cabeçalho da tabela (a partir da linha 4)
    var headers = [
      'Campanha', 'Impressões', 'Cliques', 'CTR (%)',
      'CPC (' + CONFIG.CURRENCY_SYMBOL + ')', 'Conversões',
      'CPA (' + CONFIG.CURRENCY_SYMBOL + ')', 'Custo Total (' + CONFIG.CURRENCY_SYMBOL + ')',
      'Dias', 'Custo Médio/Dia (' + CONFIG.CURRENCY_SYMBOL + ')'
    ];

    var allRows = [headers];

    // Totais para a linha de resumo
    var totals = {
      impressions: 0, clicks: 0, conversions: 0, cost: 0, days: 0
    };

    for (var i = 0; i < summaryData.length; i++) {
      var camp = summaryData[i];

      allRows.push([
        camp.campaign,
        camp.impressions,
        camp.clicks,
        roundTo(camp.ctr, 2),
        roundTo(camp.cpc, 2),
        roundTo(camp.conversions, 1),
        roundTo(camp.cpa, 2),
        roundTo(camp.cost, 2),
        camp.days,
        roundTo(camp.avgDailyCost, 2)
      ]);

      totals.impressions += camp.impressions;
      totals.clicks += camp.clicks;
      totals.conversions += camp.conversions;
      totals.cost += camp.cost;
      if (camp.days > totals.days) totals.days = camp.days;
    }

    // Linha de totais
    var totalCtr = totals.impressions > 0 ? (totals.clicks / totals.impressions * 100) : 0;
    var totalCpc = totals.clicks > 0 ? (totals.cost / totals.clicks) : 0;
    var totalCpa = totals.conversions > 0 ? (totals.cost / totals.conversions) : 0;
    var totalAvgDaily = totals.days > 0 ? (totals.cost / totals.days) : 0;

    allRows.push([
      '📊 TOTAL',
      totals.impressions,
      totals.clicks,
      roundTo(totalCtr, 2),
      roundTo(totalCpc, 2),
      roundTo(totals.conversions, 1),
      roundTo(totalCpa, 2),
      roundTo(totals.cost, 2),
      totals.days,
      roundTo(totalAvgDaily, 2)
    ]);

    // Escrever dados a partir da linha 4
    var startRow = 4;
    var dataRange = sheet.getRange(startRow, 1, allRows.length, allRows[0].length);
    dataRange.setValues(allRows);

    // Formatar cabeçalho da tabela
    var headerRange = sheet.getRange(startRow, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground(CONFIG.COLORS.HEADER_BG);
    headerRange.setFontColor(CONFIG.COLORS.HEADER_TEXT);
    headerRange.setHorizontalAlignment('center');

    // Formatar linha de totais
    var totalRow = startRow + allRows.length - 1;
    var totalRange = sheet.getRange(totalRow, 1, 1, headers.length);
    totalRange.setFontWeight('bold');
    totalRange.setBackground(CONFIG.COLORS.TOTAL_ROW_BG);

    // Formatar colunas numéricas (CPC, CPA, Custo, Custo Médio)
    if (allRows.length > 1) {
      var dataRows = allRows.length - 1; // Excluir cabeçalho
      sheet.getRange(startRow + 1, 5, dataRows, 1).setNumberFormat('#,##0.00');
      sheet.getRange(startRow + 1, 7, dataRows, 1).setNumberFormat('#,##0.00');
      sheet.getRange(startRow + 1, 8, dataRows, 1).setNumberFormat('#,##0.00');
      sheet.getRange(startRow + 1, 10, dataRows, 1).setNumberFormat('#,##0.00');
    }

    // Auto-ajustar colunas
    for (var c = 1; c <= headers.length; c++) {
      sheet.autoResizeColumn(c);
    }

    sheet.setFrozenRows(startRow);

    Logger.log('✅ Aba "' + CONFIG.SHEET_SUMMARY + '" atualizada com ' + summaryData.length + ' campanhas.');
  } catch (e) {
    Logger.log('❌ Erro ao escrever resumo: ' + e.message);
  }
}

/**
 * Aplica formatação condicional à coluna de CTR.
 */
function applyConditionalFormatting(sheet, totalRows) {
  // Nota: Google Ads Scripts tem suporte limitado a conditional formatting
  // via SpreadsheetApp. Usamos coloração direta nos dados.
  try {
    var ctrRange = sheet.getRange(2, 5, totalRows - 1, 1);
    var ctrValues = ctrRange.getValues();
    var bgColors = [];

    for (var i = 0; i < ctrValues.length; i++) {
      var ctr = ctrValues[i][0];
      if (ctr >= 3) {
        bgColors.push([CONFIG.COLORS.GOOD_CTR]);
      } else if (ctr >= 1) {
        bgColors.push([CONFIG.COLORS.MEDIUM_CTR]);
      } else {
        bgColors.push([CONFIG.COLORS.LOW_CTR]);
      }
    }

    ctrRange.setBackgrounds(bgColors);
    ctrRange.setFontColor('#FFFFFF');
  } catch (e) {
    Logger.log('⚠️ Não foi possível aplicar formatação condicional: ' + e.message);
  }
}

// =============================================================================
// UTILIDADES
// =============================================================================

/**
 * Retorna string de data no formato YYYY-MM-DD.
 */
function getDateString(daysAgo) {
  var date = new Date();
  date.setDate(date.getDate() - daysAgo);
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}

/**
 * Formata data de YYYYMMDD ou YYYY-MM-DD para dd/MM/yyyy.
 */
function formatDate(dateStr) {
  var clean = dateStr.replace(/-/g, '');
  if (clean.length !== 8) return dateStr;
  return clean.substring(6, 8) + '/' + clean.substring(4, 6) + '/' + clean.substring(0, 4);
}

/**
 * Arredonda número para N casas decimais.
 */
function roundTo(num, decimals) {
  var factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

// =============================================================================
// ALERTA POR EMAIL
// =============================================================================

/**
 * Envia email com resumo do relatório de performance.
 */
function sendReport(summaryData, startDate, endDate) {
  var accountName = AdsApp.currentAccount().getName();
  var accountId = AdsApp.currentAccount().getCustomerId();

  var subject = CONFIG.EMAIL_SUBJECT + ' (' + accountName + ')';

  // Calcular totais
  var totals = { impressions: 0, clicks: 0, conversions: 0, cost: 0 };
  for (var i = 0; i < summaryData.length; i++) {
    totals.impressions += summaryData[i].impressions;
    totals.clicks += summaryData[i].clicks;
    totals.conversions += summaryData[i].conversions;
    totals.cost += summaryData[i].cost;
  }

  var totalCtr = totals.impressions > 0 ? (totals.clicks / totals.impressions * 100) : 0;
  var totalCpa = totals.conversions > 0 ? (totals.cost / totals.conversions) : 0;

  var body = [];
  body.push('📊 RELATÓRIO DE PERFORMANCE — GOOGLE ADS');
  body.push('═══════════════════════════════════════════════');
  body.push('');
  body.push('Conta: ' + accountName + ' (' + accountId + ')');
  body.push('Período: ' + formatDate(startDate) + ' a ' + formatDate(endDate));
  body.push('');
  body.push('RESUMO GERAL:');
  body.push('  Impressões: ' + totals.impressions.toLocaleString());
  body.push('  Cliques: ' + totals.clicks.toLocaleString());
  body.push('  CTR: ' + roundTo(totalCtr, 2) + '%');
  body.push('  Conversões: ' + roundTo(totals.conversions, 1));
  body.push('  CPA Médio: ' + CONFIG.CURRENCY_SYMBOL + ' ' + roundTo(totalCpa, 2));
  body.push('  Custo Total: ' + CONFIG.CURRENCY_SYMBOL + ' ' + roundTo(totals.cost, 2));
  body.push('');
  body.push('─────────────────────────────────────────────');
  body.push('POR CAMPANHA:');
  body.push('─────────────────────────────────────────────');

  for (var j = 0; j < summaryData.length; j++) {
    var camp = summaryData[j];
    body.push('');
    body.push('▸ ' + camp.campaign);
    body.push('  Impressões: ' + camp.impressions.toLocaleString() +
              ' | Cliques: ' + camp.clicks +
              ' | CTR: ' + roundTo(camp.ctr, 2) + '%');
    body.push('  Conversões: ' + roundTo(camp.conversions, 1) +
              ' | CPA: ' + CONFIG.CURRENCY_SYMBOL + ' ' + roundTo(camp.cpa, 2) +
              ' | Custo: ' + CONFIG.CURRENCY_SYMBOL + ' ' + roundTo(camp.cost, 2));
  }

  body.push('');
  body.push('─────────────────────────────────────────────');
  body.push('');
  body.push('📋 Relatório completo na planilha:');
  body.push(CONFIG.SPREADSHEET_URL);
  body.push('');
  body.push('Script: Performance Report v1.0.0');

  MailApp.sendEmail({
    to: CONFIG.EMAIL_RECIPIENTS,
    subject: subject,
    body: body.join('\n')
  });

  Logger.log('📧 Email de relatório enviado para: ' + CONFIG.EMAIL_RECIPIENTS);
}
