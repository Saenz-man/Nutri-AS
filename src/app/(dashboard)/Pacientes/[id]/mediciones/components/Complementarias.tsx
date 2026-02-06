// src/app/(dashboard)/Pacientes/[id]/mediciones/components/Complementarias.tsx
"use client";

import { Ruler, Activity } from "lucide-react";

export default function Complementarias({ formData, handleChange, resultados }: any) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
          <span className="w-2 h-2 bg-blue-500 rounded-full" /> Circunferencias y Diámetros
        </h2>
        {/* Badge de Riesgo basado en ICC */}
        {resultados.icc > 0 && (
          <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${resultados.icc > 0.85 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
            Riesgo: {resultados.icc > 0.85 ? 'Aumentado' : 'Bajo'}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Grupo: Tronco */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Tronco (cm)</p>
          <div className="grid grid-cols-1 gap-3">
            <input name="cintura" placeholder="Cintura" value={formData.cintura} onChange={handleChange} className="nutri-input" />
            <input name="cadera" placeholder="Cadera" value={formData.cadera} onChange={handleChange} className="nutri-input" />
            <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-[9px] font-black text-gray-400 uppercase">ICC Automático</p>
              <p className="text-xl font-black text-gray-700">{resultados.icc || "0.00"}</p>
            </div>
          </div>
        </div>

        {/* Grupo: Extremidades */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Extremidades (cm)</p>
          <div className="grid grid-cols-1 gap-3">
            <input name="brazoR" placeholder="Brazo Relajado" value={formData.brazoR} onChange={handleChange} className="nutri-input" />
            <input name="brazoC" placeholder="Brazo Contraído" value={formData.brazoC} onChange={handleChange} className="nutri-input" />
            <input name="piernaCirc" placeholder="Pierna (Media)" value={formData.piernaCirc} onChange={handleChange} className="nutri-input" />
          </div>
        </div>

        {/* Grupo: Diámetros (Opcional) */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Diámetros (cm)</p>
          <div className="grid grid-cols-1 gap-3">
            <input name="estiloideo" placeholder="Estiloideo (Muñeca)" value={formData.estiloideo} onChange={handleChange} className="nutri-input" />
            <input name="femur" placeholder="Biepicondilar Fémur" value={formData.femur} onChange={handleChange} className="nutri-input" />
            <input name="humero" placeholder="Biepicondilar Húmero" value={formData.humero} onChange={handleChange} className="nutri-input" />
          </div>
        </div>
      </div>
    </div>
  );
}