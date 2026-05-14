import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Button from "../ui/Button";
import { supabase } from "../../services/supabase";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FAQItem[]>([]);

  useEffect(() => {
    async function fetchFaqs() {
      const { data } = await supabase
        .from('faq_items')
        .select('*')
        .order('order_index', { ascending: true });
      if (data) setFaqData(data);
    }
    fetchFaqs();
  }, []);

  if (faqData.length === 0) return null;

  return (
    <section id="faq-section" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl text-primary font-bold mb-6">Perguntas Frequentes</h2>
        <p className="text-text-muted mb-16 max-w-2xl mx-auto font-sans">
          Aqui estão algumas das dúvidas mais comuns que ouvimos dos nossos clientes. Se não encontrar sua dúvida aqui, entre em contato com nossa equipe hoje mesmo.
        </p>

        <div className="space-y-4 text-left">
          {faqData.map((item, index) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
              >
                <span className={`font-serif text-lg font-bold ${openIndex === index ? 'text-gold' : 'text-primary'}`}>
                  {item.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gold shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gold shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-text-muted font-sans border-t border-slate-50 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary p-12 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-serif text-2xl font-bold mb-4">Ainda tem dúvidas?</h3>
            <p className="opacity-80 mb-8 max-w-lg mx-auto">Nossos especialistas estão prontos para oferecer uma orientação inicial sem compromisso.</p>
            <Button variant="gold" onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Entre em Contato Conosco Hoje
            </Button>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
