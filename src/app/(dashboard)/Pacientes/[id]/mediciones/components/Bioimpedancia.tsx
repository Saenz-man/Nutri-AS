// src/app/(dashboard)/pacientes/[id]/mediciones/components/Bioimpedancia.tsx
"use client";
import { Zap, Calculator } from "lucide-react";

export default function Bioimpedancia({ formData, handleChange, onCalcular }: any) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 space-y-6 h-full shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest italic">
          <span className="w-2 h-2 bg-orange-400 rounded-full" /> Datos de Bioimpedancia
        </h2>
        <button 
          type="button" 
          onClick={onCalcular}
          className="bg-orange-50 text-orange-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2"
        >
          <Calculator size={14} /> Calcular Resultados
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">% Grasa (Fórmula)</label>
          <input name="grasaEquipo" type="number" value={formData.grasaEquipo} onChange={handleChange} className="nutri-input text-orange-500 font-bold" placeholder="0.0" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">% Agua Corporal</label>
          <input name="agua" type="number" value={formData.agua} onChange={handleChange} className="nutri-input" placeholder="0.0" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Grasa Visceral</label>
          <input name="grasaVisceral" type="number" value={formData.grasaVisceral} onChange={handleChange} className="nutri-input" placeholder="1-20" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Edad Metabólica</label>
          <input name="edadMetabolica" type="number" value={formData.edadMetabolica} onChange={handleChange} className="nutri-input" placeholder="Años" />
        </div>
        <div className="col-span-2 space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Masa Ósea (kg)</label>
          <input name="masaOsea" type="number" value={formData.masaOsea} onChange={handleChange} className="nutri-input" placeholder="0.0" />
        </div>
      </div>
    </div>
  );
}