import React, { useState } from "react";
import { Stethoscope, Landmark, Briefcase, ArrowRight, X, Calendar, AlertCircle, FileText } from "lucide-react";
import { Specialty } from "../types";

interface SpecialtiesProps {
  onOpenBooking: (specialty?: Specialty) => void;
  onOpenCalculators: (activeTab: "medical" | "banking" | "labor") => void;
}

export default function Specialties({ onOpenBooking, onOpenCalculators }: SpecialtiesProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);

  const specialtiesDetails = {
    [Specialty.MEDICO]: {
      title: "Direito Médico & da Saúde",
      icon: Stethoscope,
      brief: "Defesa robusta em casos de erro médico, negativa de cobertura por planos de saúde e responsabilidade civil hospitalar.",
      fullDescription: "Nosso departamento de Direito Médico alia conhecimento jurídico especializado à assessoria de peritos em medicina de elite. Defendemos pacientes em erros de diagnóstico, negligência sob anestesia, cirurgias plásticas malsucedidas, além de atuações tempestivas de urgência para reverter abusos de planos de saúde que recusam coberturas vitais de próteses, exames e quimioterapia.",
      highlights: [
        "Liminares imediatas para cirurgias e remédios",
        "Investigação forense de termos de consentimento",
        "Assessoria integral em Danos Estéticos e Corporais",
        "Reversão de reajustes etários abusivos de planos de saúde"
      ],
      calculatorTab: "medical" as const,
      attorneys: "Dr. Lucas Silva e Dra. Ana Carolina"
    },
    [Specialty.BANCARIO]: {
      title: "Direito Bancário Revisional",
      icon: Landmark,
      brief: "Revisão de contratos bancários, combate a juros abusivos e proteção patrimonial contra execuções indevidas de instituições financeiras.",
      fullDescription: "Bancos e financeiras atuam frequentemente no limite da legalidade contratual. Revisamos contratos de financiamento habitacional, alienações de veículos e empréstimos pessoais e corporativos. Identificamos juros capitalizados ilegais, seguros de proteção embutidos (venda casada) e impedimos a apreensão do seu veículo ou leilão de seu patrimônio de forma preventiva.",
      highlights: [
        "Revisão de contratos com taxas que superam a média BACEN",
        "Exclusão de amortizações abusivas (Sistemas Price/SAC)",
        "Defesa contra Ações de Busca e Apreensão e Execuções fiscais",
        "Recuperação de tarifas e taxas administrativas cobradas ilegalmente"
      ],
      calculatorTab: "banking" as const,
      attorneys: "Dra. Mariana Rocha e Dr. Ricardo Mendes"
    },
    [Specialty.TRABALHISTA]: {
      title: "Direito Trabalhista Estratégico",
      icon: Briefcase,
      brief: "Representação estratégica em litígios de alta complexidade para executivos, bancários e defesas corporativas especializadas.",
      fullDescription: "Com foco na excelência e na advocacia de alta performance, defendemos trabalhadores e profissionais em cargos diretivos de alta renda. Atuamos fortemente na quebra de isenções de ponto ilegais para gerentes e diretores, equiparação salarial de bancários, assédio moral corporativo de alta escala, rescisões indiretas por faltas graves do empregador e defesa de passivos empresariais.",
      highlights: [
        "Inconstitucionalidade de cargo de confiança sem real gestão",
        "Cálculo preciso de passivo de horas extras e intrajornada",
        "Processos de assédio moral e burnout profissional comprovados",
        "Ações corporativas preventivas e conformidade CLT de elite"
      ],
      calculatorTab: "labor" as const,
      attorneys: "Dr. Eduardo Costa e Dra. Julia Castro"
    }
  };

  return (
    <section id="specialties-section" className="py-20 sm:py-28 bg-[#f9f9ff]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] tracking-widest font-sans uppercase font-bold text-gold">
              Nossa Expertise Técnica
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-medium mt-2 mb-4">
              Especialidades Atuantes
            </h2>
            <div className="w-16 h-1 bg-gold rounded-sm mb-4"></div>
            <p className="font-sans text-base text-text-muted leading-relaxed">
              Soluções jurídicas sob medida, fundamentadas na atualização constante das jurisprudências dos Tribunais Superiores e no compromisso inabalável com o cliente.
            </p>
          </div>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {Object.entries(specialtiesDetails).map(([key, value]) => {
            const Icon = value.icon;
            return (
              <div
                key={key}
                id={`card-${key}`}
                className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-gold-light transition-all duration-500 mb-6">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-primary font-medium mb-3 group-hover:text-gold transition-colors">
                    {key}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed mb-6">
                    {value.brief}
                  </p>
                </div>

                <button
                  id={`saiba-mais-${key}`}
                  onClick={() => setSelectedSpecialty(key as Specialty)}
                  className="text-gold font-sans tracking-widest uppercase text-xs font-semibold inline-flex items-center gap-2 hover:gap-4 transition-all duration-200 cursor-pointer text-left self-start"
                >
                  Saiba Mais 
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

        </div>
      </div>

      {/* Specialty Deep-dive Modal */}
      {selectedSpecialty && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-in fade-in-30 duration-200">
          <div className="bg-white max-w-2xl w-full rounded-lg shadow-2xl overflow-hidden border border-gold-light/20 relative animate-in zoom-in-95 duration-300">
            
            {/* Top gold line */}
            <div className="w-full h-1.5 bg-gradient-to-r from-gold via-gold-light to-gold" />
            
            <button
              id="close-specialty-modal"
              onClick={() => setSelectedSpecialty(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex gap-4 items-center">
                {React.createElement(specialtiesDetails[selectedSpecialty].icon, {
                  className: "w-8 h-8 text-gold"
                })}
                <h3 className="font-serif text-2xl sm:text-3xl text-primary font-bold">
                  {specialtiesDetails[selectedSpecialty].title}
                </h3>
              </div>

              <div className="text-text-muted font-sans text-sm sm:text-base leading-relaxed space-y-4">
                <p>{specialtiesDetails[selectedSpecialty].fullDescription}</p>
                <p className="text-xs bg-slate-50 border-l-2 border-primary-light p-3 text-primary-light italic flex items-start gap-2 rounded-r-md">
                  <AlertCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>Advocacia sob condução do corpo de sócios seniores da Silva &amp; Associados. Corpo de defesa: <strong className="text-primary">{specialtiesDetails[selectedSpecialty].attorneys}</strong>.</span>
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-3">
                <span className="font-sans text-xs uppercase font-bold tracking-wider text-primary block">
                  Áreas Correlatas &amp; Direitos Protegidos:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-muted">
                  {specialtiesDetails[selectedSpecialty].highlights.map((highlight, index) => (
                    <li key={index} className="flex gap-2 items-center">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons inside Modal */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                <button
                  id="modal-booking-btn"
                  onClick={() => {
                    onOpenBooking(selectedSpecialty);
                    setSelectedSpecialty(null);
                  }}
                  className="flex-1 bg-primary hover:bg-primary-light text-white font-sans tracking-wide uppercase text-xs font-bold py-4 rounded-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-gold-light" />
                  Agendar com Especialista
                </button>
                <button
                  id="modal-simulator-btn"
                  onClick={() => {
                    onOpenCalculators(specialtiesDetails[selectedSpecialty].calculatorTab);
                    setSelectedSpecialty(null);
                  }}
                  className="flex-1 hover:bg-slate-50 border border-gold text-gold font-sans tracking-wide uppercase text-xs font-bold py-4 rounded-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  Simular Direitos Agora
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
