import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { Save, ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function BlogPostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "Direito Médico",
    author: "Dr. Israel Duarte"
  });

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (!error) setFormData(data);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = formData.title.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const postData = {
      ...formData,
      slug,
      published_at: new Date().toISOString()
    };

    let result;
    if (id) {
      result = await supabase.from('posts').update(postData).eq('id', id);
    } else {
      result = await supabase.from('posts').insert([postData]);
    }

    if (!result.error) {
      navigate("/admin/blog");
    } else {
      alert("Erro ao salvar artigo: " + result.error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-primary">
      <AdminSidebar />

      <main className="flex-grow flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin/blog")} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-text-muted" />
            </button>
            <h2 className="font-serif text-xl font-bold">
              {id ? "Editar Artigo" : "Novo Artigo"}
            </h2>
          </div>
          <Button variant="gold" icon={Save} onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Publicar Artigo"}
          </Button>
        </header>

        <div className="max-w-4xl w-full p-8">
          <form className="space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input 
                  label="Título do Artigo" 
                  placeholder="Ex: Como agir em casos de negativa de cirurgia"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-primary ml-1">Categoria</label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:border-gold outline-none font-sans"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>Direito Médico</option>
                  <option>Direito Bancário</option>
                  <option>Direito Trabalhista</option>
                  <option>Informativo</option>
                </select>
              </div>
              <Input 
                label="URL da Imagem de Capa" 
                placeholder="https://exemplo.com/imagem.jpg"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-primary ml-1">Resumo (Aparece na listagem)</label>
              <textarea 
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:border-gold outline-none font-sans resize-none"
                placeholder="Um breve resumo do que o leitor encontrará no artigo..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-primary ml-1">Conteúdo do Artigo</label>
              <textarea 
                rows={15}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:border-gold outline-none font-sans resize-none"
                placeholder="Escreva o conteúdo completo aqui..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              ></textarea>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
