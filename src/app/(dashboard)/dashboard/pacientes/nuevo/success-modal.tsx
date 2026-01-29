"use client";

import { CheckCircle2, Calendar, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessModal({ isOpen }: { isOpen: boolean }) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass-card max-w-md w-full p-10 rounded-4xl text-center shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-nutri-main/10 text-nutri-main rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Paciente Creado!</h2>
        <p className="text-gray-500 font-medium mb-10">El expediente se ha generado correctamente.</p>
        <div className="flex flex-col gap-4">
          <button onClick={() => router.push("/dashboard/consultas/nueva")} className="w-full bg-nutri-main text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all">
            <Calendar size={20} /> Agendar Primera Cita
          </button>
          <button onClick={() => router.push("/dashboard")} className="w-full bg-gray-50 text-gray-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 border border-gray-100">
            Cerrar y ver Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}