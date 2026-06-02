import React from "react";
import { ArrowRight, ShieldCheck, Sparkles, Scale } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  onExploreAreas: () => void;
  onOpenCalculators: () => void;
}

export default function Hero({ onOpenBooking, onExploreAreas, onOpenCalculators }: HeroProps) {
  // Direct link to the image from the user provided HTML
  const statueImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDxzuLAEXYt3xwhQqQzxG00aUi4FNLtu3jFO1_0cvZ278IvEya0oLQixC1_IduuD9DC1UG45Vx6sL8dWAMYrnUAQNIHUMCs-qq8v-mLsxIwpgpfXywb1nUkrcZ6-gk5-qvzWHQEPQ8V_7I2FKjv-Ni935Vc01ZRB_5JSEIdVQnPC4Ck66JjstT8HIvq0eDwtYXtAY6KAko1wUo7D1p9Dhr7NmQAw9-beolL-GNACx-eaK5zNkJYJJ-bN_AB7S0J6N4D7MTGzRSJ8kAi";

  return (
    <section className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <img
          src={statueImg}
          alt="Estátua da Justiça em Brasília - Duarte Advocatus"
          className="w-full h-full object-cover object-center select-none scale-105 pointer-events-none transition-transform duration-[10000ms] hover:scale-100"
          referrerPolicy="no-referrer"
        />
        {/* Authoritative deep overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/65 sm:from-primary/90 sm:via-primary/75 sm:to-primary/50" />
      </div>

      {/* Floating high-fidelity details */}
      <div className="absolute top-10 right-10 hidden xl:flex flex-col gap-3 max-w-xs bg-white/5 backdrop-blur-md p-5 rounded border border-white/10 text-white shadow-xl">
        <div className="flex gap-2 items-center text-gold-light text-xs font-semibold tracking-wider uppercase font-sans">
          <ShieldCheck className="w-4 h-4" />
          Relação de Trust Boutique
        </div>
        <p className="text-sm font-light text-white/85">
          "Tratamos cada litígio com a exclusividade e a dedicação artesanal que as causas complexas impõem."
        </p>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-left">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/15 border border-gold-light/20 sm:bg-[#775a19]/25 sm:border-[#775a19]/30 text-gold-lighter rounded-full font-sans text-xs tracking-widest font-semibold uppercase animate-pulse">
            <Scale className="w-3.5 h-3.5 text-gold-light" />
            Excelência em Defesa Jurídica
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-semibold leading-[1.1] tracking-tight">
            Advocacia de Alta Performance em Causas Complexas
          </h1>

          {/* Description */}
          <p className="font-sans text-base sm:text-lg lg:text-xl text-white/80 max-w-xl sm:max-w-2xl font-light leading-relaxed">
            Protegemos seus direitos com o rigor técnico e a sensibilidade humana que as questões de alta complexidade exigem. Somos o seu porto seguro em Direito Médico, Direito Bancário e Direito Trabalhista.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              id="hero-scheduling-btn"
              onClick={onOpenBooking}
              className="bg-gold hover:bg-[#8e6c1e] text-white px-8 py-4 sm:py-4.5 rounded-sm font-sans tracking-wider uppercase text-xs font-semibold hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-gold/20"
            >
              Agende uma Consultoria
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              id="hero-scroll-btn"
              onClick={onExploreAreas}
              className="border border-white/40 text-white hover:border-white hover:bg-white/10 px-8 py-4 sm:py-4.5 rounded-sm font-sans tracking-wider uppercase text-xs font-semibold active:scale-[0.99] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              Nossas Áreas Atuantes
            </button>
          </div>

          {/* Integrated trust points */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-lg">
            <div>
              <span className="block font-serif text-2xl font-bold text-gold-light">98.4%</span>
              <span className="block text-xs uppercase font-sans text-white/60 tracking-wider">Êxito Revisional</span>
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold text-gold-light">+R$ 15M</span>
              <span className="block text-xs uppercase font-sans text-white/60 tracking-wider">Recuperados</span>
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold text-gold-light">Limite zero</span>
              <span className="block text-xs uppercase font-sans text-white/60 tracking-wider">De Negligências</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
