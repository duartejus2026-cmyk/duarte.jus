import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7"

/**
 * 1. Configurações
 */
const GEMINI_MODEL = "gemini-2.5-flash-lite";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const FETCH_TIMEOUT_MS = 15000;
const MAX_CHAR_LIMIT = 5000;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const createResponse = (payload: any, status = 200) => 
  new Response(JSON.stringify(payload), { 
    status, 
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } 
  });

const safeJsonParse = (text: string): any => {
  try {
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch (e) {
    return null;
  }
};

/**
 * 2. Função Principal
 */
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!apiKey || !supabaseUrl || !supabaseServiceKey) {
      console.error("[CRITICAL] Missing environment variables.");
      return createResponse({ success: false, error: "Servidor em manutenção." }, 500);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await req.json().catch(() => ({}));
    const rawText = (body.description || body.report || body.relato || body.text || "").trim();

    if (rawText.length < 10) {
      return createResponse({ success: false, error: "Relato muito curto." }, 400);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    // Chamada para o Gemini
    const geminiResponse = await fetch(`${API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Você é um Analista Jurídico Sênior da Duarte Advogados. Nossas especialidades principais são: Direito Médico, Trabalhista, Bancário e Imobiliário. Analise o relato do cliente e classifique o caso, retornando ESTRITAMENTE um JSON válido no formato abaixo. Não adicione markdown fora do JSON.
            {
              "specialtyRecommended": "Nome da Área (ex: Direito Imobiliário)",
              "confidence": 0.95,
              "summaryPoints": ["ponto principal 1", "ponto principal 2"],
              "suggestedDocuments": ["documento 1", "documento 2"],
              "legalExplanation": "Explicação técnica amigável e direta para o cliente"
            }
            Relato: "${rawText.substring(0, MAX_CHAR_LIMIT)}"`
          }]
        }],
        generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
      })
    }).finally(() => clearTimeout(timeoutId));

    const responseText = await geminiResponse.text();
    let responseData: any;
    try { responseData = JSON.parse(responseText); } catch { responseData = responseText; }

    // Tratamento de Quota (429)
    if (!geminiResponse.ok) {
      if (geminiResponse.status === 429 || responseData?.error?.status === 'RESOURCE_EXHAUSTED') {
        const fallback = {
          specialtyRecommended: "Análise Manual",
          confidence: 0,
          summaryPoints: ["Limite de uso da IA atingido."],
          suggestedDocuments: ["Documentos básicos de identificação"],
          legalExplanation: "Nossa triagem automática atingiu o limite temporário. Clique no botão abaixo para falar com um especialista."
        };
        return createResponse({ success: true, data: fallback }, 200);
      }
      return createResponse({ success: false, error: "Erro na API de IA." }, 502);
    }

    const aiOutput = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;
    const triageJson = aiOutput ? safeJsonParse(aiOutput) : null;

    if (!triageJson) {
      return createResponse({ success: false, error: "Falha na análise estrutural." }, 502);
    }

    // Persistência no Banco de Dados
    const { error: dbError } = await supabase.from('legal_triages').insert({
      description: rawText,
      specialty_recommended: triageJson.specialtyRecommended,
      confidence: triageJson.confidence,
      summary_points: triageJson.summaryPoints,
      suggested_documents: triageJson.suggestedDocuments,
      legal_explanation: triageJson.legalExplanation
    });

    if (dbError) {
      console.error("[DATABASE ERROR]", dbError.message);
      // Não bloqueamos a resposta para o usuário se apenas o log falhar
    }

    return createResponse({ success: true, data: triageJson });

  } catch (err: any) {
    console.error("[RUNTIME ERROR]", err.message);
    return createResponse({ success: false, error: "Erro interno no processamento." }, 500);
  }
});
