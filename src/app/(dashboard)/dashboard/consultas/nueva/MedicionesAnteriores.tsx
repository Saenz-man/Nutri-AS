"use client";

import { Info, Scale } from "lucide-react";

export default function MedicionesAnteriores({ pesoAnterior, imcActual, onPesoChange, onTallaChange, talla }: any) {
  return (
    <div className="space-y-10 animate-in slide-in-from-right-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Peso Actual (kg)</label>
          <input type="number" step="0.1" className="nutri-input text-3xl font-bold text-nutri-main" placeholder="0.0" onChange={(e) => onPesoChange(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Estatura (cm)</label>
          <input type="number" value={talla} className="nutri-input text-3xl font-bold" onChange={(e) => onTallaChange(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">IMC</label>
          <div className={`nutri-input text-3xl font-bold flex items-center ${imcActual > 25 ? 'text-nutri-orange' : 'text-nutri-main'}`}>{imcActual}</div>
        </div>
      </div>
      <div className="pt-10 border-t border-gray-100">
        <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Scale size={18} className="text-nutri-main" /> Circunferencias (cm)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Cintura", "Cadera", "Brazo", "Pierna"].map((p) => (
            <div key={p} className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">{p}</label>
              <input type="number" className="nutri-input text-sm" placeholder="0.0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}