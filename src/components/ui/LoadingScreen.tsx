import React from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-sm w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 rounded-xl bg-white/5 border border-gold/30 flex items-center justify-center text-gold shadow-lg backdrop-blur-sm">
            <img src="/logo.png" alt="Duarte Advogados Logo" className="w-10 h-10 object-contain opacity-90" />
          </div>
          
          {/* Shine effect */}
          <motion.div
            animate={{
              left: ["-100%", "200%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent skew-x-12"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-tight">
            Duarte <span className="text-gold-light">Advogados</span>
          </h2>
          <div className="mt-3 h-0.5 w-16 bg-gold/20 mx-auto rounded-full overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-full w-full bg-gold"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
