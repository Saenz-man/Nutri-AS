"use client";

import { ArrowLeft, FileDown, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HistoriaHeader({ paciente, onExport }: { paciente: any, onExport: () => void }) {
  const router = useRouter();

  // 🚀 Navegación directa sin mensajes de interrupción
  const handleBack = () => {
    router.push(`/dashboard/pacientes/${paciente.id}`);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-6">
        <button 
          onClick={handleBack}
          className="p-4 rounded-2xl bg-gray-50 text-gray-400 hover:text-nutri-main hover:bg-nutri-light transition-all flex items-center gap-2 font-bold text-sm"
        >
          <ArrowLeft size={20} /> <span className="hidden md:block">Volver al Expediente</span>
        </button>

        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
            {paciente.foto ? (
              <Image src={paciente.foto} alt={paciente.nombre} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300"><UserCircle size={32} /></div>
            )}
          </div>
          <div>
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest mb-0.5">Historial Clínico</p>
            <h1 className="text-2xl font-bold text-gray-900 font-display leading-tight">
              {paciente.nombre} {paciente.apellido}
            </h1>
            <p className="text-xs text-gray-400 font-bold">Folio: {paciente.expediente}</p>
          </div>
        </div>
      </div>

      {/* 📄 Acción Global: Exportar PDF */}
      <button 
        onClick={onExport}
        className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2 text-sm"
      >
        <FileDown size={18} /> Exportar Reporte Completo (PDF)
      </button>
    </div>
  );
}