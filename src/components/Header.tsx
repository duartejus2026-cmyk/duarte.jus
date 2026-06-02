import React, { useState } from "react";
import { Scale, Menu, X, Sparkles, Calculator, UserCheck, PhoneCall } from "lucide-react";

interface HeaderProps {
  activeTab: "home" | "triage" | "calculators" | "dashboard" | "contact";
  setActiveTab: (tab: "home" | "triage" | "calculators" | "dashboard" | "contact") => void;
  onOpenBooking: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Início" },
    { id: "triage", label: "Triagem Inteligente IA", icon: Sparkles },
    { id: "calculators", label: "Simuladores de Direitos", icon: Calculator },
    { id: "dashboard", label: "Área do Cliente", icon: UserCheck },
  ] as const;

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 w-full z-50 border-b bg-white/95 backdrop-blur-md border-slate-100 shadow-sm shadow-slate-900/5 transition-all duration-300">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        
        {/* Brand Name */}
        <div 
          className="flex items-center gap-3 sm:gap-4 cursor-pointer select-none py-1"
          onClick={() => handleTabChange("home")}
          id="header-brand"
        >
          <img 
            src="/logo.png" 
            alt="Duarte Advocatus Logo" 
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col justify-center">
            <span className="font-serif font-bold text-xl sm:text-2xl md:text-3xl tracking-tight text-primary block leading-none mb-1">
              Duarte Advocatus
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] font-sans uppercase font-bold text-[#b48d3d] leading-none block">
              Excelência e Estratégia Jurídica
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-4 lg:gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabChange(item.id)}
                className={`flex items-center gap-2 font-serif text-base lg:text-lg tracking-tight px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive
                    ? "text-gold font-semibold border-b-2 border-gold rounded-none pb-1"
                    : "text-text-dark/75 hover:text-gold hover:translate-y-[-1px]"
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-gold-light" />}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Call to Action Button */}
        <div className="hidden sm:block">
          <button
            id="header-consult-btn"
            onClick={onOpenBooking}
            className="bg-primary text-white hover:bg-primary-light border border-gold/20 hover:border-gold/50 px-5 py-2.5 rounded-sm font-sans tracking-wider uppercase text-xs font-semibold active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
          >
            <PhoneCall className="w-3.5 h-3.5 text-gold-light" />
            Agendar Prontamente
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            id="header-mobile-cons-btn"
            onClick={onOpenBooking}
            className="sm:hidden bg-primary p-2.5 rounded-lg text-gold-light hover:bg-primary-light transition-colors"
            title="Agendar Consulta"
          >
            <PhoneCall className="w-4 h-4" />
          </button>
          <button
            id="header-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-primary hover:bg-slate-100 hover:text-gold transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-inner transition-all duration-300 animate-in fade-in-20 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-3 font-serif text-lg py-3 px-4 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary text-gold-lighter font-medium"
                    : "text-text-dark/85 hover:bg-slate-50 hover:text-gold"
                }`}
              >
                {Icon && <Icon className="w-5 h-5 text-gold-light" />}
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-slate-100">
            <button
              id="mobile-nav-booking-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-primary hover:bg-primary-light text-white border border-gold/40 py-3.5 rounded-sm font-sans tracking-wider uppercase text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-gold-light" />
              Consultoria Especializada
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
