import React, { useState } from "react";
import { Scale, Menu, X, Sparkles, Calculator, UserCheck, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Início" },
    { id: "about", label: "Sobre" },
    { id: "specialties", label: "Especialidades", icon: Sparkles },
    { id: "triage", label: "Triagem IA", icon: Sparkles },
    { id: "blog", label: "Blog" },
    { id: "calculators", label: "Simuladores", icon: Calculator },
    { id: "contact", label: "Contato", icon: PhoneCall },
  ] as const;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    const element = document.getElementById(`${tabId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 w-full z-50 border-b bg-white/95 backdrop-blur-md border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        
        {/* Brand Name */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
          onClick={() => handleTabChange("home")}
          id="header-brand"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary flex items-center justify-center text-gold transition-transform hover:scale-105 duration-300 shadow-md">
            <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-gold-light" />
          </div>
          <div>
            <span className="font-serif font-bold text-lg sm:text-2xl tracking-tight text-primary block">
              Duarte Advocatus
            </span>
            <span className="text-[8px] sm:text-[10px] tracking-widest font-sans uppercase font-semibold text-gold leading-none block">
              Excelência e Estratégia Jurídica
            </span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabChange(item.id)}
                className={`relative font-sans text-[10px] xl:text-[11px] uppercase tracking-[0.2em] font-bold py-2 transition-all duration-300 whitespace-nowrap ${
                  isActive ? "text-gold" : "text-primary/60 hover:text-gold"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Call to Action Button */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block"
        >
          <button
            id="header-consult-btn"
            onClick={onOpenBooking}
            className="bg-primary text-white hover:bg-primary-light border border-gold/20 hover:border-gold/50 px-4 xl:px-6 py-2 sm:py-2.5 rounded-sm font-sans tracking-wider uppercase text-[10px] font-semibold active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <PhoneCall className="w-3 h-3 text-gold-light" />
            Agendar Consulta
          </button>
        </motion.div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            id="header-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-primary hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.2em] font-bold py-4 px-6 rounded-md transition-all ${
                      isActive ? "bg-primary text-gold-lighter" : "text-text-dark/70 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-6 mt-4 border-t border-slate-100 px-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full bg-primary text-white py-4 rounded-sm font-sans tracking-wider uppercase text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-gold-light" />
                  Agendar Consultoria
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
