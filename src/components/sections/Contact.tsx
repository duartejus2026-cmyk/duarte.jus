import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import { saveLead } from "../../services/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    specialty: "Direito Médico",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await saveLead(formData);
      setSubmitStatus("success");
      setFormData({ name: "", whatsapp: "", specialty: "Direito Médico", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="text-[11px] tracking-widest font-sans uppercase font-bold text-gold">
                Canais de Atendimento
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-primary font-medium mt-2 mb-6">
                Fale com um Especialista
              </h2>
              <p className="font-sans text-lg text-text-muted leading-relaxed">
                Estamos prontos para analisar seu caso com a atenção e o sigilo que ele merece. Entre em contato por um de nossos canais oficiais.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 bg-surface-bright rounded-xl flex items-center justify-center text-gold group-hover:bg-primary group-hover:text-gold-light transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-primary">Telefone & WhatsApp</h4>
                  <p className="text-text-muted font-sans">(61) 99288-0223</p>
                  <button className="text-gold text-xs font-bold uppercase tracking-widest mt-2 hover:underline">Iniciar Conversa</button>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 bg-surface-bright rounded-xl flex items-center justify-center text-gold group-hover:bg-primary group-hover:text-gold-light transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-primary">E-mail Corporativo</h4>
                  <p className="text-text-muted font-sans">israelduarte.adv@outlook.com</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface-bright p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input 
                  label="Nome Completo" 
                  placeholder="Seu nome"
                  required
                  disabled={isSubmitting || submitStatus === "success"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input 
                  label="WhatsApp" 
                  placeholder="(61) 99288-0223"
                  required
                  disabled={isSubmitting || submitStatus === "success"}
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-primary ml-1">Assunto / Especialidade</label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors font-sans appearance-none text-text-dark disabled:opacity-50"
                  disabled={isSubmitting || submitStatus === "success"}
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                >
                  <option>Direito Médico</option>
                  <option>Direito Bancário</option>
                  <option>Direito Trabalhista</option>
                  <option>Outros Assuntos</option>
                </select>
              </div>

              <TextArea 
                label="Sua Mensagem" 
                rows={4}
                placeholder="Descreva brevemente sua necessidade..."
                required
                disabled={isSubmitting || submitStatus === "success"}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-6 bg-gold/10 border border-gold/20 rounded-xl text-center">
                      <p className="text-primary font-serif text-lg font-medium mb-2">Solicitação enviada com sucesso!</p>
                      <p className="text-sm text-text-muted">Nossa equipe jurídica já recebeu suas informações e um especialista entrará em contato em breve.</p>
                    </div>
                    <Button 
                      variant="gold" 
                      fullWidth 
                      onClick={() => {
                        const msg = `Olá! Acabei de enviar meus dados pelo site e gostaria de agilizar o atendimento.\n\n*Assunto:* ${formData.specialty}`;
                        window.open(`https://wa.me/5561992880223?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                    >
                      Falar agora no WhatsApp
                    </Button>
                    <button 
                      type="button"
                      onClick={() => setSubmitStatus("idle")}
                      className="w-full text-[10px] uppercase font-bold text-text-muted hover:text-primary tracking-widest"
                    >
                      Enviar outra mensagem
                    </button>
                  </motion.div>
                ) : (
                  <Button 
                    variant="primary" 
                    fullWidth 
                    type="submit" 
                    disabled={isSubmitting}
                    icon={Send}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                  </Button>
                )}
              </AnimatePresence>
              
              {submitStatus === "error" && (
                <p className="text-sm text-red-600 font-medium text-center">Ocorreu um erro ao enviar. Por favor, tente novamente.</p>
              )}

              <p className="text-[10px] text-text-muted text-center uppercase tracking-widest font-medium">
                Sua privacidade é nossa prioridade. Dados protegidos pela LGPD.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
