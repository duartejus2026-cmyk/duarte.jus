import React, { useEffect, useState } from "react";
import { supabase, uploadImage } from "../../services/supabase";
import { Save, Image as ImageIcon, Upload } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function SiteSettings() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    const { data } = await supabase.from('about_content').select('*').single();
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setImageUrl(data.image_url || "");
    }
    setLoading(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const url = await uploadImage(e.target.files[0]);
      setImageUrl(url);
    } catch (err: any) {
      alert("Erro no upload: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data: currentAbout } = await supabase.from('about_content').select('id').single();
    const { error } = await supabase
      .from('about_content')
      .update({
        title,
        description,
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', currentAbout?.id);

    if (error) alert("Erro ao salvar: " + error.message);
    else alert("Conteúdo 'Sobre' atualizado com sucesso!");
    setSaving(false);
  }

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-primary font-bold">Carregando...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex text-primary">
      <AdminSidebar />

      <main className="flex-grow">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="font-serif text-xl font-bold">Gestão do Escritório (Sobre)</h2>
        </header>

        <div className="p-8 max-w-4xl">
          <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
            <Input 
              label="Título da Seção Sobre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Trazendo Valor Real para seus Direitos"
            />
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-widest">A História do Escritório / Missão</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm focus:outline-none focus:border-gold min-h-[300px] leading-relaxed font-sans"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-50">
              <label className="text-[10px] uppercase font-bold text-gold tracking-widest mb-4 block">Foto da Seção Sobre</label>
              <div className="flex items-center gap-8">
                <div className="w-48 h-32 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0">
                  {imageUrl ? (
                    <img src={imageUrl} className="w-full h-full object-cover" alt="About Preview" />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-slate-200" />
                  )}
                </div>
                <div className="flex-grow space-y-4">
                  <div className="relative">
                    <input 
                      type="file" 
                      id="about-upload" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                    <label 
                      htmlFor="about-upload"
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg cursor-pointer transition-all hover:bg-primary-light text-xs font-bold uppercase tracking-widest ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Upload className="w-4 h-4 text-gold-light" />
                      {uploading ? "Subindo..." : "Trocar Foto da História"}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button type="submit" variant="gold" fullWidth disabled={saving || uploading} icon={Save}>
                {saving ? "Salvando..." : "Atualizar Sobre o Escritório"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
