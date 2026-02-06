"use client";

import { UserCircle, Ruler, Scale, Zap, Calendar, VenusAndMars, ChevronDown } from "lucide-react";

interface Props {
  paciente: any;
  edad: number;
  genero: string;
  peso: number;
  setPeso: (v: number) => void;
  talla: number;
  setTalla: (v: number) => void;
  actividad: number;
  setActividad: (v: number) => void;
  imc: number; // ✅ AGREGADO: Esencial para mostrar el número
}

const CATEGORIAS_ACTIVIDAD = [
  { label: "Sedentario", range: "1.0 - 1.39", value: 1.2 },
  { label: "Poco Activo", range: "1.4 - 1.59", value: 1.5 },
  { label: "Activo", range: "1.6 - 1.89", value: 1.75 },
  { label: "Muy Activo", range: "1.9 - 2.5", value: 2.2 },
];

export default function DatosPacienteCard({ 
  paciente, edad, genero, peso, setPeso, talla, setTalla, actividad, setActividad, imc
}: Props) {
  
  const getImcStyles = (val: number) => {
    if (val <= 0) return "bg-gray-50 text-gray-400 border-gray-100"; // Gris si no hay dato
    if (val < 18.5) return "bg-blue-50 text-blue-500 border-blue-100";
    if (val < 25) return "bg-green-50 text-green-500 border-green-100";
    if (val < 30) return "bg-orange-50 text-orange-500 border-orange-100";
    return "bg-red-50 text-red-500 border-red-100";
  };

  return (
    <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-8">
      <div className="flex items-start justify-between border-b border-gray-50 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-nutri-main/10 rounded-2xl text-nutri-main"><UserCircle size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Contexto Biológico</p>
            <h2 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter">{paciente.nombre} {paciente.apellido}</h2>
            <div className="flex gap-2 mt-1.5">
               <span className="text-[9px] font-black text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 flex items-center gap-1"><Calendar size={10} /> {edad} Años</span>
               <span className="text-[9px] font-black text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 flex items-center gap-1"><VenusAndMars size={10} /> {genero}</span>
            </div>
          </div>
        </div>
        
        {/* 📈 Badge de IMC con el número restaurado */}
        <div className={`px-4 py-2 rounded-2xl border-2 flex flex-col items-center shadow-sm transition-colors ${getImcStyles(imc)}`}>
          <span className="text-[8px] font-black uppercase tracking-tighter">IMC</span>
          <span className="text-lg font-black italic">{imc > 0 ? imc : "--"}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black text-gray-500 uppercase italic flex items-center gap-1 ml-2"><Scale size={12} /> Peso (kg)</label>
          <input type="number" step="0.1" value={peso} onChange={e => setPeso(Number(e.target.value))} className="nutri-input-calculadora" />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black text-gray-500 uppercase italic flex items-center gap-1 ml-2"><Ruler size={12} /> Talla (cm)</label>
          <input type="number" value={talla} onChange={e => setTalla(Number(e.target.value))} className="nutri-input-calculadora" />
        </div>
      </div>

      <div className="space-y-3 bg-gray-900 p-7 rounded-[35px] shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-nutri-main" />
            <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Actividad Física</p>
          </div>
          <input type="number" step="0.01" value={actividad} onChange={e => setActividad(Number(e.target.value))} className="w-16 bg-white/10 border border-white/10 rounded-xl text-center text-sm font-black text-nutri-main outline-none" />
        </div>
        <select 
          value={CATEGORIAS_ACTIVIDAD.find(c => actividad >= parseFloat(c.range.split(' ')[0]))?.value || actividad}
          onChange={e => setActividad(Number(e.target.value))}
          className="w-full bg-white/10 border-2 border-transparent focus:border-nutri-main/50 rounded-2xl px-6 py-4 text-xs font-black text-white uppercase appearance-none cursor-pointer"
        >
          {CATEGORIAS_ACTIVIDAD.map(cat => <option key={cat.label} value={cat.value} className="text-gray-800">{cat.label} ({cat.range})</option>)}
        </select>
      </div>
    </section>
  );
}