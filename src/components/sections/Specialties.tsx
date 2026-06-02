import React, { useEffect, useState } from "react";
import { Stethoscope, Landmark, Briefcase, ArrowRight, X, Calendar, AlertCircle, FileText, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

enum Specialty {
  MEDICO = "Médico",
  BANCARIO = "Bancário",
  TRABALHISTA = "Trabalhista",
  IMOBILIARIO = "Imobiliário"
}

interface SpecialtiesProps {
  onOpenBooking: (specialty?: string) => void;
}

export default function Specialties({ onOpenBooking }: SpecialtiesProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [specialties, setSpecialties] = useState<any>(null);

  useEffect(() => {
    async function fetchSpecialties() {
      const { data } = await supabase.from('site_specialties').select('*');
      if (data && data.length > 0) {
        const formatted = data.reduce((acc: any, item: any) => {
          acc[item.slug.toUpperCase()] = {
            title: item.title,
            image: item.slug === 'medico' ? '/images/specialties/medical.png' : item.slug === 'bancario' ? '/images/specialties/banking.png' : item.slug === 'imobiliario' ? '/images/specialties/real_estate.png' : '/images/specialties/labor.png',
            icon: item.slug === 'medico' ? Stethoscope : item.slug === 'bancario' ? Landmark : item.slug === 'imobiliario' ? Building : Briefcase,
            brief: item.brief,
            fullDescription: item.full_description,
            highlights: item.highlights || [],
            attorneys: item.attorneys
          };
          return acc;
        }, {});
        setSpecialties(formatted);
      }
    }
    fetchSpecialties();
  }, []);

  const specialtiesDetails = specialties || {
    [Specialty.MEDICO]: {
      title: "Direito Médico & Saúde",
      image: "/images/specialties/medical.png",
      icon: Stethoscope,
      brief: "Defesa robusta em casos de erro médico e negativa de cobertura por planos de saúde.",
      fullDescription: "Atuamos na vanguarda da defesa do paciente. De erros cirúrgicos a negativas abusivas de tratamento, nossa equipe combina rigor jurídico com sensibilidade humana para garantir que sua saúde e seus direitos sejam preservados.",
      highlights: [
        "Liminares urgentes para cirurgias",
        "Casos de erro médico e diagnóstico",
        "Revisão de reajustes abusivos",
        "Direito a medicamentos de alto custo"
      ],
      attorneys: "Dr. Israel Duarte e equipe especializada"
    },
    [Specialty.BANCARIO]: {
      title: "Direito Bancário Estratégico",
      image: "/images/specialties/banking.png",
      icon: Landmark,
      brief: "Revisão de contratos, combate a juros abusivos e proteção contra execuções.",
      fullDescription: "Protegemos seu patrimônio contra as práticas abusivas das instituições financeiras. Nossa análise técnica identifica irregularidades em contratos de financiamento, empréstimos e execuções fiscais, buscando sempre o equilíbrio contratual.",
      highlights: [
        "Revisional de Juros e Taxas",
        "Defesa contra Busca e Apreensão",
        "Exclusão de Seguros Venda Casada",
        "Blindagem Patrimonial Legal"
      ],
      attorneys: "Dra. Beatriz Duarte e especialistas financeiros"
    },
    [Specialty.TRABALHISTA]: {
      title: "Direito Trabalhista de Elite",
      image: "/images/specialties/labor.png",
      icon: Briefcase,
      brief: "Representação de alta complexidade para executivos e profissionais liberais.",
      fullDescription: "Focamos em litígios trabalhistas que exigem análise profunda. De rescisões de altos cargos a casos de assédio moral corporativo, defendemos a dignidade do trabalho com estratégias vitoriosas nos tribunais.",
      highlights: [
        "Cargos de Confiança e Horas Extras",
        "Assédio Moral e Burnout",
        "Equiparação Salarial e Bônus",
        "Rescisão Indireta Estratégica"
      ],
      attorneys: "Corpo Jurídico Sênior Duarte Advocatus"
    },
    [Specialty.IMOBILIARIO]: {
      title: "Direito Imobiliário e Patrimonial",
      image: "/images/specialties/real_estate.png",
      icon: Building,
      brief: "Segurança jurídica em contratos, compra, venda e regularização de imóveis.",
      fullDescription: "Garantimos a proteção do seu patrimônio imobiliário através de uma assessoria consultiva e contenciosa especializada. Atuamos fortemente em litígios complexos com construtoras, regularizações documentais e blindagem de transações imobiliárias para garantir que seus investimentos estejam 100% seguros.",
      highlights: [
        "Revisão de Contratos Imobiliários",
        "Compra, Venda e Locação Seguras",
        "Ações de Usucapião e Despejo",
        "Distrato e Atraso na Entrega (Construtoras)"
      ],
      attorneys: "Dr. Carlos Duarte e equipe especializada"
    }
  };

  return (
    <section id="specialties-section" className="py-24 bg-surface-bright">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <span className="text-[11px] tracking-widest font-sans uppercase font-bold text-gold">
            Nossa Expertise Técnica
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-primary font-medium mt-2 mb-6">
            Áreas de Atuação Especializada
          </h2>
          <div className="w-20 h-1.5 bg-gold rounded-full mb-6"></div>
          <p className="font-sans text-lg text-text-muted leading-relaxed">
            Unimos tradição e inovação para oferecer soluções jurídicas que atendem aos mais altos padrões de excelência.
          </p>
        </motion.div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {Object.entries(specialtiesDetails).map(([key, value]: [string, any], index) => {
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md border-b-4 border-gold hover:shadow-2xl transition-all duration-500 group flex flex-col overflow-hidden"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-primary/40 z-10 group-hover:bg-primary/20 transition-colors duration-500"></div>
                  <img 
                    src={value.image} 
                    alt={value.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-primary font-semibold mb-4 group-hover:text-gold transition-colors">
                      {value.title}
                    </h3>
                    <p className="font-sans text-text-muted leading-relaxed mb-8">
                      {value.brief}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedSpecialty(key as Specialty)}
                    className="text-gold font-sans tracking-widest uppercase text-xs font-bold inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 cursor-pointer mt-auto"
                  >
                    Conhecer em Detalhes 
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Deep-dive */}
      <AnimatePresence>
        {selectedSpecialty && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpecialty(null)}
              className="absolute inset-0 bg-primary/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden border border-gold/20 relative z-10"
            >
              <div className="w-full h-2 bg-gradient-to-r from-gold via-gold-light to-gold" />
              
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-primary hover:bg-slate-100 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 sm:p-12 space-y-8">
                <div className="flex gap-6 items-center">
                  {React.createElement(specialtiesDetails[selectedSpecialty].icon, {
                    className: "w-10 h-10 text-gold"
                  })}
                  <h3 className="font-serif text-3xl sm:text-4xl text-primary font-bold">
                    {specialtiesDetails[selectedSpecialty].title}
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-text-muted font-sans text-lg leading-relaxed">
                    {specialtiesDetails[selectedSpecialty].fullDescription}
                  </p>
                  <div className="bg-slate-50 border-l-4 border-gold p-4 rounded-r-lg">
                    <p className="text-sm text-primary-light italic flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-gold flex-shrink-0" />
                      <span>Defesa conduzida sob supervisão direta de: <strong>{specialtiesDetails[selectedSpecialty].attorneys}</strong>.</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specialtiesDetails[selectedSpecialty].highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-3 items-center text-sm text-text-muted font-medium">
                      <div className="w-2 h-2 bg-gold rounded-full" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    onClick={() => {
                      onOpenBooking(selectedSpecialty);
                      setSelectedSpecialty(null);
                    }}
                    className="flex-1 bg-primary text-white font-sans tracking-widest uppercase text-xs font-bold py-4 rounded-lg hover:bg-primary-light transition-all flex items-center justify-center gap-3"
                  >
                    <Calendar className="w-4 h-4 text-gold-light" />
                    Falar com Especialista
                  </button>
                  <button
                    onClick={() => setSelectedSpecialty(null)}
                    className="flex-1 border border-gold text-gold font-sans tracking-widest uppercase text-xs font-bold py-4 rounded-lg hover:bg-gold hover:text-white transition-all flex items-center justify-center gap-3"
                  >
                    Fechar Detalhes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
