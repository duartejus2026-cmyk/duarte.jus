import { supabase } from "./supabase";
import { Specialty } from "../types";

export interface TriageResult {
  specialtyRecommended: string;
  confidence: number;
  summaryPoints: string[];
  suggestedDocuments: string[];
  legalExplanation: string;
}

/**
 * Realiza a triagem jurídica chamando a Edge Function 'legal-triage'.
 */
export async function performLegalTriage(description: string): Promise<TriageResult> {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  // Validação preventiva das variáveis de ambiente
  if (!supabaseUrl || !anonKey) {
    console.error("[ERRO CRÍTICO] Variáveis do Supabase não encontradas no .env");
    throw new Error("Configuração do servidor incompleta.");
  }


  try {
    // Chamada explícita usando o invoke com headers de segurança reforçados
    const { data: response, error } = await supabase.functions.invoke('legal-triage', {
      body: { description },
      headers: {
        "Authorization": `Bearer ${anonKey}`,
        "X-Client-Info": "duarte-advocatus-web"
      }
    });

    if (error) throw error;

    if (!response || response.success === false) {
      throw new Error(response?.error || "Erro desconhecido na análise da IA.");
    }

    return response.data as TriageResult;
    
  } catch (error: any) {
    // Mantemos apenas o log de erro real para monitoramento
    console.error("Falha no fluxo de triagem:", error);
    
    // Fallback amigável para o usuário
    return {
      specialtyRecommended: "Direito Médico",
      confidence: 0,
      summaryPoints: ["Erro na comunicação com o servidor de IA."],
      suggestedDocuments: ["RG", "CPF", "Documentos do caso"],
      legalExplanation: `Ocorreu um problema técnico. Por favor, clique no botão abaixo para falar diretamente com o Dr. Israel Duarte no WhatsApp.`
    };
  }
}
