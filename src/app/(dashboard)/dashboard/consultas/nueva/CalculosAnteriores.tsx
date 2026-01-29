"use client";

import { Calculator } from "lucide-react";

export default function CalculosAnteriores() {
  return (
    <div className="space-y-10 animate-in slide-in-from-right-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fórmula Seleccionada</label>
          <select className="nutri-input font-bold text-gray-700">
            <option>Mifflin-St Jeor</option>
            <option>Harris-Benedict</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Actividad Física</label>
          <select className="nutri-input font-bold text-gray-700">
            <option>Sedentario (1.2)</option>
            <option>Moderado (1.55)</option>
          </select>
        </div>
      </div>
      <div className="bg-nutri-main/5 p-10 rounded-4xl border-2 border-dashed border-nutri-main/20 text-center">
        <p className="text-nutri-main font-bold uppercase tracking-widest text-xs mb-2">Requerimiento Total</p>
        <h3 className="text-6xl font-bold text-nutri-main italic">1,850 <span className="text-2xl not-italic">Kcal</span></h3>
      </div>
    </div>
  );
}