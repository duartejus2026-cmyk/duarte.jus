import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, MessageSquare, FileText, LogOut, Type } from "lucide-react";
import { supabase } from "../../services/supabase";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/hero", label: "Página Inicial", icon: Type },
    { path: "/admin/about", label: "Sobre o Escritório", icon: FileText },
    { path: "/admin/team", label: "Equipe", icon: Users },
    { path: "/admin/faq", label: "FAQ", icon: MessageSquare },
    { path: "/admin/blog", label: "Blog", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-primary text-white flex flex-col hidden md:flex shrink-0">
      <div className="p-8 border-b border-white/10">
        <span className="font-serif text-xl font-bold text-gold-light">Duarte Admin</span>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${
                isActive ? "bg-white/10 text-gold-lighter" : "hover:bg-white/5 opacity-60"
              }`}
            >
              <Icon className="w-4 h-4" /> {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 rounded-lg text-sm font-bold uppercase tracking-widest text-red-400">
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </div>
    </aside>
  );
}
