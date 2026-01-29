// src/app/(dashboard)/Pacientes/[id]/historia/components/KPIProgress.tsx
"use client";

import { TrendingDown, TrendingUp, Minus, Activity } from "lucide-react";

export default function KPIProgress({ appointments }: { appointments: any[] }) {
  if (!appointments || appointments.length === 0) return null;

  // 🔄 Obtenemos la primera y la última consulta con datos médicos
  const actual = appointments[0]?.medicion;
  const inicial = appointments[appointments.length - 1]?.medicion;

  if (!actual || !inicial) return (
    <div className="bg-orange-50 p-6 rounded-4xl border border-orange-100 text-orange-700 font-bold text-center">
      Aún no hay mediciones registradas para calcular el progreso.
    </div>
  );

  const difPeso = (actual.peso - inicial.peso).toFixed(1);
  const difIMC = (actual.imc - inicial.imc).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* ⚖️ TARJETA DE PESO */}
      <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Peso Total</p>
        <div className="flex items-end justify-between mt-2">
          <h3 className="text-3xl font-bold text-gray-900">{actual.peso} <span className="text-sm font-medium">kg</span></h3>
          <div className={`flex items-center gap-1 text-sm font-black ${Number(difPeso) < 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Number(difPeso) < 0 ? <TrendingDown size={18} /> : <TrendingUp size={18} />}
            {difPeso} kg
          </div>
        </div>
      </div>

      {/* 📉 TARJETA DE IMC */}
      <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">IMC Actual</p>
        <div className="flex items-end justify-between mt-2">
          <h3 className="text-3xl font-bold text-gray-900">{actual.imc}</h3>
          <div className="bg-nutri-main/10 text-nutri-main px-3 py-1 rounded-full text-xs font-black">
            {actual.imc < 25 ? 'Normal' : 'Sobrepeso'}
          </div>
        </div>
      </div>

      {/* ⚡ GRASA Y MÚSCULO (Si existen datos) */}
      <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">% Grasa Corporl</p>
        <div className="flex items-center gap-3 mt-2">
           <Activity className="text-orange-500" size={24} />
           <span className="text-2xl font-bold text-gray-900">{actual.grasa || '--'} %</span>
        </div>
      </div>
    </div>
  );
}