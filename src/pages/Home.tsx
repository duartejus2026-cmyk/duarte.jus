import React, { useState, useEffect, Suspense, lazy } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import { motion } from "framer-motion";

// Lazy loading components
const Specialties = lazy(() => import("../components/sections/Specialties"));
const Calculators = lazy(() => import("../components/sections/Calculators"));
const TriageIA = lazy(() => import("../components/sections/TriageIA"));
const WhyChooseUs = lazy(() => import("../components/sections/WhyChooseUs"));
const Contact = lazy(() => import("../components/sections/Contact"));
const About = lazy(() => import("../components/sections/About"));
const Blog = lazy(() => import("../components/sections/Blog"));
const FAQ = lazy(() => import("../components/sections/FAQ"));
const Team = lazy(() => import("../components/sections/Team"));

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleOpenBooking = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreAreas = () => {
    const specialtiesSection = document.getElementById("specialties-section");
    if (specialtiesSection) {
      specialtiesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-surface-bright flex flex-col font-sans selection:bg-gold-light selection:text-primary">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenBooking={handleOpenBooking} 
      />
      
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero 
            onOpenBooking={handleOpenBooking} 
            onExploreAreas={handleExploreAreas} 
          />
          
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-gold">Carregando seções...</div>}>
            <Specialties 
              onOpenBooking={handleOpenBooking} 
            />

            <About />

            <Team />

            <TriageIA />
            
            <Calculators />
            
            <Blog />

            <FAQ />
            
            <WhyChooseUs />
            
            <Contact />
          </Suspense>
        </motion.div>
      </main>

      <Footer />
      <WhatsAppButton phoneNumber="5561999999999" />
    </div>
  );
}
