import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../services/supabase";
import {
  Users,
  MessageSquare,
  LogOut,
  LayoutDashboard,
  FileText,
  Bell,
  Eye,
  Trash2,
  X,
  Image,
  Info,
  HelpCircle,
  LayoutPanelTop,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  specialty: string;
  message?: string;
  status: string;
  created_at: string;
  deleted_at?: string | null;
  deleted_by?: string | null;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleted, setShowDeleted] = useState(false);

  // Modals
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  const statusColors: Record<string, string> = {
    novo: "bg-blue-100 text-blue-700 border-blue-200",
    atendimento: "bg-gold/10 text-gold border-gold/20",
    convertido: "bg-green-100 text-green-700 border-green-200",
    perdido: "bg-slate-100 text-slate-500 border-slate-200",
  };

  const navItems = [
    { label: "Dashboard / Leads", href: "/admin", icon: LayoutDashboard },
    { label: "Hero", href: "/admin/hero", icon: Image },
    { label: "Sobre", href: "/admin/about", icon: Info },
    { label: "Equipe", href: "/admin/team", icon: Users },
    { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
    { label: "Blog", href: "/admin/blog", icon: FileText },
  ];

  useEffect(() => {
    checkUser();
    fetchLeads();

    const subscription = supabase
      .channel("leads-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
        fetchLeads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [showDeleted]);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) navigate("/login");
  }

  async function fetchLeads() {
    setLoading(true);
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

    if (!showDeleted) {
      query = query.is("deleted_at", null);
    } else {
      query = query.not("deleted_at", "is", null);
    }

    const { data, error } = await query;
    if (!error && data) setLeads(data as Lead[]);
    setLoading(false);
  }

  async function updateLeadStatus(id: string, newStatus: string) {
    const { error } = await supabase.from("leads").update({ status: newStatus }).eq("id", id);
    if (!error) fetchLeads();
  }

  async function confirmDeleteLead() {
    if (!deleteLead) return;
    setDeleteLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("leads")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: user?.id ?? null,
      })
      .eq("id", deleteLead.id);

    setDeleteLoading(false);
    if (!error) {
      setDeleteLead(null);
      fetchLeads();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  const currentPath = window.location.pathname;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── Sidebar ─────────────────────────────────── */}
      <aside className="w-64 bg-primary text-white flex-col hidden md:flex flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <span className="font-serif text-xl font-bold text-gold-light">Duarte Admin</span>
          <p className="text-[9px] uppercase tracking-widest text-white/40 mt-1">Painel Administrativo</p>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${
                  isActive
                    ? "bg-white/10 text-gold-lighter"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}

          {/* Melhorias Futuras */}
          <div className="pt-4 mt-4 border-t border-white/10">
            <p className="text-[8px] uppercase tracking-[0.2em] text-white/20 px-4 mb-2 font-bold">Em Desenvolvimento</p>
            {[
              { label: "Especialidades", icon: LayoutPanelTop },
              { label: "Depoimentos", icon: Users },
              { label: "Config. IA", icon: FileText },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white/20 cursor-not-allowed select-none"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-white/10 text-center">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 mb-4 font-bold">
            Duarte Advogados v2.0
          </p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 hover:bg-red-500/20 rounded-lg text-[11px] font-bold uppercase tracking-widest text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────── */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-xl font-bold text-primary">Gestão de Leads</h2>
            {!showDeleted && (
              <span className="bg-gold/10 text-gold text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-gold/20">
                {leads.filter((l) => l.status === "novo").length} Novos
              </span>
            )}
            {showDeleted && (
              <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-red-100">
                {leads.length} Excluídos
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {/* Toggle Leads Excluídos */}
            <button
              onClick={() => setShowDeleted(!showDeleted)}
              className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${
                showDeleted
                  ? "bg-red-50 text-red-500 border-red-100 hover:bg-red-100"
                  : "bg-slate-50 text-text-muted border-slate-200 hover:bg-slate-100"
              }`}
            >
              {showDeleted ? "Mostrar Ativos" : "Mostrar Excluídos"}
            </button>

            <div className="w-9 h-9 bg-slate-50 rounded-full flex items-center justify-center text-primary relative border border-slate-100">
              <Bell className="w-5 h-5" />
              {!showDeleted && leads.some((l) => l.status === "novo") && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-primary">Admin</p>
              <p className="text-[10px] text-text-muted uppercase tracking-tighter">Duarte Advogados</p>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
          {/* Stats Cards */}
          {!showDeleted && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: "Total", value: leads.length, color: "text-primary" },
                { label: "Novos", value: leads.filter((l) => l.status === "novo").length, color: "text-blue-600" },
                { label: "Atendimento", value: leads.filter((l) => l.status === "atendimento").length, color: "text-gold" },
                { label: "Convertidos", value: leads.filter((l) => l.status === "convertido").length, color: "text-green-600" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className={`text-3xl font-serif font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Leads Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/80 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Lead</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Especialidade</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Data</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest text-right min-w-[140px]">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-sm text-text-muted">
                        Carregando leads...
                      </td>
                    </tr>
                  ) : leads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-sm text-text-muted">
                        {showDeleted ? "Nenhum lead excluído encontrado." : "Aguardando novas capturas."}
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-sans font-bold text-primary text-sm">{lead.name}</p>
                          <p className="text-xs text-text-muted">{lead.email || lead.whatsapp}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-bold uppercase">
                            {lead.specialty}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {showDeleted ? (
                            <span className="px-2.5 py-1 bg-red-50 text-red-500 border border-red-100 rounded text-[9px] font-bold uppercase">
                              Excluído
                            </span>
                          ) : (
                            <select
                              value={lead.status || "novo"}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className={`text-[9px] font-bold uppercase px-2 py-1 rounded border outline-none cursor-pointer ${statusColors[lead.status || "novo"]}`}
                            >
                              <option value="novo">Novo</option>
                              <option value="atendimento">Em Atendimento</option>
                              <option value="convertido">Convertido</option>
                              <option value="perdido">Perdido</option>
                            </select>
                          )}
                        </td>
                        <td className="px-6 py-4 text-text-muted text-[10px] font-medium whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end items-center gap-1">
                            {/* Visualizar */}
                            <button
                              onClick={() => setViewLead(lead)}
                              title="Visualizar Lead"
                              className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* WhatsApp */}
                            {!showDeleted && (
                              <button
                                onClick={() => window.open(`https://wa.me/${lead.whatsapp?.replace(/\D/g, "")}`, "_blank")}
                                title="Chamar no WhatsApp"
                                className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors border border-transparent hover:border-green-100"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                            )}

                            {/* Excluir */}
                            {!showDeleted && (
                              <button
                                onClick={() => setDeleteLead(lead)}
                                title="Excluir Lead"
                                className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* ── Modal: Visualizar Lead ──────────────────── */}
      {viewLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100 relative">
            <div className="w-full h-1.5 bg-gradient-to-r from-gold via-gold-light to-gold" />
            <button
              onClick={() => setViewLead(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">Lead</p>
                <h3 className="font-serif text-2xl font-bold text-primary">{viewLead.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">E-mail</p>
                  <p className="text-primary font-medium">{viewLead.email || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">WhatsApp</p>
                  <p className="text-primary font-medium">{viewLead.whatsapp || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Especialidade</p>
                  <p className="text-primary font-medium">{viewLead.specialty || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Status</p>
                  <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded border ${statusColors[viewLead.status || "novo"]}`}>
                    {viewLead.status || "novo"}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Data</p>
                  <p className="text-primary font-medium">
                    {new Date(viewLead.created_at).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
              {viewLead.message && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Mensagem</p>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-text-muted leading-relaxed whitespace-pre-wrap">
                    {viewLead.message}
                  </div>
                </div>
              )}
              <button
                onClick={() => setViewLead(null)}
                className="w-full bg-primary text-white font-sans tracking-widest uppercase text-xs font-bold py-3 rounded-lg hover:bg-primary-light transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Confirmar Exclusão ───────────────── */}
      {deleteLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100 relative">
            <div className="w-full h-1.5 bg-gradient-to-r from-red-400 via-red-500 to-red-400" />
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-1">Excluir Lead</h3>
                  <p className="text-sm font-bold text-primary">{deleteLead.name}</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <p className="text-sm text-red-700 leading-relaxed">
                  Tem certeza que deseja excluir este lead? Esta ação não poderá ser desfeita.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setDeleteLead(null)}
                  disabled={deleteLoading}
                  className="flex-1 border border-slate-200 text-text-dark font-sans tracking-widest uppercase text-xs font-bold py-3.5 rounded-lg hover:bg-slate-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteLead}
                  disabled={deleteLoading}
                  className="flex-1 bg-red-500 text-white font-sans tracking-widest uppercase text-xs font-bold py-3.5 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
