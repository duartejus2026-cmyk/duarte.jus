import {
  MedicalErrorCalcInput,
  MedicalErrorCalcResult,
  BankingCalcInput,
  BankingCalcResult,
  LaborCalcInput,
  LaborCalcResult,
} from "../types";

/**
 * Realiza a simulação estimativa de indenizações por Erro Médico
 * com base na gravidade do dano, força das provas e perdas materiais ocorridas.
 */
export function calculateMedicalError(input: MedicalErrorCalcInput): MedicalErrorCalcResult {
  // Garantir que os valores sejam numéricos
  const hospitalExpense = Number(input.hospitalExpense) || 0;
  const monthlyLostIncome = Number(input.monthlyLostIncome) || 0;
  const periodMonths = Number(input.periodMonths) || 0;

  let moralDamageEstimate = 0;
  let aestheticDamageEstimate = 0;
  let materialDamageEstimate = hospitalExpense;
  
  // 1. Dano Moral baseado na gravidade do fato
  switch (input.harmType) {
    case "obito":
      moralDamageEstimate = 200000; // Média jurisprudencial de 150k a 300k
      break;
    case "permanente":
      moralDamageEstimate = 120000; // Limitação funcional severa
      break;
    case "estetico_grave":
      moralDamageEstimate = 60000;
      aestheticDamageEstimate = 50000; // Danos estéticos graves cumuláveis com moral
      break;
    case "estetico_moderado":
      moralDamageEstimate = 30000;
      aestheticDamageEstimate = 20000;
      break;
    case "temporario":
      moralDamageEstimate = 25000; // Internação ou repouso forçado reversível
      break;
  }
  
  // 2. Lucros Cessantes (renda perdida durante o período de afastamento)
  if (input.monthlyLostIncome > 0 && input.periodMonths > 0) {
    materialDamageEstimate += input.monthlyLostIncome * input.periodMonths;
  }
  
  // 3. Modificador de Provas
  let multiplier = 1.0;
  let viabilityScore: "Alta Viabilidade" | "Média Viabilidade" | "Análise Detalhada Requerida" = "Média Viabilidade";
  
  if (input.negligenceProof === "forte") {
    multiplier = 1.1; // Favorece o teto
    viabilityScore = "Alta Viabilidade";
  } else if (input.negligenceProof === "indicio_leve") {
    multiplier = 0.7; // Conservador pela falta de prontuários ou perícias iniciais
    viabilityScore = "Análise Detalhada Requerida";
  } else {
    viabilityScore = "Média Viabilidade";
  }
  
  moralDamageEstimate = Math.round(moralDamageEstimate * multiplier);
  if (aestheticDamageEstimate > 0) {
    aestheticDamageEstimate = Math.round(aestheticDamageEstimate * multiplier);
  }
  
  const totalEstimate = moralDamageEstimate + materialDamageEstimate + aestheticDamageEstimate;
  
  // 4. Justificativa jurídica formal
  let explanation = `Com base nos parâmetros informados, o caso apresenta um score de relevância jurídica com ${viabilityScore}. `;
  
  if (input.harmType === "obito") {
    explanation += `O falecimento de ente querido em razão de suspeita de falha hospitalar atenta contra o direito supremo à vida. A jurisprudência pacífica do STJ arbitra indenizações punitivo-compensatórias de alta monta para herdeiros diretos, cumulados com o ressarcimento integral de despesas funerárias e pensionamento civil de dependentes.`;
  } else if (input.harmType === "permanente") {
    explanation += `Danos com sequelas físicas ou neurológicas de caráter permanente geram o direito a uma pensão mensal vitalícia correspondente à perda da capacidade de trabalho (art. 950 do Código Civil), além de indenização por danos morais severos para compensar as dores cotidianas e perdas de autonomia.`;
  } else {
    explanation += `Danos médicos temporários, desde que confirmados por nexo causal técnico em prontuários e perícia do IMESC, dão direito ao reaver de todas as perdas salariais do afastamento e despesas de acompanhamento clínico particular de reabilitação.`;
  }
  
  if (input.negligenceProof !== "forte") {
    explanation += ` Recomendamos fortemente a requisição formal e imediata do Prontuário Médico Completo ao hospital e equipe cirúrgica em até 5 dias, que servirá de alicerce para nosso parecer técnico médico formal antes de ingressarmos na jurisdição competente.`;
  } else {
    explanation += ` Como a documentação de negligência está classificada como alta/forte, sua ação possui rito acelerável e probabilidade substancial de deferimento de liminar ou tutela antecipada.`;
  }

  return {
    moralDamageEstimate,
    materialDamageEstimate,
    aestheticDamageEstimate: aestheticDamageEstimate > 0 ? aestheticDamageEstimate : undefined,
    totalEstimate,
    viabilityScore,
    explanation,
  };
}

