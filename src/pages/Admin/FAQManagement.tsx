import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Plus, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    const { data } = await supabase.from('faq_items').select('*').order('order_index', { ascending: true });
    if (data) setFaqs(data);
    setLoading(false);
  }

  async function addFaq() {
    const newFaq = {
      question: "Nova Pergunta",
      answer: "Nova Resposta",
      order_index: faqs.length
    };
    const { data } = await supabase.from('faq_items').insert(newFaq).select();
    if (data) setFaqs([...faqs, data[0]]);
  }

  const [saveTimeout, setSaveTimeout] = useState<any>(null);

  async function updateFaq(id: string, updates: any) {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    if (saveTimeout) clearTimeout(saveTimeout);
    const timeout = setTimeout(async () => {
      setSavingId(id);
      await supabase.from('faq_items').update(updates).eq('id', id);
      setSavingId(null);
    }, 500);
    setSaveTimeout(timeout);
  }

  async function deleteFaq(id: string) {
    if (!confirm("Remover esta pergunta?")) return;
    const { error } = await supabase.from('faq_items').delete().eq('id', id);
    if (!error) setFaqs(faqs.filter(f => f.id !== id));
  }

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-primary font-bold">Carregando...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex text-primary">
      <AdminSidebar />

      <main className="flex-grow">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="font-serif text-xl font-bold text-primary">Gestão de FAQ</h2>
          <Button variant="gold" onClick={addFaq} icon={Plus}>Adicionar Pergunta</Button>
        </header>

        <div className="p-8 space-y-6 max-w-4xl">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6 transition-all hover:shadow-md">
              <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest">Dúvida #{faq.order_index + 1}</span>
                <button onClick={() => deleteFaq(faq.id)} className="text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <Input 
                label="Pergunta"
                value={faq.question}
                onChange={(e) => updateFaq(faq.id, { question: e.target.value })}
              />
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase tracking-widest">Resposta Detalhada</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm focus:outline-none focus:border-gold min-h-[150px] leading-relaxed font-sans"
                  value={faq.answer}
                  onChange={(e) => updateFaq(faq.id, { answer: e.target.value })}
                />
              </div>
              <div className="flex justify-end">
                <span className="text-[10px] uppercase font-bold text-slate-300 italic">
                  {savingId === faq.id ? "Sincronizando..." : "Alterações salvas"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
