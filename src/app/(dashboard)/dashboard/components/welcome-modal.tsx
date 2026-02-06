// src/app/(dashboard)/dashboard/components/welcome-modal.tsx
"use client";

import { X, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface WelcomeModalProps {
  userName: string;
}

export default function WelcomeModal({ userName }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => setIsOpen(true), 500); // Pequeño delay para dejar que el dashboard cargue
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenWelcome", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-500">
      
      {/* Contenedor Principal con Bordes Suaves y Sombra Profunda */}
      <div className="w-full max-w-lg bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden relative animate-in zoom-in-95 duration-500">
        
        {/* Patrón de Fondo Decorativo (Sutil) */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-nutri-main/5 to-transparent pointer-events-none" />
        
        {/* Botón de Cierre con Estilo "Ghost" */}
        <button 
          onClick={closeModal}
          className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="p-10 md:p-14 text-center relative">
          
          {/* Icono de Éxito con Efecto de Pulso y Glow */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-nutri-main/20 rounded-full animate-ping duration-1000" />
            <div className="relative bg-white border-8 border-nutri-light rounded-full w-24 h-24 flex items-center justify-center shadow-sm">
              <CheckCircle2 size={48} className="text-nutri-main" />
            </div>
            <div className="absolute -top-2 -right-2 bg-nutri-orange text-white p-1.5 rounded-lg shadow-lg rotate-12">
              <Sparkles size={16} />
            </div>
          </div>

          {/* Texto de Bienvenida con Tipografía Dinámica */}
          <div className="space-y-3 mb-10">
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-[0.3em]">Acceso Exitoso</p>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
              ¡Bienvenido a <span className="bg-clip-text text-transparent bg-gradient-to-r from-nutri-main to-emerald-600">Nutri-AS</span>, {userName}!
            </h3>
            
            <p className="text-gray-500 text-base leading-relaxed font-medium max-w-xs mx-auto">
              Tu plataforma de gestión clínica avanzada, diseñada por <span className="text-gray-900 font-bold italic underline decoration-nutri-orange/30">Un Desarrollo Mas</span>, ya está lista.
            </p>
          </div>

          {/* Botón de Acción Principal con Elevación */}
          <button 
            onClick={closeModal}
            className="group w-full bg-gray-900 text-white rounded-2xl py-5 text-lg font-black uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-black hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Empezar Consulta
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Detalle de Marca Inferior Multi-color */}
        <div className="flex h-1.5 w-full">
          <div className="flex-1 bg-nutri-main" />
          <div className="flex-1 bg-emerald-500" />
          <div className="flex-1 bg-nutri-orange" />
        </div>
      </div>
    </div>
  );
}