/**
 * Simula a abusividade de taxas bancárias e estima a economia mensal e
 * o reembolso retroativo de tarifas / seguros cobrados de forma abusiva (venda casada).
 */
export function calculateBankingAbuse(input: BankingCalcInput): BankingCalcResult {
  // Garantir valores numéricos
  const loanValue = Number(input.loanValue) || 0;
  const statedInterestRate = Number(input.statedInterestRate) || 0;
  const bacenAvgRate = Number(input.bacenAvgRate) || 0;
  const feesCharged = Number(input.feesCharged) || 0;
  const installmentsCount = Number(input.installmentsCount) || 0;

  // Verificação básica se há abusividade
  const isAbusive = statedInterestRate > bacenAvgRate * 1.15;
  const hasOtherFees = feesCharged > 0;
  const hasAbuse = isAbusive || hasOtherFees;
  
  if (!hasAbuse || loanValue <= 0) {
    return {
      estimatedMonthlySaving: 0,
      estimatedTotalRefund: 0,
      hasAbuse: false,
      viabilityScore: "Dentro da Média de Mercado",
      explanation: "Com os dados inseridos, sua taxa de juros contratuais encontra-se em consonância com as taxas médias de mercado divulgadas pelo Banco Central para o mesmo período e modalidade. Suas despesas adicionais parecem ordinárias, não havendo preliminarmente viabilidade para ação revisional de juros contratuais, salvo ocorrência de cobrança indevida de seguro não assinado.",
    };
  }

  // Modelando cálculo revisional básico:
  // PV = Valor do Empréstimo, n = Quantidade de Parcelas.
  // Cálculo simplificado de parcela com taxa do contrato (PMT_contrato) vs de taxa do BACEN (PMT_bacen)
  const iContrato = statedInterestRate / 100;
  const iBacen = bacenAvgRate / 100;
  const n = installmentsCount;
  
  const pmtContrato = (loanValue * iContrato) / (1 - Math.pow(1 + iContrato, -n));
  const pmtBacen = (loanValue * iBacen) / (1 - Math.pow(1 + iBacen, -n));
  
  const estimatedMonthlySaving = Math.max(0, Math.round(pmtContrato - pmtBacen));
  
  // Reembolso total estimado considerando o que já foi pago de juros abusivo cumulado com as tarifas extras cobradas à vista
  // Arbitramos que o cliente já pagou em média metade das parcelas, ou que recuperará metade do abatimento em desconto ou dobro do indébito
  const estimatedInterestRefund = estimatedMonthlySaving * n * 0.75;
  
  // O ressarcimento de tarifas extras (como tarifa de cadastro, avaliação, seguros embutidos) costuma ser integral e em dobro pelo Código de Defesa do Consumidor
  const estimatedFeesRefund = feesCharged * 2;
  
  const estimatedTotalRefund = Math.round(estimatedInterestRefund + estimatedFeesRefund);
  
  // Gravidade da abusividade
  const severityRatio = statedInterestRate / bacenAvgRate;
  let viabilityScore: "Altamente Revisional" | "Moderado" | "Dentro da Média de Mercado" = "Moderado";
  if (severityRatio >= 1.5 || feesCharged > 3000) {
    viabilityScore = "Altamente Revisional";
  }

  let explanation = `O seu contrato possui fortes subsídios para revisão judicial preventiva com classificação de viabilidade ${viabilityScore}. `;
  explanation += `A taxa de juros do seu financiamento (${statedInterestRate}% a.m.) está aproximadamente ${Math.round((severityRatio - 1) * 100)}% acima do índice e média divulgada pelo Banco Central do Brasil (${bacenAvgRate}% a.m.) aplicável para contratos análogos. `;
  
  if (isAbusive) {
    explanation += `Segundo a tese do Superior Tribunal de Justiça (Tema REsp repetitivo 1.061.530), a estipulação de juros significativamente superiores à taxa média autoriza o poder judiciário a forçar a readequação do contrato à taxa BACEN, diminuindo suas parcelas imediatamente e restituindo os valores retroativamente em dobro. `;
  }
  
  if (hasOtherFees) {
    explanation += `Além disso, as taxas adicionais informadas (R$ ${feesCharged.toLocaleString("pt-BR")}) evidenciam indício gravíssimo de 'Venda Casada de Seguros de Proteção Financeira' e de 'Tarifa de Avaliação de Bens Invisível'. Ambas as tarifas são reiteradamente proibidas pelo STJ por caracterizarem enriquecimento ilícito do banco financiador.`;
  }

  return {
    estimatedMonthlySaving,
    estimatedTotalRefund,
    hasAbuse: true,
    viabilityScore,
    explanation,
  };
}

