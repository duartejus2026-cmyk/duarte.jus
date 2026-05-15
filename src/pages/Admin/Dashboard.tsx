import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { Users, MessageSquare, LogOut, LayoutDashboard, FileText, Bell } from "lucide-react";
import Button from "../../components/ui/Button";

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const statusColors: any = {
    'novo': 'bg-blue-100 text-blue-700 border-blue-200',
    'atendimento': 'bg-gold/10 text-gold border-gold/20',
    'convertido': 'bg-green-100 text-green-700 border-green-200',
    'perdido': 'bg-slate-100 text-slate-500 border-slate-200'
  };

  useEffect(() => {
    checkUser();
    fetchLeads();

    // Inscrição Real-time para novos leads
    const subscription = supabase
      .channel('leads-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchLeads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate("/login");
  }

  async function fetchLeads() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setLeads(data);
    setLoading(false);
  }

  async function updateLeadStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', id);
    
    if (!error) fetchLeads();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar ... (mantendo igual ao anterior para brevidade, mas garantindo funcionalidade) */}
      <aside className="w-64 bg-primary text-white flex flex-col hidden md:flex">
        <div className="p-8 border-b border-white/10">
          <span className="font-serif text-xl font-bold text-gold-light">Duarte Admin</span>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link to="/admin" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest ${window.location.pathname === '/admin' ? 'bg-white/10 text-gold-lighter' : 'hover:bg-white/5 opacity-60'}`}>
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link to="/admin/blog" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 opacity-60 rounded-lg text-sm font-bold uppercase tracking-widest">
            <FileText className="w-4 h-4" /> Blog
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10 text-center">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 mb-4 font-bold">Duarte Advocatus v2.0</p>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 hover:bg-red-500/20 rounded-lg text-sm font-bold uppercase tracking-widest text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-xl font-bold text-primary">Gestão de Leads</h2>
            <span className="bg-gold/10 text-gold text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-gold/20">
              {leads.filter(l => l.status === 'novo').length} Novos
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-primary relative border border-slate-100">
              <Bell className="w-5 h-5" />
              {leads.some(l => l.status === 'novo') && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-primary">Admin Duarte</p>
              <p className="text-[10px] text-text-muted uppercase tracking-tighter">Administrador</p>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total', value: leads.length, color: 'text-primary' },
              { label: 'Novos', value: leads.filter(l => l.status === 'novo').length, color: 'text-blue-600' },
              { label: 'Atendimento', value: leads.filter(l => l.status === 'atendimento').length, color: 'text-gold' },
              { label: 'Convertidos', value: leads.filter(l => l.status === 'convertido').length, color: 'text-green-600' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">{stat.label}</p>
                <p className={`text-3xl font-serif font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Lead</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Especialidade</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Data</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-text-muted">Carregando inteligência de leads...</td></tr>
                  ) : leads.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-text-muted">Aguardando novas capturas.</td></tr>
                  ) : leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-sans font-bold text-primary text-sm">{lead.name}</p>
                        <p className="text-xs text-text-muted">{lead.whatsapp}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-bold uppercase">
                          {lead.specialty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={lead.status || 'novo'} 
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className={`text-[9px] font-bold uppercase px-2 py-1 rounded border outline-none cursor-pointer ${statusColors[lead.status || 'novo']}`}
                        >
                          <option value="novo">Novo</option>
                          <option value="atendimento">Em Atendimento</option>
                          <option value="convertido">Convertido</option>
                          <option value="perdido">Perdido</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-text-muted text-[10px] font-medium">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => window.open(`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`, '_blank')}
                            className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors border border-transparent hover:border-green-100"
                            title="Chamar no WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 text-primary rounded-lg transition-colors border border-transparent hover:border-slate-200">
                            <Users className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
