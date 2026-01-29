"use client";

import { X, CheckCircle2, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface WelcomeModalProps {
  userName: string;
}

export default function WelcomeModal({ userName }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verificamos si ya se mostró en esta sesión para no ser intrusivos
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenWelcome", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white rounded-4xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-300">
        
        {/* Botón de cierre rápido */}
        <button 
          onClick={closeModal}
          className="absolute top-6 right-6 text-gray-400 hover:text-nutri-main transition-colors"
        >
          <X size={24} />
        </button>

        {/* Contenido del Alert / Modal */}
        <div className="p-10 md:p-14 text-center">
          <div className="w-20 h-20 bg-nutri-light rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-nutri-main" />
          </div>

          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a <span className="text-nutri-main">Nutri-AS</span>, {userName}!
          </h3>
          
          <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
            Estamos listos para ayudarte a optimizar tu consulta con tecnología de **Un Desarrollo Mas**. Tu plataforma de gestión ya está activa.
          </p>

          <button 
            onClick={closeModal}
            className="btn-primary w-full flex items-center justify-center gap-2 py-5 text-xl"
          >
            Comenzar ahora <ChevronRight size={20} />
          </button>
        </div>

        {/* Detalle decorativo inferior */}
        <div className="h-2 w-full bg-gradient-to-r from-nutri-main to-nutri-orange"></div>
      </div>
    </div>
  );
}