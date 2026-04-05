/**
 * ============================================================================
 * BUDGET PACER — Google Ads Script
 * ============================================================================
 *
 * Calcula o gasto ideal diário com base na meta mensal de orçamento e nos
 * dias restantes no mês. Ajusta o budget diário automaticamente para
 * manter o pacing dentro da meta.
 *
 * Alertas:
 *   - Pace > 110% → Alerta de overspending (gasto acima do planejado)
 *   - Pace < 80%  → Alerta de underspending (gasto abaixo do planejado)
 *
 * Todas as análises e ajustes são registrados em Google Sheets para
 * acompanhamento histórico.
 *
 * INSTALAÇÃO:
 *   1. Acesse Google Ads > Ferramentas > Scripts
 *   2. Clique em "+ Script"
 *   3. Cole este código inteiro
 *   4. Crie uma planilha Google Sheets e copie a URL
 *   5. Configure as variáveis na seção CONFIG abaixo
 *   6. Autorize o script quando solicitado
 *   7. Agende execução diária (recomendado: 9h da manhã)
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
  // Meta de orçamento mensal total em R$ (soma de todas as campanhas monitoradas)
  MONTHLY_BUDGET_TARGET: 800.00,

  // Limite superior do pace para alerta (1.10 = 110%)
  PACE_HIGH_THRESHOLD: 1.10,

  // Limite inferior do pace para alerta (0.80 = 80%)
  PACE_LOW_THRESHOLD: 0.80,

  // Ajustar budget diário automaticamente? (true = ajusta, false = apenas alerta)
  AUTO_ADJUST_BUDGET: true,

  // Percentual máximo de aumento do budget diário original (0.30 = +30%)
  MAX_BUDGET_INCREASE_PERCENT: 0.30,

  // Percentual máximo de redução do budget diário original (0.30 = -30%)
  MAX_BUDGET_DECREASE_PERCENT: 0.30,

  // Budget diário mínimo permitido em R$ (trava de segurança)
  MIN_DAILY_BUDGET: 10.00,

  // Budget diário máximo permitido em R$ (trava de segurança)
  MAX_DAILY_BUDGET: 35.00,

  // Filtro de campanhas: '' = todas, ou nome parcial
  CAMPAIGN_NAME_CONTAINS: '',

  // Incluir apenas campanhas ativas?
  ENABLED_ONLY: true,

  // Apenas analisar, sem ajustar budgets? (true = modo de teste)
  DRY_RUN: false,

  // URL da planilha Google Sheets para log
  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit',

  // Nome da aba na planilha
  SHEET_NAME: 'Budget Pacing Log',

  // Email para alertas (deixe vazio para não enviar)
  EMAIL_RECIPIENTS: 'seu-email@exemplo.com',

  // Assunto do email de alerta
  EMAIL_SUBJECT: '[BUDGET PACER] Alerta de Pacing — Google Ads'
};

// =============================================================================
// MAIN — Função principal executada pelo Google Ads
// =============================================================================

function main() {
  Logger.log('=== Budget Pacer — Início da execução ===');
  Logger.log('Data: ' + new Date().toISOString());
  Logger.log('Modo: ' + (CONFIG.DRY_RUN ? '🔍 DRY RUN (apenas análise)' : '🚀 PRODUÇÃO'));
  Logger.log('Meta mensal: R$ ' + CONFIG.MONTHLY_BUDGET_TARGET.toFixed(2));

  // Calcular dias do mês e dias restantes
  var today = new Date();
  var currentDay = today.getDate();
  var totalDaysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth());
  var daysRemaining = totalDaysInMonth - currentDay + 1; // Inclui hoje
  var daysElapsed = currentDay - 1;

  Logger.log('Dia do mês: ' + currentDay + '/' + totalDaysInMonth);
  Logger.log('Dias decorridos: ' + daysElapsed + ' | Dias restantes: ' + daysRemaining);

  // Calcular gasto ideal até hoje
  var idealDailySpend = CONFIG.MONTHLY_BUDGET_TARGET / totalDaysInMonth;
  var idealSpendToDate = idealDailySpend * daysElapsed;

  Logger.log('Gasto diário ideal: R$ ' + idealDailySpend.toFixed(2));
  Logger.log('Gasto ideal até hoje: R$ ' + idealSpendToDate.toFixed(2));

  // Buscar gasto real do mês
  var firstDayOfMonth = getFirstDayOfMonth(today);
  var yesterday = getDateString(1);
  var campaignData = getCampaignSpend(firstDayOfMonth, yesterday);
  var actualSpendToDate = campaignData.totalSpend;

  Logger.log('Gasto real até ontem: R$ ' + actualSpendToDate.toFixed(2));

  // Calcular pacing
  var pace = idealSpendToDate > 0 ? (actualSpendToDate / idealSpendToDate) : 0;
  var pacePercent = (pace * 100).toFixed(1);
  var budgetRemaining = CONFIG.MONTHLY_BUDGET_TARGET - actualSpendToDate;
  var idealDailyRemaining = daysRemaining > 0 ? (budgetRemaining / daysRemaining) : 0;

  Logger.log('');
  Logger.log('=== ANÁLISE DE PACING ===');
  Logger.log('Pace atual: ' + pacePercent + '%');
  Logger.log('Orçamento restante: R$ ' + budgetRemaining.toFixed(2));
  Logger.log('Gasto diário necessário (restante): R$ ' + idealDailyRemaining.toFixed(2));

  // Determinar status do pacing
  var paceStatus = 'OK';
  var alertType = '';

  if (pace > CONFIG.PACE_HIGH_THRESHOLD) {
    paceStatus = 'OVERSPENDING';
    alertType = 'high';
    Logger.log('🔴 OVERSPENDING — Pace ' + pacePercent + '% acima do limite (' + (CONFIG.PACE_HIGH_THRESHOLD * 100) + '%)');
  } else if (pace < CONFIG.PACE_LOW_THRESHOLD) {
    paceStatus = 'UNDERSPENDING';
    alertType = 'low';
    Logger.log('🟡 UNDERSPENDING — Pace ' + pacePercent + '% abaixo do limite (' + (CONFIG.PACE_LOW_THRESHOLD * 100) + '%)');
  } else {
    Logger.log('🟢 Pacing dentro do esperado (' +
      (CONFIG.PACE_LOW_THRESHOLD * 100) + '% - ' + (CONFIG.PACE_HIGH_THRESHOLD * 100) + '%)');
  }

  // Ajustar budgets por campanha se necessário
  var adjustments = [];
  if (CONFIG.AUTO_ADJUST_BUDGET && paceStatus !== 'OK') {
    adjustments = adjustCampaignBudgets(campaignData.campaigns, idealDailyRemaining, paceStatus);
  }

  // Construir resumo de pacing
  var pacingSummary = {
    date: new Date().toLocaleDateString('pt-BR'),
    day: currentDay,
    totalDays: totalDaysInMonth,
    daysRemaining: daysRemaining,
    monthlyTarget: CONFIG.MONTHLY_BUDGET_TARGET,
    idealSpendToDate: idealSpendToDate,
    actualSpendToDate: actualSpendToDate,
    pace: pace,
    pacePercent: pacePercent,
    paceStatus: paceStatus,
    budgetRemaining: budgetRemaining,
    idealDailyRemaining: idealDailyRemaining,
    adjustments: adjustments,
    campaignCount: campaignData.campaigns.length
  };

  // Registrar na planilha
  logToSpreadsheet(pacingSummary);

  // Enviar alerta se pace fora dos limites
  if (CONFIG.EMAIL_RECIPIENTS && alertType) {
    sendAlertEmail(pacingSummary);
  }

  Logger.log('=== Budget Pacer — Execução finalizada ===');
}

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Busca gasto real por campanha no período.
 * @param {string} startDate - Data inicial (YYYYMMDD)
 * @param {string} endDate - Data final (YYYYMMDD)
 * @returns {Object} { totalSpend, campaigns[] }
 */
