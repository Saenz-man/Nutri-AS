"use client";

import { ArrowLeft, Calendar, FileUp, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  id: string;
  onSave: () => Promise<void>;
  isSaving: boolean;
  fecha: string;
  setFecha: (f: string) => void;
  hasChanges: boolean;
}

export default function LaboratorioHeader({ id, onSave, isSaving, fecha, setFecha, hasChanges }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (hasChanges && !window.confirm("Hay cambios sin guardar. ¿Deseas salir?")) return;
    router.push(`/dashboard/pacientes/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-6">
        <button onClick={handleBack} className="p-4 rounded-2xl bg-gray-50 text-gray-400 hover:text-nutri-main transition-all">
          <ArrowLeft size={24} />
        </button>
        <div>
          <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Módulo de Diagnóstico</p>
          <h1 className="text-2xl font-bold text-gray-900">Estudios de Laboratorio</h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Fecha de la Toma */}
        <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
          <Calendar size={18} className="text-gray-400" />
          <input 
            type="date" 
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="bg-transparent text-sm font-bold text-gray-700 outline-none" 
            required
          />
        </div>

        {/* Adjuntar PDF */}
        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-dashed border-gray-300 text-gray-500 hover:border-nutri-main hover:text-nutri-main transition-all text-sm font-bold">
          <FileUp size={18} /> Adjuntar PDF
        </button>

        <button 
          onClick={onSave} 
          disabled={isSaving}
          className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-xl disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          <span>Guardar Estudios</span>
        </button>
      </div>
    </div>
  );
}