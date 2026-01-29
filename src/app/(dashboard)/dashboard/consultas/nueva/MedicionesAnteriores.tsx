"use client";

import { Info, Scale } from "lucide-react";

export default function MedicionesAnteriores({ pesoAnterior, imcActual, onPesoChange, onTallaChange, talla }: any) {
  return (
    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-50">
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 italic">
      % Grasa Corporal (Bioimpedancia)
    </label>
    <div className="relative">
      <input 
        type="number" 
        step="0.1"
        className="nutri-input text-2xl font-black text-nutri-main pr-12"
        placeholder="0.0"
        onChange={(e) => setGrasa(parseFloat(e.target.value))} 
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-300">%</span>
    </div>
  </div>

  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 italic">
      % Músculo (Tejido Magro)
    </label>
    <div className="relative">
      <input 
        type="number" 
        step="0.1"
        className="nutri-input text-2xl font-black text-purple-500 pr-12"
        placeholder="0.0"
        onChange={(e) => setMusculo(parseFloat(e.target.value))} 
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-300">%</span>
    </div>
  </div>
</div>
  );
}