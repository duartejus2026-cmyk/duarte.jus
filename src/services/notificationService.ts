/**
 * Serviço de Integrações de Notificação
 * Responsável por disparar alertas via WhatsApp (Evolution API) e E-mail (Resend)
 */

const EVOLUTION_URL = import.meta.env.VITE_EVOLUTION_URL;
const EVOLUTION_API_KEY = import.meta.env.VITE_EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE = import.meta.env.VITE_EVOLUTION_INSTANCE;
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
const OFFICE_EMAIL = "israelduarte.adv@outlook.com";
const OFFICE_WHATSAPP = "5561992880223"; // Número que receberá a notificação

export async function notifyNewLead(lead: { name: string; whatsapp: string; specialty: string; message: string }) {
  // 1. Notificação WhatsApp via Evolution API
  if (EVOLUTION_URL && EVOLUTION_API_KEY && EVOLUTION_INSTANCE) {
    try {
      const messageText = `🚨 *Novo Lead Recebido*\n\n*Nome:* ${lead.name}\n*Telefone:* ${lead.whatsapp}\n*Especialidade:* ${lead.specialty}\n*Mensagem:* ${lead.message}`;
      
      await fetch(`${EVOLUTION_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': EVOLUTION_API_KEY
        },
        body: JSON.stringify({
          number: OFFICE_WHATSAPP,
          text: messageText
        })
      });
    } catch (error) {
      console.error("Erro ao notificar via WhatsApp:", error);
    }
  }

  // 2. Notificação via E-mail (Supabase Edge Function via Resend)
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({ record: lead })
      });
    }
  } catch (error) {
    console.error("Erro ao invocar Edge Function de e-mail:", error);
  }
}
