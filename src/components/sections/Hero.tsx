import React, { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../../services/supabase";

interface HeroProps {
  onOpenBooking: () => void;
  onExploreAreas: () => void;
}

export default function Hero({ onOpenBooking, onExploreAreas }: HeroProps) {
  const [content, setContent] = useState({
    title: "Segurança e qualidade para sua família e patrimônio",
    description: "Atuação jurídica de alta performance. Protegemos seus interesses com rigor técnico, atendimento personalizado e estratégias resolutivas.",
    image_url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
  });

  useEffect(() => {
    async function fetchHero() {
      const { data } = await supabase.from('site_hero').select('*').single();
      if (data) setContent({
        title: data.title,
        description: data.description,
        image_url: data.image_url || content.image_url
      });
    }
    fetchHero();
  }, []);

  return (
    <section id="home-section" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      {/* Background with parallax effect simulation */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={content.image_url}
          alt="Duarte Advocatus - Justiça e Excelência"
          className="w-full h-full object-cover object-center select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      </div>

      {/* Floating Trust Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute top-10 right-10 hidden xl:flex flex-col gap-3 max-w-xs bg-white/5 backdrop-blur-md p-5 rounded border border-white/10 text-white shadow-2xl"
      >
        <div className="flex gap-2 items-center text-gold-light text-xs font-semibold tracking-wider uppercase font-sans">
          <ShieldCheck className="w-4 h-4" />
          Compromisso Ético
        </div>
        <p className="text-sm font-light text-white/85">
          "Atuamos com o rigor técnico e a dedicação artesanal que cada causa complexa exige de um escritório boutique."
        </p>
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
        <div className="max-w-3xl space-y-8">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/15 border border-gold-light/20 text-gold-lighter rounded-full font-sans text-xs tracking-widest font-semibold uppercase"
          >
            <Scale className="w-3.5 h-3.5 text-gold-light" />
            Excelência em Defesa Jurídica
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-3xl sm:text-6xl lg:text-7xl text-white font-semibold leading-[1.1] tracking-tight"
          >
            {content.title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-sans text-lg sm:text-xl text-white/80 max-w-2xl font-light leading-relaxed whitespace-pre-line"
          >
            {content.description}
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button
              onClick={onOpenBooking}
              className="bg-gold hover:bg-gold-light text-primary-dark font-bold px-8 py-4 rounded-sm font-sans tracking-wider uppercase text-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-gold/20"
            >
              Agende uma Consultoria
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreAreas}
              className="border border-white/40 text-white hover:border-white hover:bg-white/10 px-8 py-4 rounded-sm font-sans tracking-wider uppercase text-xs font-semibold active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              Áreas de Atuação
            </button>
          </motion.div>


        </div>
      </div>

    </section>
  );
}
