import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, FileText, CheckCircle, ShieldAlert, RefreshCw } from "lucide-react";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import { performLegalTriage, TriageResult } from "../../services/geminiService";

export default function TriageIA() {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);

  const handleTriage = async () => {
    if (!description.trim()) return;
    setIsLoading(true);
    try {
      const data = await performLegalTriage(description);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Houve um erro na análise. Tente novamente em instantes.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setDescription("");
  };

  return (
    <section id="triage-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              Triagem Assistida por IA
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-primary font-medium leading-tight">
              Análise Prévia <br />
              <span className="text-gold">Inteligente e Imediata</span>
            </h2>
            <p className="font-sans text-lg text-text-muted leading-relaxed">
              Descreva seu caso em poucas palavras e nossa Inteligência Artificial jurídica, treinada com jurisprudências dos Tribunais Superiores, fará uma triagem inicial para identificar seus direitos e os documentos necessários.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Análise em Segundos", icon: CheckCircle },
                { label: "Sigilo Total", icon: CheckCircle },
                { label: "Direcionamento Correto", icon: CheckCircle },
                { label: "Checklist de Documentos", icon: CheckCircle },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-primary">
                  <item.icon className="w-5 h-5 text-gold" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface-bright p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden"
          >
            {/* Background decorative sparkle */}
            <Sparkles className="absolute -top-10 -right-10 w-40 h-40 text-gold/5" />

            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 relative z-10"
                >
                  <TextArea 
                    label="Descreva seu problema jurídico" 
                    placeholder="Ex: Tive um problema com meu banco sobre juros abusivos..."
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button 
                    variant="primary" 
                    fullWidth 
                    onClick={handleTriage} 
                    disabled={isLoading || !description}
                    icon={isLoading ? RefreshCw : Send}
                    className={isLoading ? "animate-pulse" : ""}
                  >
                    {isLoading ? "Analisando Caso..." : "Realizar Triagem Gratuita"}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 relative z-10"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-primary">Resultado da Análise</h3>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Confiança</span>
                      <div className="h-1.5 w-24 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(result.confidence || 0.5) * 100}%` }}
                          className="h-full bg-gold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-primary/5 rounded-2xl border-l-4 border-gold shadow-sm">
                    <p className="text-[10px] uppercase font-bold text-gold tracking-widest mb-1">Especialidade Recomendada</p>
                    <p className="font-serif text-xl font-bold text-primary">{result.specialtyRecommended}</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-text-muted leading-relaxed italic border-l-2 border-slate-200 pl-4">
                      "{result.legalExplanation}"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                      <FileText className="w-3 h-3 text-gold" /> Check-list de Documentos:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.suggestedDocuments.map((doc, i) => (
                        <span key={i} className="text-[10px] bg-white border border-slate-100 text-slate-600 px-3 py-1.5 rounded-lg shadow-sm">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <Button variant="gold" fullWidth onClick={() => {
                      const msg = `Olá, fiz uma triagem no site Duarte Advocatus e gostaria de atendimento.\n\n*Especialidade indicada:* ${result.specialtyRecommended}\n*Resumo do caso:* ${description.substring(0, 300)}...`;
                      window.open(`https://wa.me/5561992880223?text=${encodeURIComponent(msg)}`, '_blank');
                    }}>Falar com Especialista no WhatsApp</Button>
                    <button onClick={reset} className="text-xs uppercase font-bold text-text-muted hover:text-primary transition-colors py-2">Realizar Nova Triagem</button>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                    <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-[9px] text-red-600 leading-tight">
                      Aviso: Esta análise é realizada por Inteligência Artificial e serve apenas como triagem preliminar. Não substitui o parecer técnico de um advogado.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
