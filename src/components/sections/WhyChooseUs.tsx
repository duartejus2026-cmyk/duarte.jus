import React from "react";
import { Shield, Clock, Users, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Shield,
      title: "Segurança Jurídica",
      description: "Atuação pautada no rigor técnico e nas jurisprudências mais atualizadas dos Tribunais Superiores."
    },
    {
      icon: Clock,
      title: "Agilidade Estratégica",
      description: "Entendemos que o tempo é um fator crítico. Nossas soluções são rápidas, precisas e eficazes."
    },
    {
      icon: Users,
      title: "Atendimento Boutique",
      description: "Tratamento personalizado. Cada cliente fala diretamente com os sócios, garantindo exclusividade."
    },
    {
      icon: Award,
      title: "Resultados Comprovados",
      description: "Histórico de sucesso em causas de alta complexidade contra grandes instituições e corporações."
    }
  ];

  return (
    <section id="about-section" className="py-24 bg-primary text-white overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-[11px] tracking-widest font-sans uppercase font-bold text-gold-light">
              Por que a Duarte Advocatus?
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight">
              Excelência Jurídica <br /> 
              <span className="text-gold-light">Sem Concessões</span>
            </h2>
            <p className="font-sans text-lg text-white/70 leading-relaxed max-w-xl">
              Não somos apenas advogados; somos parceiros estratégicos na proteção dos seus direitos. Nossa missão é oferecer a segurança que você precisa para enfrentar os desafios mais complexos.
            </p>

            <ul className="space-y-4">
              {["Foco em Direito Médico e Bancário", "Equipe de Sócios Seniores", "Infraestrutura Tecnológica"].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-center gap-3 text-gold-lighter font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold-light" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <reason.icon className="w-10 h-10 text-gold-light mb-6" />
                <h3 className="font-serif text-xl font-semibold mb-3">{reason.title}</h3>
                <p className="font-sans text-sm text-white/60 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
