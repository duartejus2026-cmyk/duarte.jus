import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Tratamento de preflight (CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();

    if (!record || !record.email) {
      throw new Error('Payload inválido: Dados do lead não encontrados.');
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('Variável RESEND_API_KEY não configurada no Supabase.');
    }

    // Temporário: onboarding@resend.dev para testes. Trocar para israelduarte.adv@outlook.com depois
    const TO_EMAIL = 'onboarding@resend.dev'; 
    const FROM_EMAIL = 'Duarte Advogados <onboarding@resend.dev>'; // Mudar após verificação do domínio

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-lg">
        <h2 style="color: #0b1c3c; border-bottom: 2px solid #b48d3d; padding-bottom: 10px;">Novo Lead Recebido - Duarte Advogados</h2>
        
        <p><strong>Nome:</strong> ${record.name || 'Não informado'}</p>
        <p><strong>E-mail:</strong> ${record.email}</p>
        <p><strong>Telefone:</strong> ${record.phone || 'Não informado'}</p>
        <p><strong>Área de Interesse:</strong> ${record.service || 'Geral'}</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #0b1c3c; margin-top: 20px;">
          <h4 style="margin-top: 0; color: #0b1c3c;">Mensagem:</h4>
          <p style="white-space: pre-wrap;">${record.message || 'Sem mensagem adicional.'}</p>
        </div>
        
        <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
          Este e-mail foi gerado automaticamente pelo portal Duarte Advogados.<br>
          Enviado em: ${new Date().toLocaleString('pt-BR')}
        </p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `Novo Contato do Site: ${record.name || record.email}`,
        html: htmlBody,
        reply_to: record.email
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error('Erro Resend API:', errorData);
      throw new Error(`Erro ao enviar email via Resend: ${errorData}`);
    }

    const data = await res.json();
    console.log('Email enviado com sucesso:', data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Falha na execução da função send-email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
