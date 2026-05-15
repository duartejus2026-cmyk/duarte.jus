import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { notifyNewLead } from './notificationService';

export async function saveLead(leadData: {
  name: string;
  whatsapp: string;
  specialty: string;
  message: string;
}) {
  const { data, error } = await supabase
    .from('leads')
    .insert([
      { 
        name: leadData.name, 
        whatsapp: leadData.whatsapp, 
        specialty: leadData.specialty, 
        message: leadData.message,
        status: 'novo',
        created_at: new Date().toISOString()
      },
    ]);

  if (error) {
    console.error('Error saving lead:', error);
    throw error;
  }

  // Disparar notificações em segundo plano
  notifyNewLead(leadData).catch(err => console.error("Falha na notificação:", err));

  return data;
}
export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('site-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('site-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