function getCampaignSpend(startDate, endDate) {
  var statusFilter = CONFIG.ENABLED_ONLY
    ? "CampaignStatus = 'ENABLED'"
    : "CampaignStatus IN ['ENABLED', 'PAUSED']";

  var nameFilter = CONFIG.CAMPAIGN_NAME_CONTAINS
    ? " AND CampaignName CONTAINS_IGNORE_CASE '" + CONFIG.CAMPAIGN_NAME_CONTAINS + "'"
    : '';

  var query = 'SELECT CampaignName, CampaignId, Cost, Impressions, Clicks, Conversions, Amount ' +
    'FROM CAMPAIGN_PERFORMANCE_REPORT ' +
    'WHERE ' + statusFilter + nameFilter + ' ' +
    'DURING ' + startDate + ',' + endDate;

  var report = AdsApp.report(query);
  var rows = report.rows();
  var campaigns = {};
  var totalSpend = 0;

  while (rows.hasNext()) {
    var row = rows.next();
    var name = row['CampaignName'];
    var cost = parseFloat(row['Cost']) || 0;

    if (!campaigns[name]) {
      campaigns[name] = {
        name: name,
        id: row['CampaignId'],
        totalCost: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        dailyBudget: parseFloat(row['Amount']) || 0
      };
    }

    campaigns[name].totalCost += cost;
    campaigns[name].impressions += parseInt(row['Impressions'], 10) || 0;
    campaigns[name].clicks += parseInt(row['Clicks'], 10) || 0;
    campaigns[name].conversions += parseFloat(row['Conversions']) || 0;
    totalSpend += cost;
  }

  // Converter objeto para array
  var campaignList = [];
  var names = Object.keys(campaigns);
  for (var i = 0; i < names.length; i++) {
    campaignList.push(campaigns[names[i]]);
  }

  return {
    totalSpend: totalSpend,
    campaigns: campaignList
  };
}

