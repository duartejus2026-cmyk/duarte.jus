import React from "react";
import { Scale, Instagram, Linkedin, Facebook, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary-light text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Desc */}
          <div className="space-y-6 col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-gold border border-gold/20">
                <Scale className="w-5 h-5 text-gold-light" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Duarte<span className="text-gold-light">Advocatus</span>
              </span>
            </div>
            <p className="font-sans text-sm text-white/50 leading-relaxed">
              Advocacia de alta performance focada em resultados extraordinários e na defesa intransigente dos direitos dos nossos clientes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-colors text-white/70 hover:text-white">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-colors text-white/70 hover:text-white">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-colors text-white/70 hover:text-white">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-bold text-gold-light">Navegação</h4>
            <ul className="space-y-3 font-sans text-sm text-white/60">
              <li><a href="#home-section" className="hover:text-gold-light transition-colors">Início</a></li>
              <li><a href="#about-section" className="hover:text-gold-light transition-colors">Sobre o Escritório</a></li>
              <li><a href="#blog-section" className="hover:text-gold-light transition-colors">Blog Jurídico</a></li>
              <li><a href="#faq-section" className="hover:text-gold-light transition-colors">Perguntas Frequentes</a></li>
              <li><a href="#contact-section" className="hover:text-gold-light transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-bold text-gold-light">Especialidades</h4>
            <ul className="space-y-3 font-sans text-sm text-white/60">
              <li><a href="#" className="hover:text-gold-light transition-colors">Direito Médico</a></li>
              <li><a href="#" className="hover:text-gold-light transition-colors">Direito Bancário</a></li>
              <li><a href="#" className="hover:text-gold-light transition-colors">Direito Trabalhista</a></li>
              <li><a href="#" className="hover:text-gold-light transition-colors">Execuções e Cobranças</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-medium text-center md:text-left flex items-center gap-4">
            <span>© 2026 Duarte Advocatus.</span>
            <a href="/login" className="hover:text-gold transition-colors opacity-50 hover:opacity-100">Acesso Restrito</a>
          </p>
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-gold-light transition-colors"
          >
            Voltar ao topo
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold-light transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