/**
 * Calcula uma estimativa realista de rescisão trabalhista conforme regras vigentes da CLT.
 * Suporta fatores como demissão sem justa causa, com justa causa, rescisão indireta ou pedido de demissão.
 */
export function calculateLaborSeverance(input: LaborCalcInput): LaborCalcResult {
  const salary = Number(input.salary) || 0;
  
  // Calcular meses trabalhados aproximados
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  
  let monthsWorked = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  // Se trabalhou mais de 14 dias no último mês, conta como mês cheio para proporções
  if (end.getDate() - start.getDate() >= 14) {
    monthsWorked += 1;
  }
  monthsWorked = Math.max(1, monthsWorked);
  
  // Proporção de 13º salário (meses do ano atual)
  const currentYearMonths = end.getMonth() + 1; // Simplificado
  const thirteenthSalaryProp = Math.round((salary / 12) * currentYearMonths);
  
  // Proporção de Férias vencidas/proporcionais
  // Arbitramos férias proporcionais acumuladas com base no tempo total trabalhado (a cada 12 m zera, sobra dízimo)
  const remainingMonthsOfVacation = monthsWorked % 12;
  let vacationRefund = (salary / 12) * remainingMonthsOfVacation * 1.333; // com adicional de 1/3 civil
  if (input.hasUnusedVacation) {
    vacationRefund += salary * 1.333; // Mais um período vencido integral
  }
  vacationRefund = Math.round(vacationRefund);

  // Variáveis dependentes da modalidade de rescisão
  let workedDaysRefund = Math.round((salary / 30) * end.getDate());
  let noticePeriodPay = 0; // Aviso prévio pago/indenizado
  let fgtsMulta = 0; // Multa de 40% do FGTS
  
  // Estimativa de FGTS acumulado total do contrato
  // Alíquota de 8% mensal
  const totalFgtsAccumulated = salary * 0.08 * monthsWorked;

  switch (input.reason) {
    case "demissao_sem_justa":
    case "rescisao_indireta":
      // Aviso Prévio Indenizado: 30 dias de base + 3 dias adicionais por ano completo trabalhado (Lei 12.506/11)
      const fullYears = Math.floor(monthsWorked / 12);
      const noticeDays = 30 + Math.min(60, fullYears * 3);
      noticePeriodPay = Math.round((salary / 30) * noticeDays);
      
      // Multa de 40% do FGTS sobre o saldo do contrato
      fgtsMulta = Math.round(totalFgtsAccumulated * 0.40);
      break;
    
    case "pedido_demissao":
      // Não recebe multa de 40% nem aviso prévio indenizado (o empregado ou trabalha ou tem descontado, assumimos aviso zerado)
      fgtsMulta = 0;
      noticePeriodPay = 0;
      break;
      
    case "demissao_com_justa":
      // Perde quase tudo, recebe apenas saldo de salário e férias vencidas (proporcionais não cabem em justa causa sob súmula 171 TST)
      workedDaysRefund = Math.round((salary / 30) * end.getDate());
      vacationRefund = input.hasUnusedVacation ? Math.round(salary * 1.333) : 0;
      fgtsMulta = 0;
      noticePeriodPay = 0;
      break;
  }

  // Estimativa de Horas Extras e adicionais devidos (caso assinale)
  let overtimeEstimate = 0;
  if (input.hasUnpaidOvertime) {
    // Estimamos média ponderada judicial de adicionais devidos de 2 horas por dia útil acumulado nos últimos 24 meses (limite prudencial de simulação)
    const monthsForOvertime = Math.min(24, monthsWorked);
    const hourlyRate = salary / 220; // Padrão com divisor 220h
    // 2h p/ dia * 22 dias uteis por mes * valor da hora * 1.5 (adicional 50%) * meses
    overtimeEstimate = Math.round(2 * 22 * hourlyRate * 1.5 * monthsForOvertime);
  }

  const totalGrossEstimate = workedDaysRefund + thirteenthSalaryProp + vacationRefund + noticePeriodPay + fgtsMulta + overtimeEstimate;

  let explanation = `O cálculo simulado aponta que o total bruto de suas verbas indenizatórias na rescisão atinge R$ ${totalGrossEstimate.toLocaleString("pt-BR")}. `;
  
  if (input.reason === "demissao_sem_justa") {
    explanation += `Como sua demissão ocorreu por decisão patronal sem justa causa, você tem direito ao saque integral de seu fundo FGTS, recebimento da multa indenizatória de 40% (estimada em R$ ${fgtsMulta.toLocaleString("pt-BR")}), liberação das guias do Seguro-Desemprego e compensação proporcional pelas férias vencidas, proporcionais e o décimo terceiro.`;
  } else if (input.reason === "rescisao_indireta") {
    explanation += `A rescisão indireta (art. 483 da CLT) deve ser requerida judicialmente enquanto o vínculo ainda está ativo ou imediatamente após a interrupção. Ao confirmar as faltas graves da empresa (como ausência de recolhimento de FGTS ou atrasos recorrentes de salários), você garante as exatas mesmas indenizações de uma demissão sem justa causa, inclusive o aviso prévio indenizado proporcional ao tempo trabalhado.`;
  } else if (input.reason === "pedido_demissao") {
    explanation += `No pedido de demissão voluntária, você abre mão do levantamento do FGTS, da multa rescisória de 40% e do Seguro-Desemprego, preservando seu direito ao saldo de salário trabalhado, 13º proporcional e férias adquiridas de forma intangível.`;
  } else {
    explanation += `A demissão motivada por justa causa retira a quase integridade dos seus direitos rescisórios no intuito de penalizar a falta grave laboral cometida. No entanto, se a justa causa foi desproporcional, abusiva ou carente de provas sólidas (sem advertências ou suspensões prévias escritas), atuamos judicialmente para reverter a demissão para o caráter ordinário 'sem justa causa' e recuperar todas as suas verbas perdidas.`;
  }

  if (input.hasUnpaidOvertime) {
    explanation += ` Além disso, incluímos um valor estimado de R$ ${overtimeEstimate.toLocaleString("pt-BR")} referente a potenciais horas suplementares cumulativas não quitadas com as incidências reflexas em repouso semanal remunerado (RSR), aviso prévio, FGTS e gratificações de férias e natalinas.`;
  }

  return {
    baseSalary: salary,
    workedDaysRefund,
    thirteenthSalaryProp,
    vacationRefund,
    noticePeriodPay,
    fgtsMulta,
    overtimeEstimate,
    totalGrossEstimate,
    explanation,
  };
}