/**
 * Ajusta budgets diários das campanhas para atingir a meta.
 * @param {Array} campaigns - Lista de campanhas com dados
 * @param {number} idealDailyRemaining - Gasto diário ideal restante
 * @param {string} paceStatus - 'OVERSPENDING' ou 'UNDERSPENDING'
 * @returns {Array} Lista de ajustes realizados
 */
function adjustCampaignBudgets(campaigns, idealDailyRemaining, paceStatus) {
  var adjustments = [];

  // Calcular total dos budgets diários atuais
  var totalCurrentBudget = 0;
  for (var i = 0; i < campaigns.length; i++) {
    totalCurrentBudget += campaigns[i].dailyBudget;
  }

  if (totalCurrentBudget === 0) {
    Logger.log('⚠️ Nenhuma campanha com budget definido encontrada.');
    return adjustments;
  }

  // Calcular fator de ajuste proporcional
  var adjustmentFactor = idealDailyRemaining / totalCurrentBudget;

  Logger.log('');
  Logger.log('=== AJUSTE DE BUDGETS ===');
  Logger.log('Total budget atual: R$ ' + totalCurrentBudget.toFixed(2) + '/dia');
  Logger.log('Budget ideal restante: R$ ' + idealDailyRemaining.toFixed(2) + '/dia');
  Logger.log('Fator de ajuste: ' + adjustmentFactor.toFixed(3));

  for (var j = 0; j < campaigns.length; j++) {
    var camp = campaigns[j];
    var currentBudget = camp.dailyBudget;

    if (currentBudget === 0) {
      continue;
    }

    var newBudget = currentBudget * adjustmentFactor;

    // Aplicar limites de variação
    var maxIncrease = currentBudget * (1 + CONFIG.MAX_BUDGET_INCREASE_PERCENT);
    var maxDecrease = currentBudget * (1 - CONFIG.MAX_BUDGET_DECREASE_PERCENT);

    if (newBudget > maxIncrease) {
      newBudget = maxIncrease;
    }
    if (newBudget < maxDecrease) {
      newBudget = maxDecrease;
    }

    // Aplicar travas absolutas
    if (newBudget > CONFIG.MAX_DAILY_BUDGET) {
      newBudget = CONFIG.MAX_DAILY_BUDGET;
    }
    if (newBudget < CONFIG.MIN_DAILY_BUDGET) {
      newBudget = CONFIG.MIN_DAILY_BUDGET;
    }

    // Arredondar para 2 casas decimais
    newBudget = Math.round(newBudget * 100) / 100;

    // Evitar ajuste insignificante (< R$0.50)
    if (Math.abs(newBudget - currentBudget) < 0.50) {
      Logger.log('➡️ ' + camp.name + ': mantido R$ ' + currentBudget.toFixed(2) + '/dia (delta < R$0.50)');
      continue;
    }

    var change = ((newBudget - currentBudget) / currentBudget * 100).toFixed(1);
    var success = applyCampaignBudget(camp.name, newBudget);

    if (success) {
      var record = {
        campaign: camp.name,
        currentBudget: currentBudget,
        newBudget: newBudget,
        change: change + '%',
        action: newBudget > currentBudget ? 'AUMENTADO' : 'REDUZIDO'
      };
      adjustments.push(record);

      var icon = newBudget > currentBudget ? '📈' : '📉';
      Logger.log(icon + ' ' + camp.name + ': R$ ' + currentBudget.toFixed(2) + ' → R$ ' +
        newBudget.toFixed(2) + '/dia (' + (change > 0 ? '+' : '') + change + '%)');
    }
  }

  Logger.log('Total de campanhas ajustadas: ' + adjustments.length);
  return adjustments;
}

/**
 * Aplica novo budget diário em uma campanha.
 * @param {string} campaignName - Nome da campanha
 * @param {number} newBudget - Novo budget diário em R$
 * @returns {boolean} true se aplicado com sucesso
 */
