// components/PerfilLipidico.tsx
"use client";

import { Activity } from "lucide-react";

export default function PerfilLipidico({ values, onChange, calculos, getStatusColor }: any) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 space-y-6">
      <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
        <span className="w-2 h-2 bg-red-500 rounded-full" /> Perfil Lipídico (Salud Cardiovascular)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Colesterol Total (mg/dL)</label>
          <input 
            name="colesterolTotal"
            value={values.colesterolTotal}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className={`nutri-input mt-1 ${getStatusColor('colesterolTotal', values.colesterolTotal)}`} 
          />
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">HDL - "Bueno" (mg/dL)</label>
          <input 
            name="hdl"
            value={values.hdl}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className={`nutri-input mt-1 ${getStatusColor('hdl', values.hdl)}`} 
          />
        </div>
      </div>

      {/* Cálculo Automático: Índice Aterogénico */}
      <div className="p-6 bg-gray-900 rounded-3xl flex justify-between items-center text-white">
        <div>
          <p className="text-[10px] font-black opacity-60 uppercase tracking-tighter">Índice Aterogénico (CT/HDL)</p>
          <p className="text-3xl font-black">{calculos.indice || "0.00"}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black opacity-60 uppercase">Riesgo Coronario</p>
          <p className={`font-bold ${calculos.indice > 5 ? 'text-red-400' : 'text-green-400'}`}>
            {calculos.indice === 0 ? "Pendiente" : calculos.indice > 5 ? "Elevado" : "Bajo"}
          </p>
        </div>
      </div>
    </div>
  );
}