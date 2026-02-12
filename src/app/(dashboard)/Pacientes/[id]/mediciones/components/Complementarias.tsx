// src/app/(dashboard)/Pacientes/[id]/mediciones/components/Complementarias.tsx
"use client";

import { Ruler, Activity, MoveHorizontal, CircleDot } from "lucide-react";

export default function Complementarias({ formData, handleChange, resultados }: any) {
  
  // Helper de campo con ancho controlado y alineación vertical
  const RenderField = ({ name, label, icon: Icon }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-widest h-3">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-nutri-main transition-colors">
          <Icon size={16} />
        </div>
        <input 
          name={name} 
          value={formData[name]} 
          onChange={handleChange} 
          placeholder="0.00"
          className="nutri-input pl-11 pr-12 text-sm font-bold w-full h-12 shadow-sm border-gray-100 hover:border-gray-200 transition-all" 
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300 uppercase">
          cm
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10">
      
      {/* SECCIÓN: ENCABEZADO */}
      <div className="flex items-center justify-between border-b border-gray-50 pb-6">
        <h2 className="font-black text-gray-800 flex items-center gap-3 uppercase text-xs tracking-[0.2em] font-display">
          <span className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" /> 
          Circunferencias y Diámetros
        </h2>
        
        {resultados.icc > 0 && (
          <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border ${
            resultados.icc > 0.85 ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-500 border-green-100'
          }`}>
            Riesgo: {resultados.icc > 0.85 ? 'Aumentado' : 'Bajo'}
          </div>
        )}
      </div>

      {/* GRID PRINCIPAL: 3 COLUMNAS IGUALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        
        {/* COLUMNA 1: TRONCO */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-nutri-main/10">
            <div className="p-1.5 bg-nutri-main/10 rounded-lg text-nutri-main">
              <Ruler size={14} />
            </div>
            <p className="text-[11px] font-black text-nutri-main uppercase tracking-[0.15em]">Tronco</p>
          </div>
          
          <div className="space-y-5">
            <RenderField name="cintura" label="Cintura" icon={CircleDot} />
            <RenderField name="cadera" label="Cadera" icon={CircleDot} />
            
            {/* Tarjeta de ICC con altura controlada para no romper el grid */}
            <div className="mt-6 p-5 bg-gray-50/50 rounded-3xl border border-gray-100 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">ICC Automático</p>
                <p className="text-2xl font-black text-gray-700 leading-none">{resultados.icc || "0.00"}</p>
              </div>
              <div className="px-3 py-1 bg-white rounded-lg border border-gray-100 text-[10px] font-bold text-gray-400">
                Ratio
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 2: EXTREMIDADES */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-nutri-teal/10">
            <div className="p-1.5 bg-nutri-teal/10 rounded-lg text-nutri-teal">
              <Activity size={14} />
            </div>
            <p className="text-[11px] font-black text-nutri-teal uppercase tracking-[0.15em]">Extremidades</p>
          </div>
          
          <div className="space-y-5">
            <RenderField name="brazoR" label="Brazo Relajado" icon={MoveHorizontal} />
            <RenderField name="brazoC" label="Brazo Contraído" icon={MoveHorizontal} />
            <RenderField name="piernaCirc" label="Pierna (Media)" icon={MoveHorizontal} />
          </div>
        </div>

        {/* COLUMNA 3: DIÁMETROS */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-orange-100">
            <div className="p-1.5 bg-orange-50 rounded-lg text-orange-400">
              <Ruler size={14} />
            </div>
            <p className="text-[11px] font-black text-orange-400 uppercase tracking-[0.15em]">Diámetros</p>
          </div>
          
          <div className="space-y-5">
            <RenderField name="estiloideo" label="Muñeca (Estiloideo)" icon={MoveHorizontal} />
            <RenderField name="femur" label="Biep. Fémur" icon={MoveHorizontal} />
            <RenderField name="humero" label="Biep. Húmero" icon={MoveHorizontal} />
          </div>
        </div>

      </div>
    </div>
  );
}