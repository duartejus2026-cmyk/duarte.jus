import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Landmark, Briefcase, Calculator, RefreshCcw, AlertTriangle } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { 
  calculateMedicalError, 
  calculateBankingAbuse, 
  calculateLaborSeverance 
} from "../../services/calculatorService";

type CalcType = "medical" | "banking" | "labor";

export default function Calculators() {
  const [activeCalc, setActiveCalc] = useState<CalcType>("medical");
  const [result, setResult] = useState<any>(null);

  // Form states
  const [medData, setMedData] = useState({ harmType: "temporario", negligenceProof: "moderada", hospitalExpense: 0, monthlyLostIncome: 0, periodMonths: 0 });
  const [bankData, setBankData] = useState({ loanValue: 0, statedInterestRate: 0, bacenAvgRate: 0, feesCharged: 0, installmentsCount: 0 });
  const [laborData, setLaborData] = useState({ salary: 0, startDate: "", endDate: "", reason: "demissao_sem_justa", hasUnpaidOvertime: false, hasUnusedVacation: false });

  const handleCalculate = () => {
    if (activeCalc === "medical") setResult(calculateMedicalError(medData as any));
    if (activeCalc === "banking") setResult(calculateBankingAbuse(bankData as any));
    if (activeCalc === "labor") setResult(calculateLaborSeverance(laborData as any));
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <section id="calculators-section" className="py-16 sm:py-24 bg-surface-bright">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-[11px] tracking-widest font-sans uppercase font-bold text-gold">Transparência e Tecnologia</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-primary font-medium mt-2 mb-4 sm:mb-6">Simuladores de Direitos</h2>
          <p className="font-sans text-base sm:text-lg text-text-muted">Obtenha uma estimativa preliminar baseada em jurisprudência atualizada para o seu caso específico.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-slate-100">
            {[
              { id: "medical", label: "Saúde e Indenizações", icon: Stethoscope },
              { id: "banking", label: "Revisional Bancário", icon: Landmark },
              { id: "labor", label: "Verbas Trabalhistas", icon: Briefcase },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveCalc(tab.id as CalcType); reset(); }}
                className={`flex-1 flex items-center justify-center gap-3 py-6 px-4 transition-all ${
                  activeCalc === tab.id 
                  ? "bg-primary text-gold-light border-b-2 border-gold" 
                  : "text-text-muted hover:bg-slate-50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-serif font-bold uppercase tracking-widest text-xs">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-12">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {/* Render relevant fields based on activeCalc */}
                  {activeCalc === "medical" && (
                    <>
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-primary ml-1">Tipo de Dano</label>
                        <select 
                          className="w-full bg-surface-bright border border-slate-200 rounded-lg px-4 py-3 focus:border-gold transition-all"
                          value={medData.harmType}
                          onChange={(e) => setMedData({ ...medData, harmType: e.target.value })}
                        >
                          <option value="obito">Morte / Indenização por Óbito</option>
                          <option value="negativa_plano">Negativa de Plano de Saúde / Cirurgia</option>
                          <option value="permanente">Erro Médico com Sequela Permanente</option>
                          <option value="estetico_grave">Dano Estético Grave / Cirurgia Plástica</option>
                          <option value="temporario">Danos Hospitalares / Internação Indevida</option>
                        </select>
                      </div>
                      <Input label="Gastos Hospitalares" type="number" prefix="R$" value={medData.hospitalExpense} onChange={(e) => setMedData({ ...medData, hospitalExpense: e.target.value as any })} />
                      <Input label="Renda Mensal Perdida" type="number" prefix="R$" value={medData.monthlyLostIncome} onChange={(e) => setMedData({ ...medData, monthlyLostIncome: e.target.value as any })} />
                      <Input label="Meses de Afastamento" type="number" suffix="Meses" value={medData.periodMonths} onChange={(e) => setMedData({ ...medData, periodMonths: e.target.value as any })} />
                    </>
                  )}

                  {activeCalc === "banking" && (
                    <>
                      <Input label="Valor do Empréstimo" type="number" prefix="R$" value={bankData.loanValue} onChange={(e) => setBankData({ ...bankData, loanValue: e.target.value as any })} />
                      <Input label="Taxa de Juros do Contrato" type="number" suffix="% a.m." value={bankData.statedInterestRate} onChange={(e) => setBankData({ ...bankData, statedInterestRate: e.target.value.replace(',', '.') as any })} />
                      <Input label="Taxa Média BACEN" type="number" suffix="% a.m." value={bankData.bacenAvgRate} onChange={(e) => setBankData({ ...bankData, bacenAvgRate: e.target.value.replace(',', '.') as any })} />
                      <Input label="Tarifas Extras / Seguros" type="number" prefix="R$" value={bankData.feesCharged} onChange={(e) => setBankData({ ...bankData, feesCharged: e.target.value as any })} />
                      <Input label="Número de Parcelas" type="number" value={bankData.installmentsCount} onChange={(e) => setBankData({ ...bankData, installmentsCount: e.target.value as any })} />
                    </>
                  )}

                  {activeCalc === "labor" && (
                    <>
                      <Input label="Último Salário Bruto" type="number" prefix="R$" value={laborData.salary} onChange={(e) => setLaborData({ ...laborData, salary: e.target.value as any })} />
                      <Input label="Data de Início" type="date" value={laborData.startDate} onChange={(e) => setLaborData({ ...laborData, startDate: e.target.value })} />
                      <Input label="Data de Desligamento" type="date" value={laborData.endDate} onChange={(e) => setLaborData({ ...laborData, endDate: e.target.value })} />
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-primary ml-1">Motivo</label>
                        <select 
                          className="w-full bg-surface-bright border border-slate-200 rounded-lg px-4 py-3"
                          value={laborData.reason}
                          onChange={(e) => setLaborData({ ...laborData, reason: e.target.value })}
                        >
                          <option value="demissao_sem_justa">Demissão sem Justa Causa</option>
                          <option value="rescisao_indireta">Rescisão Indireta (Falta do Empregador)</option>
                          <option value="pedido_demissao">Pedido de Demissão</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="md:col-span-2 flex justify-center mt-4">
                    <Button variant="gold" icon={Calculator} onClick={handleCalculate}>Simular Agora</Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="bg-primary p-8 rounded-2xl text-white text-center space-y-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gold-light">Resultado Estimado</span>
                    <div className="text-4xl sm:text-6xl font-serif font-bold text-gold-lighter">
                      R$ {(result.totalEstimate || result.estimatedTotalRefund || result.totalGrossEstimate).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                    <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest">
                      {result.viabilityScore || "Cálculo Realizado"}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                      <h4 className="font-serif text-xl font-bold text-primary flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-gold" />
                        Parecer Técnico Preliminar
                      </h4>
                      <p className="text-text-muted leading-relaxed italic border-l-4 border-gold pl-4">
                        {result.explanation}
                      </p>
                    </div>
                    <div className="bg-surface-bright p-6 rounded-xl space-y-6 flex flex-col justify-center">
                      <p className="text-xs text-text-muted text-center">Este valor é uma estimativa baseada em parâmetros jurisprudenciais e não substitui a análise de um advogado.</p>
                      <Button variant="primary" fullWidth onClick={() => {
                        const contact = document.getElementById("contact-section");
                        contact?.scrollIntoView({ behavior: "smooth" });
                      }}>Validar com Especialista</Button>
                      <button onClick={reset} className="text-xs uppercase font-bold text-text-muted hover:text-gold transition-colors flex items-center justify-center gap-2">
                        <RefreshCcw className="w-3 h-3" /> Reiniciar Simulação
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
