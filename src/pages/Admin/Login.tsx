import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Lock, Mail, ShieldCheck } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = isRegistering 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message === "User already registered" ? "E-mail já cadastrado. Tente fazer login." : "Erro na autenticação. Verifique os dados.");
      setLoading(false);
    } else if (isRegistering) {
      setError("Conta criada! Agora você pode entrar.");
      setIsRegistering(false);
      setLoading(false);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-primary p-8 text-center border-b border-white/10">
          <div className="inline-flex items-center gap-2 text-gold-light mb-4">
            <ShieldCheck className="w-8 h-8" />
            <span className="font-serif text-2xl font-bold tracking-tight">Duarte Advocatus</span>
          </div>
          <h2 className="text-white font-sans text-sm uppercase tracking-[0.2em] font-bold opacity-80">Portal Administrativo</h2>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleAuth}>
          {error && (
            <div className={`p-4 rounded-lg text-sm font-medium border ${error.includes('sucesso') || error.includes('criada') ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
              {error}
            </div>
          )}

          <Input 
            label="E-mail" 
            type="email" 
            placeholder="admin@duarteadvocatus.com.br"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input 
            label="Senha" 
            type="password" 
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="space-y-4">
            <Button 
              variant="primary" 
              fullWidth 
              type="submit" 
              disabled={loading}
              icon={Lock}
            >
              {loading ? "Processando..." : (isRegistering ? "Criar Minha Conta" : "Entrar no Painel")}
            </Button>

            <button 
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full text-center text-xs font-bold text-gold uppercase tracking-widest hover:underline"
            >
              {isRegistering ? "Já tenho conta? Entrar" : "Não tem conta? Cadastrar-se"}
            </button>
          </div>

          <p className="text-[10px] text-text-muted text-center uppercase tracking-widest font-medium">
            Acesso Restrito à Equipe Duarte Advocatus
          </p>
        </form>
      </div>
    </div>
  );
}
