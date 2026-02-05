"use client";
import { Zap, Calculator, Activity } from "lucide-react";

export default function Bioimpedancia({ formData, handleChange, onCalcular }: any) {
  const tieneGrasa = parseFloat(formData.grasaEquipo) > 0;
  const tieneMusculo = parseFloat(formData.musculo) > 0;

  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-8 relative overflow-hidden">
      {/* 🟢 DECORACIÓN SUTIL DE FONDO */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Activity size={120} />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest italic">
          <span className="w-2 h-2 bg-orange-400 rounded-full" /> Composición Corporal
        </h2>
        <button 
          type="button" 
          onClick={onCalcular}
          className="bg-orange-500 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-orange-200"
        >
          <Calculator size={14} /> Calcular Resultados
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* 🔥 RESULTADO: % GRASA */}
        <div className={`p-6 rounded-[32px] transition-all border-2 ${tieneGrasa ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-transparent'}`}>
          <label className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2 block italic"> % Grasa Final</label>
          <div className="flex items-baseline gap-1">
            <input 
              name="grasaEquipo" 
              type="number" 
              value={formData.grasaEquipo} 
              onChange={handleChange} 
              className={`bg-transparent text-4xl font-black outline-none w-full ${tieneGrasa ? 'text-orange-600' : 'text-gray-300'}`} 
              placeholder="0.0" 
            />
            <span className={`text-xl font-black ${tieneGrasa ? 'text-orange-300' : 'text-gray-200'}`}>%</span>
          </div>
        </div>

        {/* 💪 RESULTADO: % MÚSCULO (TEJIDO MAGRO) */}
        <div className={`p-6 rounded-[32px] transition-all border-2 ${tieneMusculo ? 'bg-nutri-light border-nutri-main/20' : 'bg-gray-50 border-transparent'}`}>
          <label className="text-[10px] font-black text-nutri-main uppercase tracking-widest mb-2 block italic"> % Tejido Magro</label>
          <div className="flex items-baseline gap-1">
            <input 
              name="musculo" 
              type="number" 
              value={formData.musculo} 
              className={`bg-transparent text-4xl font-black outline-none w-full ${tieneMusculo ? 'text-nutri-main' : 'text-gray-300'}`} 
              readOnly 
              placeholder="0.0" 
            />
            <span className={`text-xl font-black ${tieneMusculo ? 'text-nutri-main/30' : 'text-gray-200'}`}>%</span>
          </div>
        </div>
      </div>

      {/* OTROS DATOS SECUNDARIOS */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-50">
        <div className="text-center">
          <p className="text-[9px] font-black text-gray-400 uppercase italic">Agua</p>
          <p className="text-lg font-black text-blue-500">{formData.agua || "0.0"}%</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-black text-gray-400 uppercase italic">Visecreal</p>
          <p className="text-lg font-black text-red-500">{formData.grasaVisceral || "0"}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-black text-gray-400 uppercase italic">Hueso</p>
          <p className="text-lg font-black text-gray-700">{formData.masaOsea || "0.0"}kg</p>
        </div>
      </div>
    </div>
  );
}