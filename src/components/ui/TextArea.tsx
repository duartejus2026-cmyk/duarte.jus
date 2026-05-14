import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase font-bold tracking-widest text-primary ml-1">
        {label}
      </label>
      <textarea 
        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors font-sans text-text-dark placeholder:text-slate-400 resize-none"
        {...props}
      />
    </div>
  );
}
