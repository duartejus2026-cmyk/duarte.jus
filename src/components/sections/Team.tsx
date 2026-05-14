import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Users } from "lucide-react";
import { supabase } from "../../services/supabase";

interface Member {
  id: string;
  name: string;
  role: string;
  image_url: string;
  specialty: string;
}

export default function Team() {
  const [team, setTeam] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchTeam() {
      const { data } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });
      if (data) setTeam(data);
    }
    fetchTeam();
  }, []);

  if (team.length === 0) return null;

  return (
    <section id="team-section" className="py-24 bg-surface-bright">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <span className="text-[11px] tracking-widest font-sans uppercase font-bold text-gold mb-3 block">
            Corpo Jurídico de Elite
          </span>
          <h2 className="font-serif text-4xl text-primary font-bold mb-4">Nossa Equipe</h2>
          <div className="h-1 w-20 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[4/5] shadow-xl">
                {member.image_url ? (
                  <img 
                    src={member.image_url} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                    <Users className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-gold transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-gold transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-serif text-2xl font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{member.role}</p>
                <div className="h-px w-10 bg-slate-200 mx-auto mb-3" />
                <p className="text-text-muted text-sm font-sans">{member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
