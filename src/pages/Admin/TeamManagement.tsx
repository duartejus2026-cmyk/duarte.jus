import React, { useEffect, useState } from "react";
import { supabase, uploadImage } from "../../services/supabase";
import { Plus, Trash2, Image as ImageIcon, Upload } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function TeamManagement() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingMemberId, setSavingMemberId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  async function fetchTeam() {
    const { data } = await supabase.from('team_members').select('*').order('order_index', { ascending: true });
    if (data) setMembers(data);
    setLoading(false);
  }

  async function handleImageUpload(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingId(id);
    try {
      const url = await uploadImage(e.target.files[0]);
      await updateMember(id, { image_url: url });
    } catch (err: any) {
      alert("Erro no upload: " + err.message);
    } finally {
      setUploadingId(null);
    }
  }

  async function addMember() {
    const newMember = {
      name: "Novo Advogado",
      role: "Cargo",
      specialty: "Especialidade",
      image_url: "",
      order_index: members.length
    };
    const { data } = await supabase.from('team_members').insert(newMember).select();
    if (data) setMembers([...members, data[0]]);
  }

  const [saveTimeout, setSaveTimeout] = useState<any>(null);

  async function updateMember(id: string, updates: any) {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    if (saveTimeout) clearTimeout(saveTimeout);
    const timeout = setTimeout(async () => {
      setSavingMemberId(id);
      await supabase.from('team_members').update(updates).eq('id', id);
      setSavingMemberId(null);
    }, 500);
    setSaveTimeout(timeout);
  }

  async function deleteMember(id: string) {
    if (!confirm("Tem certeza que deseja remover este membro?")) return;
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (!error) setMembers(members.filter(m => m.id !== id));
  }

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-primary font-bold">Carregando...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex text-primary">
      <AdminSidebar />

      <main className="flex-grow">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="font-serif text-xl font-bold">Gestão de Equipe</h2>
          <Button variant="gold" onClick={addMember} icon={Plus}>Adicionar Membro</Button>
        </header>

        <div className="p-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
          {members.map((member) => (
            <div key={member.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex gap-6">
                <div className="relative group w-32 h-32 shrink-0">
                  <div className="w-full h-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                    {member.image_url ? (
                      <img src={member.image_url} className="w-full h-full object-cover" alt={member.name} />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-slate-300" />
                    )}
                    {uploadingId === member.id && (
                      <div className="absolute inset-0 bg-primary/60 flex items-center justify-center text-white text-[10px] font-bold uppercase">Subindo...</div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    id={`file-${member.id}`} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(member.id, e)}
                    disabled={uploadingId === member.id}
                  />
                  <label 
                    htmlFor={`file-${member.id}`}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-gold hover:bg-gold-light text-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-110"
                  >
                    <Upload className="w-4 h-4" />
                  </label>
                </div>

                <div className="flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <Input 
                        label="Nome"
                        value={member.name}
                        onChange={(e) => updateMember(member.id, { name: e.target.value })}
                      />
                    </div>
                    <button onClick={() => deleteMember(member.id)} className="ml-4 p-2 text-red-400 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Cargo"
                      value={member.role}
                      onChange={(e) => updateMember(member.id, { role: e.target.value })}
                    />
                    <Input 
                      label="Especialidade"
                      value={member.specialty}
                      onChange={(e) => updateMember(member.id, { specialty: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <span className="text-[10px] uppercase font-bold text-slate-300">
                  {savingMemberId === member.id ? "Sincronizando..." : "Salvo em tempo real"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
