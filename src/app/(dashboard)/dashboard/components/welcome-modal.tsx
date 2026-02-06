// src/app/(dashboard)/dashboard/components/welcome-modal.tsx
"use client";

import { X, CheckCircle2, ChevronRight, Sparkles, PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";

interface WelcomeModalProps {
  userName: string;
}

export default function WelcomeModal({ userName }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenWelcome", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-xl animate-in fade-in duration-700">
      <div className="w-full max-w-lg bg-white rounded-[45px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] overflow-hidden relative animate-in zoom-in-95 duration-500 border border-gray-100">
        
        {/* Decoración superior */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-nutri-main/10 via-nutri-main/5 to-transparent pointer-events-none" />
        
        <button onClick={closeModal} className="absolute top-8 right-8 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all z-10">
          <X size={20} />
        </button>

        <div className="p-12 md:p-16 text-center relative">
          {/* Icono animado */}
          <div className="relative w-28 h-28 mx-auto mb-10">
            <div className="absolute inset-0 bg-nutri-main/20 rounded-full animate-ping" />
            <div className="relative bg-white border-[10px] border-nutri-light rounded-full w-28 h-28 flex items-center justify-center shadow-md">
              <CheckCircle2 size={56} className="text-nutri-main" />
            </div>
            <div className="absolute -top-3 -right-3 bg-nutri-orange text-white p-2 rounded-xl shadow-xl rotate-12 animate-bounce">
              <PartyPopper size={20} />
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-[0.4em] mb-2">Conexión Segura</p>
            <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-[1.1]">
              ¡Hola de nuevo, <span className="bg-clip-text text-transparent bg-gradient-to-r from-nutri-main to-emerald-600">{userName.split(' ')[0]}</span>!
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              Tu clínica <span className="text-gray-900 font-bold">Nutri-AS</span> está lista. Optimizamos tu entorno con la última tecnología de **Un Desarrollo Mas**.
            </p>
          </div>

          <button onClick={closeModal} className="group w-full bg-gray-900 text-white rounded-3xl py-6 text-xl font-black uppercase tracking-widest shadow-2xl shadow-gray-300 hover:bg-black hover:-translate-y-1 transition-all flex items-center justify-center gap-4">
            Comenzar Gestión <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="flex h-2 w-full">
          <div className="flex-1 bg-nutri-main" />
          <div className="flex-1 bg-emerald-500" />
          <div className="flex-1 bg-nutri-orange" />
        </div>
      </div>
    </div>
  );
}