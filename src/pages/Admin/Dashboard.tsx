import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { Users, MessageSquare, LogOut, LayoutDashboard, FileText, Bell } from "lucide-react";
import Button from "../../components/ui/Button";

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    fetchLeads();
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

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col hidden md:flex">
        <div className="p-8 border-b border-white/10">
          <span className="font-serif text-xl font-bold text-gold-light">Duarte Admin</span>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link to="/admin" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest ${window.location.pathname === '/admin' ? 'bg-white/10 text-gold-lighter' : 'hover:bg-white/5 opacity-60'}`}>
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link to="/admin/about" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest ${window.location.pathname === '/admin/about' ? 'bg-white/10 text-gold-lighter' : 'hover:bg-white/5 opacity-60'}`}>
            <LayoutDashboard className="w-4 h-4" /> Sobre o Site
          </Link>
          <Link to="/admin/team" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest ${window.location.pathname === '/admin/team' ? 'bg-white/10 text-gold-lighter' : 'hover:bg-white/5 opacity-60'}`}>
            <Users className="w-4 h-4" /> Equipe
          </Link>
          <Link to="/admin/faq" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest ${window.location.pathname === '/admin/faq' ? 'bg-white/10 text-gold-lighter' : 'hover:bg-white/5 opacity-60'}`}>
            <MessageSquare className="w-4 h-4" /> FAQ
          </Link>
          <Link to="/admin/blog" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest ${window.location.pathname.includes('/blog') ? 'bg-white/10 text-gold-lighter' : 'hover:bg-white/5 opacity-60'}`}>
            <FileText className="w-4 h-4" /> Blog
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 rounded-lg text-sm font-bold uppercase tracking-widest text-red-400">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="font-serif text-xl font-bold text-primary">Gestão de Leads</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-primary relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-gold rounded-full border-2 border-white"></span>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-primary">Admin Duarte</p>
              <p className="text-[10px] text-text-muted uppercase">Administrador</p>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Total de Leads</p>
              <p className="text-3xl font-serif font-bold text-primary">{leads.length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Aguardando Triagem</p>
              <p className="text-3xl font-serif font-bold text-gold">{leads.filter(l => !l.status).length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Convertidos</p>
              <p className="text-3xl font-serif font-bold text-green-600">0</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Nome</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">WhatsApp</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Especialidade</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Data</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-text-muted">Carregando leads...</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-text-muted">Nenhum lead encontrado.</td></tr>
                ) : leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-sans font-bold text-primary text-sm">{lead.name}</td>
                    <td className="px-6 py-4 font-sans text-text-muted text-sm">{lead.whatsapp}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-[10px] font-bold uppercase">
                        {lead.specialty}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-sans text-text-muted text-xs">
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary hover:text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
