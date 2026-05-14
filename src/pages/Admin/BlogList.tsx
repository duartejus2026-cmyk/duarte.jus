import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { Plus, Edit, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setPosts(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (window.confirm("Tem certeza que deseja excluir este artigo?")) {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (!error) fetchPosts();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex text-primary">
      <AdminSidebar />

      <main className="flex-grow">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="font-serif text-xl font-bold">Gestão de Artigos (Blog)</h2>
          <Button variant="gold" icon={Plus} onClick={() => navigate("/admin/blog/new")}>Novo Artigo</Button>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Título</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Categoria</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Autor</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Publicado em</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-text-muted">Carregando artigos...</td></tr>
                ) : posts.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-text-muted">Nenhum artigo publicado.</td></tr>
                ) : posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-sans font-bold text-primary text-sm">{post.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-sans text-text-muted text-xs">{post.author}</td>
                    <td className="px-6 py-4 font-sans text-text-muted text-xs">
                      {new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                        className="p-2 text-primary hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
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
