"use client";

import { AlertCircle, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DuplicateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass-card max-w-md w-full p-8 rounded-4xl text-center shadow-2xl animate-in zoom-in-95">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Paciente ya registrado</h2>
        <p className="text-gray-500 text-sm mb-8">
          Parece que este número de expediente o correo electrónico ya pertenece a otro paciente en Nutri-AS.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => router.push("/dashboard/pacientes")}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all"
          >
            <Search size={18} /> Buscar en mis pacientes
          </button>
          <button 
            onClick={onClose}
            className="w-full py-3 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors"
          >
            Intentar con otros datos
          </button>
        </div>
      </div>
    </div>
  );
}