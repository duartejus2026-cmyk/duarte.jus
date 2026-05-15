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

  // 2. Notificação via E-mail (Resend)
  if (RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Duarte Advocatus <contato@resend.dev>', // Em produção usar domínio próprio
          to: [OFFICE_EMAIL],
          subject: `🚨 Novo Lead: ${lead.name} - ${lead.specialty}`,
          html: `
            <div style="font-family: sans-serif; color: #1a1a1a;">
              <h2 style="color: #c5a059;">Novo Lead Recebido</h2>
              <p><strong>Nome:</strong> ${lead.name}</p>
              <p><strong>WhatsApp:</strong> ${lead.whatsapp}</p>
              <p><strong>Especialidade:</strong> ${lead.specialty}</p>
              <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
              <p><strong>Mensagem:</strong></p>
              <p>${lead.message}</p>
            </div>
          `
        })
      });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
    }
  }
}
