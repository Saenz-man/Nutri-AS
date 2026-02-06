"use client";

import { ArrowLeft, Calendar, Save, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  id: string;
  onSave: () => Promise<void>;
  isSaving: boolean;
  fecha: string; // Recibe la fecha del día actual
  hasChanges: boolean;
}

export default function LaboratorioHeader({ id, onSave, isSaving, fecha, hasChanges }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (hasChanges && !window.confirm("Hay cambios sin guardar. ¿Deseas salir?")) return;
    router.push(`/dashboard/pacientes/${id}`);
  };

  // 🗓️ Formateo profesional de la fecha (Ej: 06 de febrero de 2026)
  const fechaDisplay = new Date(fecha + "T00:00:00").toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-6">
        <button onClick={handleBack} className="p-4 rounded-2xl bg-gray-50 text-gray-400 hover:text-nutri-main transition-all">
          <ArrowLeft size={24} />
        </button>
        <div>
          <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Módulo de Diagnóstico</p>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tighter italic uppercase">Estudios de Laboratorio</h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        
        {/* 🔒 INDICADOR DE FECHA (SOLO LECTURA) */}
        <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 cursor-default group">
          <Calendar size={18} className="text-gray-400 group-hover:text-nutri-main transition-colors" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter flex items-center gap-1">
              Fecha de Registro <Lock size={8} className="opacity-50" />
            </span>
            <span className="text-xs font-black text-gray-800 italic uppercase">
              {fechaDisplay}
            </span>
          </div>
        </div>

        <button 
          onClick={onSave} 
          disabled={isSaving}
          className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-200 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          <span>{isSaving ? "Guardando..." : "Guardar Estudios"}</span>
        </button>
      </div>
    </div>
  );
}