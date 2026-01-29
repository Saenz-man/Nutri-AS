"use client";

import { ArrowLeft, Calendar, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react"; // ✅ Importación necesaria

// 📝 Actualizamos la interfaz para incluir fecha y setFecha
interface MedicionesHeaderProps {
  id: string;
  onSave: () => Promise<void>;
  isSaving: boolean;
  fecha: string;               // ✅ Agregado
  setFecha: (fecha: string) => void; // ✅ Agregado (o Dispatch<SetStateAction<string>>)
  hasChanges?: boolean;
}

export default function MedicionesHeader({ 
  id, 
  onSave, 
  isSaving, 
  fecha, 
  setFecha, 
  hasChanges 
}: MedicionesHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (hasChanges) {
      const confirm = window.confirm("Tienes cambios sin guardar. ¿Deseas salir?");
      if (!confirm) return;
    }
    router.push(`/dashboard/pacientes/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={handleBack} className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:text-nutri-main transition-all">
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Módulo Clínico</p>
          <h1 className="text-xl font-bold text-gray-900">Nueva Medición</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* 📅 Selector de Fecha Vinculado al Estado */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
          <Calendar size={16} className="text-gray-400" />
          <input 
            type="date" 
            value={fecha} // ✅ Ahora usa el valor que viene de page.tsx
            onChange={(e) => setFecha(e.target.value)} // ✅ Actualiza el estado global
            className="bg-transparent text-sm font-bold text-gray-700 outline-none"
          />
        </div>

        <button 
          onClick={onSave} 
          disabled={isSaving}
          className="bg-nutri-main text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          <span>{isSaving ? "Guardando..." : "Guardar Medición"}</span>
        </button>
      </div>
    </div>
  );
}