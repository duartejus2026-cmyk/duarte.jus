import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "outline" | "white";
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ElementType;
}

export default function Button({ 
  variant = "primary", 
  fullWidth = false, 
  children, 
  icon: Icon,
  className = "",
  ...props 
}: ButtonProps) {
  
  const baseStyles = "font-sans tracking-widest uppercase text-xs font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light shadow-primary/20",
    gold: "bg-gold text-primary-dark hover:bg-gold-light shadow-gold/20",
    outline: "border border-gold text-gold hover:bg-gold hover:text-white shadow-none",
    white: "border border-white/40 text-white hover:border-white hover:bg-white/10 shadow-none"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : "w-max"} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </motion.button>
  );
}