function applyCampaignBudget(campaignName, newBudget) {
  if (CONFIG.DRY_RUN) {
    Logger.log('[DRY RUN] ' + campaignName + ' → R$ ' + newBudget.toFixed(2) + '/dia');
    return true;
  }

  try {
    var campaignIterator = AdsApp.campaigns()
      .withCondition("Name = '" + campaignName.replace(/'/g, "\\'") + "'")
      .get();

    if (!campaignIterator.hasNext()) {
      Logger.log('⚠️ Campanha não encontrada: ' + campaignName);
      return false;
    }

    var campaign = campaignIterator.next();
    campaign.getBudget().setAmount(newBudget);

    return true;

  } catch (e) {
    Logger.log('❌ Erro ao ajustar budget de "' + campaignName + '": ' + e.message);
    return false;
  }
}

/**
 * Registra dados de pacing na planilha Google Sheets.
 * @param {Object} summary - Resumo completo do pacing
 */
function logToSpreadsheet(summary) {
  try {
    var ss = SpreadsheetApp.openByUrl(CONFIG.SPREADSHEET_URL);
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

    // Criar aba se não existir
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      sheet.appendRow([
        'Data',
        'Dia do Mês',
        'Meta Mensal (R$)',
        'Gasto Ideal até Data (R$)',
        'Gasto Real até Data (R$)',
        'Pace (%)',
        'Status',
        'Orçamento Restante (R$)',
        'Gasto Diário Necessário (R$)',
        'Campanhas Ajustadas',
        'Total Campanhas'
      ]);
      sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      summary.date,
      summary.day + '/' + summary.totalDays,
      summary.monthlyTarget.toFixed(2),
      summary.idealSpendToDate.toFixed(2),
      summary.actualSpendToDate.toFixed(2),
      summary.pacePercent + '%',
      summary.paceStatus,
      summary.budgetRemaining.toFixed(2),
      summary.idealDailyRemaining.toFixed(2),
      summary.adjustments.length,
      summary.campaignCount
    ]);

    // Se houve ajustes, registrar detalhes em aba separada
    if (summary.adjustments.length > 0) {
      logAdjustmentDetails(ss, summary);
    }

    Logger.log('📊 Dados de pacing registrados na planilha.');

  } catch (e) {
    Logger.log('⚠️ Erro ao gravar na planilha: ' + e.message);
    Logger.log('   Verifique se a URL da planilha está correta e o script tem permissão.');
  }
}

/**
 * Registra detalhes de ajustes de budget em aba separada.
 * @param {Object} ss - Spreadsheet
 * @param {Object} summary - Resumo com ajustes
 */
function logAdjustmentDetails(ss, summary) {
  var detailSheetName = CONFIG.SHEET_NAME + ' — Detalhes';
  var detailSheet = ss.getSheetByName(detailSheetName);

  if (!detailSheet) {
    detailSheet = ss.insertSheet(detailSheetName);
    detailSheet.appendRow([
      'Data',
      'Campanha',
      'Budget Anterior (R$)',
      'Budget Novo (R$)',
      'Variação',
      'Ação',
      'Pace no Momento'
    ]);
    detailSheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff');
    detailSheet.setFrozenRows(1);
  }

  for (var i = 0; i < summary.adjustments.length; i++) {
    var adj = summary.adjustments[i];
    detailSheet.appendRow([
      summary.date,
      adj.campaign,
      adj.currentBudget.toFixed(2),
      adj.newBudget.toFixed(2),
      adj.change,
      CONFIG.DRY_RUN ? 'DRY RUN — ' + adj.action : adj.action,
      summary.pacePercent + '%'
    ]);
  }
}

/**
 * Retorna o número de dias em um mês.
 * @param {number} year - Ano
 * @param {number} month - Mês (0-indexado: 0 = Janeiro)
 * @returns {number} Dias no mês
 */
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Retorna a data do primeiro dia do mês atual no formato YYYYMMDD.
 * @param {Date} date - Data de referência
 * @returns {string} Data formatada
 */
