// src/app/(dashboard)/Pacientes/[id]/mediciones/components/Bioimpedancia.tsx
"use client";

import { Zap } from "lucide-react"; // ✅ Corregido
export default function Bioimpedancia({ formData, handleChange }: any) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 space-y-6 h-full">
      <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
        <span className="w-2 h-2 bg-orange-400 rounded-full" /> Datos de Bioimpedancia
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">% Grasa (Equipo)</label>
          <input name="grasaEquipo" type="number" value={formData.grasaEquipo} onChange={handleChange} className="nutri-input mt-1" placeholder="0.0" />
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">% Agua Corporal</label>
          <input name="agua" type="number" value={formData.agua} onChange={handleChange} className="nutri-input mt-1" placeholder="0.0" />
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Grasa Visceral</label>
          <input name="grasaVisceral" type="number" value={formData.grasaVisceral} onChange={handleChange} className="nutri-input mt-1" placeholder="1-20" />
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Edad Metabólica</label>
          <input name="edadMetabolica" type="number" value={formData.edadMetabolica} onChange={handleChange} className="nutri-input mt-1" placeholder="Años" />
        </div>
        <div className="col-span-2">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Masa Ósea (kg)</label>
          <input name="masaOsea" type="number" value={formData.masaOsea} onChange={handleChange} className="nutri-input mt-1" placeholder="0.0" />
        </div>
      </div>
    </div>
  );
}