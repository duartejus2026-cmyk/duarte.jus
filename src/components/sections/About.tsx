import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { supabase } from "../../services/supabase";

export default function About() {
  const [content, setContent] = useState({
    title: "Expertise Jurídica e Compromisso com seu Direito",
    description: "O Duarte Advocatus atua com excelência jurídica, atendimento humanizado e estratégias personalizadas para defender os direitos de cada cliente com transparência e comprometimento. Nossa equipe trabalha de forma próxima, entendendo cada caso de maneira única e buscando sempre as melhores soluções jurídicas.\n\nAcreditamos que a advocacia vai além dos processos: ela deve oferecer confiança, orientação clara e apoio em momentos importantes da vida. Seja em questões trabalhistas, previdenciárias, cíveis ou empresariais, estamos preparados para entregar um atendimento sério, ágil e eficiente.",
    image_url: ""
  });

  useEffect(() => {
    async function fetchAbout() {
      const { data } = await supabase.from('about_content').select('*').single();
      if (data) setContent(data);
    }
    fetchAbout();
  }, []);

  return (
    <section id="about-section" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={content.image_url || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"} 
                alt="Duarte Advocatus" 
                className="w-full h-[500px] lg:h-[700px] object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
          </motion.div>

          {/* Text Content Box (Overlapping slightly) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-5/12 bg-white p-8 sm:p-16 shadow-2xl rounded-2xl border border-slate-100 lg:-ml-20 z-10 relative"
          >
            <span className="text-[11px] tracking-widest font-sans uppercase font-bold text-gold mb-4 block">
              Sobre Duarte Advocatus
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold leading-tight mb-8">
              {content.title}
            </h2>
            <div className="space-y-6 font-sans text-lg text-text-muted leading-relaxed whitespace-pre-line">
              {content.description}
            </div>
            <div className="mt-10">
              <Button variant="gold" onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Falar com um Especialista
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
