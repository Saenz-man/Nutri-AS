"use client";

import { TrendingDown, TrendingUp, Minus, Activity, Weight, Info } from "lucide-react";

export default function KPIProgress({ appointments }: { appointments: any[] }) {
  // 🔍 Buscamos citas que tengan mediciones reales
  const citasConMediciones = appointments.filter(app => app.medicion);

  if (citasConMediciones.length === 0) {
    return (
      <div className="bg-orange-50 p-6 rounded-4xl border border-orange-100 flex items-center gap-4 text-orange-700">
        <Info size={24} />
        <p className="font-bold">Aún no hay registros de mediciones para calcular el progreso nutricional.</p>
      </div>
    );
  }

  // 🔄 Comparativa: La más reciente (pos 0) vs La inicial (última pos)
  const actual = citasConMediciones[0].medicion;
  const inicial = citasConMediciones[citasConMediciones.length - 1].medicion;

  const difPeso = (actual.peso - inicial.peso).toFixed(1);
  const subioPeso = Number(difPeso) > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
      
      {/* ⚖️ PESO: INICIAL VS ACTUAL */}
      <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Evolución de Peso</p>
          <div className={`p-2 rounded-xl ${subioPeso ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
            <Weight size={18} />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 leading-none">{actual.peso} <span className="text-sm font-medium">kg</span></h3>
            <p className="text-[10px] text-gray-400 mt-2 font-bold">Inicial: {inicial.peso} kg</p>
          </div>
          <div className={`flex items-center gap-1 text-sm font-black ${subioPeso ? 'text-red-500' : 'text-green-500'}`}>
            {subioPeso ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {subioPeso ? `+${difPeso}` : difPeso} kg
          </div>
        </div>
      </div>

      {/* 📉 IMC Y ESTADO */}
      <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Índice de Masa Corporal</p>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold text-gray-900">{actual.imc.toFixed(1)}</h3>
          <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
            actual.imc < 25 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
          }`}>
            {actual.imc < 18.5 ? 'Bajo Peso' : actual.imc < 25 ? 'Normal' : 'Sobrepeso'}
          </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-3 font-bold">Meta Sugerida: 22.0 - 24.9</p>
      </div>

      {/* 🧬 % GRASA CORPORAL */}
      <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">% Grasa</p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
            <Activity size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{actual.grasa ? `${actual.grasa}%` : '--'}</h3>
            <p className="text-[10px] text-gray-400 font-bold">Actualizado hoy</p>
          </div>
        </div>
      </div>

      {/* 💪 % MÚSCULO */}
      <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">% Músculo</p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
            <Activity size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{actual.musculo ? `${actual.musculo}%` : '--'}</h3>
            <p className="text-[10px] text-gray-400 font-bold">Tejido Magro</p>
          </div>
        </div>
      </div>
    </div>
  );
}