function getFirstDayOfMonth(date) {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  return year + month + '01';
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
 * Envia email de alerta quando pacing está fora dos limites.
 * @param {Object} summary - Resumo completo do pacing
 */
function sendAlertEmail(summary) {
  var isOver = summary.paceStatus === 'OVERSPENDING';
  var statusIcon = isOver ? '🔴' : '🟡';
  var statusColor = isOver ? '#d32f2f' : '#f57c00';
  var statusText = isOver ? 'Overspending' : 'Underspending';
  var statusDesc = isOver
    ? 'O gasto está acima do planejado. Se mantido nesse ritmo, o orçamento mensal será excedido.'
    : 'O gasto está abaixo do planejado. Pode haver oportunidades de investimento sendo perdidas.';

  var htmlBody = '<html><body style="font-family: Arial, sans-serif; color: #333;">';
  htmlBody += '<h2 style="color: ' + statusColor + ';">' + statusIcon + ' Budget Pacing — ' + statusText + '</h2>';
  htmlBody += '<p>' + statusDesc + '</p>';

  // Métricas principais
  htmlBody += '<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">';
  htmlBody += '<table style="border-collapse: collapse; width: 100%; max-width: 500px;">';

  var metrics = [
    ['📅 Dia do mês', summary.day + ' de ' + summary.totalDays + ' (' + summary.daysRemaining + ' restantes)'],
    ['🎯 Meta mensal', 'R$ ' + summary.monthlyTarget.toFixed(2)],
    ['💰 Gasto até agora', 'R$ ' + summary.actualSpendToDate.toFixed(2)],
    ['📊 Gasto ideal até agora', 'R$ ' + summary.idealSpendToDate.toFixed(2)],
    ['⚡ Pace', '<span style="color: ' + statusColor + '; font-weight: bold; font-size: 18px;">' + summary.pacePercent + '%</span>'],
    ['💵 Orçamento restante', 'R$ ' + summary.budgetRemaining.toFixed(2)],
    ['📈 Gasto diário necessário', 'R$ ' + summary.idealDailyRemaining.toFixed(2) + '/dia']
  ];

  for (var i = 0; i < metrics.length; i++) {
    htmlBody += '<tr>' +
      '<td style="padding: 6px 10px; font-weight: bold; white-space: nowrap;">' + metrics[i][0] + '</td>' +
      '<td style="padding: 6px 10px;">' + metrics[i][1] + '</td></tr>';
  }

  htmlBody += '</table></div>';

  // Tabela de ajustes (se houver)
  if (summary.adjustments.length > 0) {
    htmlBody += '<h3 style="color: #333; margin-top: 20px;">Ajustes de Budget Realizados</h3>';
    htmlBody += '<table style="border-collapse: collapse; width: 100%; max-width: 600px;">';
    htmlBody += '<tr style="background: #f5f5f5;">' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Campanha</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Anterior</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Novo</th>' +
      '<th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Variação</th></tr>';

    for (var j = 0; j < summary.adjustments.length; j++) {
      var adj = summary.adjustments[j];
      htmlBody += '<tr>' +
        '<td style="padding: 8px; border: 1px solid #ddd;">' + adj.campaign + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">R$ ' + adj.currentBudget.toFixed(2) + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">R$ ' + adj.newBudget.toFixed(2) + '</td>' +
        '<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">' + adj.change + '</td></tr>';
    }

    htmlBody += '</table>';
  }

  // Recomendações
  htmlBody += '<h3 style="color: #333; margin-top: 20px;">💡 Recomendações</h3>';
  if (isOver) {
    htmlBody += '<ul>';
    htmlBody += '<li>Revise os lances de keywords com CPA alto</li>';
    htmlBody += '<li>Considere pausar campanhas com menor performance</li>';
    htmlBody += '<li>Verifique se há termos de pesquisa desperdiçando budget</li>';
    htmlBody += '</ul>';
  } else {
    htmlBody += '<ul>';
    htmlBody += '<li>Considere aumentar os lances em keywords de melhor performance</li>';
    htmlBody += '<li>Verifique se os anúncios estão sendo exibidos (quality score, ad strength)</li>';
    htmlBody += '<li>Avalie expandir a segmentação de audiência</li>';
    htmlBody += '</ul>';
  }

  htmlBody += '<hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">';
  htmlBody += '<p style="font-size: 12px; color: #999;">Gerado automaticamente pelo Budget Pacer Script.<br>';
  htmlBody += 'Config: Meta R$ ' + CONFIG.MONTHLY_BUDGET_TARGET.toFixed(2) + '/mês | ' +
    'Alertas: <' + (CONFIG.PACE_LOW_THRESHOLD * 100) + '% ou >' + (CONFIG.PACE_HIGH_THRESHOLD * 100) + '%</p>';
  htmlBody += '</body></html>';

  MailApp.sendEmail({
    to: CONFIG.EMAIL_RECIPIENTS,
    subject: CONFIG.EMAIL_SUBJECT + ' — Pace ' + summary.pacePercent + '% (' + statusText + ')',
    htmlBody: htmlBody
  });

  Logger.log('📧 Email de alerta enviado para: ' + CONFIG.EMAIL_RECIPIENTS);
}
