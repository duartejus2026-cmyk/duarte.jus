import React, { useState } from "react";
import { Award, Zap, ShieldAlert, History, Landmark, Users, X, ChevronRight } from "lucide-react";

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export default function WhyChooseUs({ onOpenBooking }: WhyChooseUsProps) {
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Direct lawyer portrait URL from user-provided HTML
  const lawyerImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuBtKUd3a2GkrJu3zsTG657IwGwXFd2jM_mZxd21LJrpQ_ySSIO7KoJ5zxZqBFb9itsz6cLTzvnqRZuJ9OyFAqqCeD0R3VlH3eX_A85vHGCDi8EnGEqzzVURO0uIHSuAJGxaiZnrbGiSItCp8Qutp4RuGGxlZPSwY6eHd4w0DOuMNTyH319563oFCgncDeyluHu7Uv2-7yMKqRkPt7mCf4DfISOVN-06t9WPagLf1mPNETAI37cRrOs5Kq3PRdDDGITDG_4XPP_oUeiG";

  const features = [
    {
      title: "Expertise de Alta Complexidade",
      description: "Foco exclusivo em causas que demandam profundo conhecimento técnico, análise forense apurada e teses avançadas nos Tribunais.",
      icon: Award
    },
    {
      title: "Atendimento Boutique",
      description: "Esqueça contatos impessoais. Na Silva & Associados, cada cliente recebe atenção integral direta dos sócios fundadores, com discrição e empatia.",
      icon: Zap
    },
    {
      title: "Resultados Comprovados",
      description: "Histórico sólido de acordos emblemáticos e vitórias judiciais históricas revertendo negativas abusivas de planos de saúde e anatocismos bancários.",
      icon: ShieldAlert
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 sm:py-28 bg-white border-b border-slate-50">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Block: Embedded Grayscale Image of Lawyer with double gold frame */}
          <div className="relative flex justify-center items-center w-full max-w-[480px] mx-auto lg:mx-0 select-none">
            {/* Double Border Frame Styling */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t-4 border-l-4 border-gold/45 z-0" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-4 border-r-4 border-gold/45 z-0" />
            
            <div className="relative z-10 overflow-hidden rounded-md shadow-2xl bg-slate-100 group border border-slate-200">
              <img
                src={lawyerImg}
                alt="Profissional Dr. Lucas Silva - Silva &amp; Associados"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-[800ms] ease-out-back scale-102 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent text-white flex justify-between items-end">
                <div>
                  <h4 className="font-serif font-bold text-lg tracking-tight text-white">Dr. Lucas Silva, LL.M.</h4>
                  <p className="text-[10px] font-sans tracking-wide uppercase font-semibold text-gold-light">Sócio-Fundador • OAB/SP 123.456</p>
                </div>
                <div className="bg-gold p-2 rounded-sm text-white hover:bg-gold-light transition-colors">
                  <Landmark className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Content */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] tracking-widest font-sans uppercase font-bold text-gold block">
                Nossos Diferenciais de Atendimento
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary font-medium">
                Por que escolher a Silva &amp; Associados?
              </h2>
              <div className="w-16 h-0.5 bg-gold rounded" />
            </div>

            {/* List of features */}
            <div className="space-y-6 sm:space-y-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex gap-4 sm:gap-5 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/5 text-primary flex items-center justify-center rounded-full hover:bg-primary hover:text-gold transition-colors duration-300 shadow-inner">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg sm:text-xl text-primary font-semibold mb-1">
                        {feature.title}
                      </h4>
                      <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA action */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                id="btn-conhecer-historia"
                onClick={() => setShowHistoryModal(true)}
                className="bg-primary text-white hover:bg-primary-light border border-gold/30 px-8 py-4 sm:py-4.5 rounded-sm font-sans tracking-wider uppercase text-xs font-semibold active:scale-[0.98] transition-all duration-300 cursor-pointer shadow flex items-center justify-center gap-2"
              >
                Conheça Nossa História
                <ChevronRight className="w-4 h-4 text-gold" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* History Modal detail */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full rounded-md shadow-2xl overflow-hidden border border-gold/20 relative animate-in zoom-in-95 duration-200">
            <div className="w-full h-1 bg-gold" />
            
            <button
              id="close-history-modal"
              onClick={() => setShowHistoryModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex gap-3 items-center">
                <History className="w-7 h-7 text-gold" />
                <h3 className="font-serif text-2xl sm:text-3xl text-primary font-bold">
                  Tradição e Combate Tecnológico
                </h3>
              </div>

              <div className="text-text-muted font-sans text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Fundada no ano de 2012 na capital paulista, a <strong>Silva &amp; Associados</strong> nasceu sob a firme convicção de que a advocacia de massa, embora rentável comercialmente, frustra a essência do compromisso ético de defesa de direitos individuais de alta relevância.
                </p>
                <p>
                  Idealizado pelo <strong>Dr. Lucas Silva</strong> após anos de destacada atuação em renomadas bancas corporativas, o escritório foi desenhado sob o modelo de <span className="text-primary font-medium italic">Advocacia Boutique</span>. Nele, limitamos voluntariamente o número de demandas aceitas simultaneamente, no intuito de prover um acompanhamento cirúrgico e tático de cada processo.
                </p>
                <p>
                  O diferencial reside na simbiose perfeita entre a tradição de rigor e ética jurídica de Silva e o uso das mais modernas ferramentas digitais de jurimetria, facilitando o mapeamento probabilístico de decisões nos tribunais. Seja contra falhas grotescas de operadoras de planos de saúde, negligências médicas ou anatocismo abusivo de conglomerados financeiros, sustentamos trincheiras implacáveis.
                </p>
                <p className="border-t border-slate-100 pt-4 text-xs italic font-serif flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-gold flex-shrink-0" />
                  "A advocacia de alta performance não se mede pelo número de processos distribuídos, mas pela quantidade irreparável de direitos reabilitados." — Dr. Lucas Silva
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  id="btn-close-and-booking"
                  onClick={() => {
                    setShowHistoryModal(false);
                    onOpenBooking();
                  }}
                  className="bg-gold text-white px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#8e6c1e] transition-colors"
                >
                  Entrar em Contato Prontamente
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
