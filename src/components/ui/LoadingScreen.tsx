import React from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-2xl bg-white/5 border border-gold/20 flex items-center justify-center text-gold shadow-2xl">
          <Scale className="w-12 h-12 text-gold-light" />
        </div>
        
        {/* Shine effect */}
        <motion.div
          animate={{
            left: ["-100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent skew-x-12"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h2 className="font-serif text-2xl text-white font-bold tracking-tight">
          Duarte <span className="text-gold-light">Advocatus</span>
        </h2>
        <div className="mt-2 h-0.5 w-12 bg-gold mx-auto rounded-full overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-full w-full bg-white/50"
          />
        </div>
      </motion.div>
    </div>
  );
}
