/**
 * Types and interfaces for Duarte Advocatus Portal Jurídico
 */

export enum Specialty {
  MEDICO = "Direito Médico",
  BANCARIO = "Direito Bancário",
  TRABALHISTA = "Direito Trabalhista",
  IMOBILIARIO = "Direito Imobiliário",
}

export interface Attorney {
  id: string;
  name: string;
  role: string;
  oab: string;
  specialty: Specialty;
  bio: string;
  imageUrl: string;
}

export type ConsultationStatus = "Agendado" | "Confirmado" | "Em Análise de Viabilidade" | "Petição Elaborada" | "Processo Distribuído" | "Arquivado";

export interface Consultation {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  specialty: Specialty;
  description: string;
  attorneyId: string;
  attorneyName: string;
  date: string;
  time: string;
  status: ConsultationStatus;
  createdAt: string;
  notes?: string;
  updates?: CaseHistoryUpdate[];
}

export interface CaseHistoryUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "info" | "step" | "alert" | "court";
}

export interface Message {
  id: string;
  sender: "user" | "bot" | "attorney";
  content: string;
  timestamp: Date;
  analyzedData?: {
    specialtyRecommended: Specialty;
    confidence: "alta" | "media" | "baixa";
    summaryPoints: string[];
    suggestedDocuments: string[];
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number; // 1-5
  comment: string;
  specialty: Specialty;
  date: string;
}

// Medical Error Calculator Types
export interface MedicalErrorCalcInput {
  harmType: "permanente" | "temporario" | "estetico_grave" | "estetico_moderado" | "obito";
  negligenceProof: "forte" | "moderada" | "indicio_leve";
  hospitalExpense: number;
  monthlyLostIncome: number;
  periodMonths: number;
}

export interface MedicalErrorCalcResult {
  moralDamageEstimate: number;
  materialDamageEstimate: number;
  aestheticDamageEstimate?: number;
  totalEstimate: number;
  viabilityScore: "Alta Viabilidade" | "Média Viabilidade" | "Análise Detalhada Requerida";
  explanation: string;
}

// Banking Calculator Types
export interface BankingCalcInput {
  loanValue: number;
  statedInterestRate: number; // e.g. 5.5% per month
  bacenAvgRate: number; // e.g. 2.1% per month
  feesCharged: number; // other abusive fees or forced insurances
  installmentsCount: number;
}

export interface BankingCalcResult {
  estimatedMonthlySaving: number;
  estimatedTotalRefund: number;
  hasAbuse: boolean;
  viabilityScore: "Altamente Revisional" | "Moderado" | "Dentro da Média de Mercado";
  explanation: string;
}

// Labor Severance Calculator Types
export interface LaborCalcInput {
  salary: number;
  startDate: string;
  endDate: string;
  reason: "demissao_sem_justa" | "demissao_com_justa" | "pedido_demissao" | "rescisao_indireta";
  hasUnpaidOvertime: boolean;
  hasUnusedVacation: boolean;
}

export interface LaborCalcResult {
  baseSalary: number;
  workedDaysRefund: number;
  thirteenthSalaryProp: number;
  vacationRefund: number;
  noticePeriodPay: number;
  fgtsMulta: number;
  overtimeEstimate: number;
  totalGrossEstimate: number;
  explanation: string;
}
