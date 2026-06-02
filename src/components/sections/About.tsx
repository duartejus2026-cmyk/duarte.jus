import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Users, Lightbulb, ChevronRight } from "lucide-react";
import { supabase } from "../../services/supabase";

export default function About() {
  const [content, setContent] = useState({
    title: "Excelência Jurídica com Estratégia, Segurança e Resultado",
    description: "Atuação jurídica de alta performance, defendendo seus interesses com rigor técnico, visão de negócios e atendimento totalmente exclusivo.",
    image_url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1974&auto=format&fit=crop"
  });

  useEffect(() => {
    async function fetchAbout() {
      const { data } = await supabase.from('about_content').select('*').single();
      if (data) {
        setContent({
          title: data.title || content.title,
          description: data.description || content.description,
          image_url: data.image_url || content.image_url
        });
      }
    }
    fetchAbout();
  }, []);

  const pillars = [
    {
      title: "Segurança Jurídica",
      description: "Proteção patrimonial blindada com rigor técnico e antecipação de riscos em todas as esferas.",
      icon: Shield
    },
    {
      title: "Atendimento Humanizado",
      description: "Proximidade e transparência em cada etapa, garantindo um acompanhamento exclusivo.",
      icon: Users
    },
    {
      title: "Estratégias Inteligentes",
      description: "Soluções criativas e resolutivas focadas na agilidade e na maximização de resultados.",
      icon: Lightbulb
    }
  ];

  return (
    <section id="about-section" className="py-16 lg:py-24 bg-[#fafafa] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Image Column - Editorial Layout */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative group"
          >
            {/* Decorative Gold Frame */}
            <div className="absolute -inset-4 border border-gold/30 rounded-t-full rounded-b-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 scale-95 group-hover:scale-100" />
            
            <div className="relative rounded-t-[100px] rounded-b-2xl overflow-hidden shadow-2xl shadow-primary/15 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent z-10 opacity-70" />
              <img 
                src={content.image_url} 
                alt="Escritório Duarte Advocatus" 
                className="w-full h-full object-cover object-top transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-xl text-center w-[85%] shadow-xl">
                <p className="text-white font-serif text-xl mb-2 tracking-wide">Duarte Advogados</p>
                <div className="w-10 h-0.5 bg-gold mx-auto" />
              </div>
            </div>
          </motion.div>

          {/* Text Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-[10px] tracking-[0.3em] font-sans uppercase font-bold text-gold">
                Sobre Nossa Banca
              </span>
            </div>

            <h2 className="font-serif text-3xl lg:text-4xl text-primary font-bold leading-tight mb-5">
              {content.title}
            </h2>

            <p className="font-sans text-base sm:text-lg text-primary/70 font-light leading-relaxed mb-10 max-w-2xl">
              {content.description}
            </p>

            {/* 3 Pillars */}
            <div className="space-y-4 mb-10">
              {pillars.map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="group flex gap-6 p-6 sm:p-8 bg-white border border-slate-100/80 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/10 transition-colors duration-500">
                    <pillar.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-primary mb-1 group-hover:text-gold transition-colors">{pillar.title}</h3>
                    <p className="font-sans text-sm text-text-muted leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="pt-2"
            >
              <button 
                onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden bg-primary text-white font-sans tracking-[0.15em] uppercase text-[11px] font-bold py-5 px-10 rounded-sm inline-flex items-center justify-center gap-4 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 w-full sm:w-auto"
              >
                <span className="relative z-10">Solicitar Atendimento Jurídico</span>
                <ChevronRight className="relative z-10 w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
