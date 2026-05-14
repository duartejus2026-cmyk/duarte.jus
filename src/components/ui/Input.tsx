import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
  suffix?: string;
}

export default function Input({ label, prefix, suffix, ...props }: InputProps) {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Seleciona todo o texto para que qualquer tecla digitada substitua o valor atual
    e.target.select();
    props.onFocus?.(e);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase font-bold tracking-widest text-primary ml-1">
        {label}
      </label>
      <div className="relative group">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-sans text-sm pointer-events-none group-focus-within:text-gold transition-colors">
            {prefix}
          </span>
        )}
        <input 
          className={`w-full bg-white border border-slate-200 rounded-lg py-3 focus:outline-none focus:border-gold transition-colors font-sans text-text-dark placeholder:text-slate-400 ${prefix ? 'pl-11 pr-4' : 'px-4'} ${suffix ? 'pr-20' : ''}`}
          onFocus={handleFocus}
          inputMode={props.type === "number" ? "decimal" : undefined}
          {...props}
          type={props.type === "number" ? "text" : props.type}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-sans text-sm pointer-events-none group-focus-within:text-gold transition-colors">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
