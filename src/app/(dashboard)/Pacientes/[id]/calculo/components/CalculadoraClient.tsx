"use client";

import { useState } from "react";
import { useDietLogic } from "../hooks/useDietLogic";
import { GRUPOS_SMAE } from "../constants/smae";
import { 
  ArrowLeft, Save, User, Settings2, Calculator, 
  ChevronRight, Activity, PieChart 
} from "lucide-react";
import Link from "next/link";

export default function CalculadoraClient({ paciente }: { paciente: any }) {
  // 🧠 Hook de Lógica con las 5 fórmulas y datos de la DB
  const { 
    peso, setPeso, talla, setTalla, edad, setEdad, 
    genero, setGenero, formula, setFormula, 
    actividad, setActividad, gett, metasGramos, macros, setMacros 
  } = useDietLogic(paciente);
  
  const [equivalentes, setEquivalentes] = useState<Record<string, number>>({});

  // 🧮 Cálculo de Totales Acumulados (Corregido Error 7053)
  const totales = Object.keys(equivalentes).reduce((acc, key) => {
    const cant = equivalentes[key] || 0;
    // Forzamos el tipo de la llave para que TS reconozca los grupos del SMAE
    const info = GRUPOS_SMAE[key as keyof typeof GRUPOS_SMAE];
    
    if (!info) return acc;

    return {
      kcal: acc.kcal + (info.kcal * cant),
      pro: acc.pro + (info.pro * cant),
      lip: acc.lip + (info.lip * cant),
      hco: acc.hco + (info.hco * cant),
    };
  }, { kcal: 0, pro: 0, lip: 0, hco: 0 });

  // ✅ Semáforo de Adecuación (95% - 105%)
  const getAdecuacion = (actual: number, meta: number) => {
    const porc = meta > 0 ? (actual / meta) * 100 : 0;
    const isOk = porc >= 95 && porc <= 105;
    return { 
      porc: porc.toFixed(1), 
      color: isOk ? "text-green-500 bg-green-50 border-green-100" : "text-red-500 bg-red-50 border-red-100" 
    };
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 p-6 animate-in fade-in duration-700">
      
      {/* 🔝 HEADER: NAVEGACIÓN Y GUARDADO */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-4xl border border-gray-100 shadow-sm gap-4">
        <div className="flex items-center gap-6">
          <Link 
            href={`/dashboard/Pacientes/${paciente.id}`} 
            className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Calculadora Dietética</p>
            <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter italic">Cálculo Personalizado</h1>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition-all active:scale-95">
          <Save size={16} /> Guardar Plan Alimenticio
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* 📋 COLUMNA IZQUIERDA: CONFIGURACIÓN BIOMÉTRICA */}
        <div className="space-y-6">
          
          {/* CARD: DATOS DEL PACIENTE */}
          <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <User size={14} /> Datos del Cliente
            </h2>
            
            <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Paciente</p>
                <p className="text-xs font-black text-gray-800">{paciente.nombre} {paciente.apellido}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase">Sexo / Edad</p>
                <p className="text-xs font-bold text-gray-600 capitalize">{genero} | {edad} años</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-2 text-nutri-main">Peso (kg)</label>
                <input 
                  type="number" 
                  value={peso} 
                  onChange={(e) => setPeso(Number(e.target.value))} 
                  className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-sm outline-none focus:border-nutri-main transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-2 text-nutri-main">Talla (cm)</label>
                <input 
                  type="number" 
                  value={talla} 
                  onChange={(e) => setTalla(Number(e.target.value))} 
                  className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-sm outline-none focus:border-nutri-main transition-all"
                />
              </div>
            </div>
          </section>

          {/* CARD: FÓRMULAS Y ACTIVIDAD */}
          <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Settings2 size={14} /> Configuración Basal
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-2 italic">Algoritmo</label>
                <select 
                  value={formula} 
                  onChange={(e) => setFormula(e.target.value)}
                  className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-[10px] uppercase outline-none focus:border-nutri-main bg-white cursor-pointer"
                >
                  <option value="mifflin">Mifflin-St Jeor</option>
                  <option value="harris">Harris-Benedict</option>
                  <option value="valencia">Valencia</option>
                  <option value="schofield">Schofield</option>
                  <option value="oms">OMS / FAO</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-2 italic">Factor de Actividad</label>
                <select 
                  value={actividad} 
                  onChange={(e) => setActividad(Number(e.target.value))}
                  className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-[10px] uppercase outline-none focus:border-nutri-main bg-white cursor-pointer"
                >
                  <option value={1.2}>Sedentario (1.2)</option>
                  <option value={1.375}>Ligero (1.375)</option>
                  <option value={1.55}>Moderado (1.55)</option>
                  <option value={1.725}>Intenso (1.725)</option>
                  <option value={1.9}>Muy Intenso (1.9)</option>
                </select>
              </div>
            </div>

            <div className="bg-nutri-main p-6 rounded-3xl text-center shadow-lg shadow-green-100">
              <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Gasto Energético Total (GET)</p>
              <p className="text-4xl font-black text-white tracking-tighter italic">{gett.toFixed(0)} <span className="text-xs">KCAL</span></p>
            </div>
          </section>
        </div>

        {/* 🥗 COLUMNA DERECHA: SMAE Y ADECUACIÓN */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* TABLA DE EQUIVALENTES SMAE */}
          <section className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Equivalentes Sistema Mexicano (SMAE)</h3>
              <button className="text-[10px] font-black text-nutri-main uppercase border-b-2 border-nutri-main/20">Cálculo Automático</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="p-4 text-[9px] font-black text-gray-400 uppercase">Grupo de Alimento</th>
                    <th className="p-4 text-[9px] font-black text-gray-400 uppercase text-center">EQ</th>
                    <th className="p-4 text-[9px] font-black text-gray-400 uppercase text-center">Kcal</th>
                    <th className="p-4 text-[9px] font-black text-gray-400 uppercase text-center">P</th>
                    <th className="p-4 text-[9px] font-black text-gray-400 uppercase text-center">L</th>
                    <th className="p-4 text-[9px] font-black text-gray-400 uppercase text-center">H</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {Object.entries(GRUPOS_SMAE).map(([key, info]) => (
                    <tr key={key} className="hover:bg-gray-50/50 transition-all">
                      <td className="p-4 font-bold text-gray-700 capitalize text-xs tracking-tight">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </td>
                      <td className="p-4 flex justify-center">
                        <input 
                          type="number" 
                          step="0.5" 
                          value={equivalentes[key] || ""} 
                          onChange={(e) => setEquivalentes(p => ({ ...p, [key]: Number(e.target.value) }))}
                          className="w-16 p-2 rounded-xl border-2 border-gray-100 font-black text-center outline-none focus:border-nutri-main transition-all"
                          placeholder="0"
                        />
                      </td>
                      <td className="p-4 text-center font-black text-gray-400 text-xs italic">
                        {(info.kcal * (equivalentes[key] || 0)).toFixed(0)}
                      </td>
                      <td className="p-4 text-center font-bold text-gray-400 text-xs">
                        {(info.pro * (equivalentes[key] || 0)).toFixed(1)}
                      </td>
                      <td className="p-4 text-center font-bold text-gray-400 text-xs">
                        {(info.lip * (equivalentes[key] || 0)).toFixed(1)}
                      </td>
                      <td className="p-4 text-center font-bold text-gray-400 text-xs">
                        {(info.hco * (equivalentes[key] || 0)).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 🚦 CUADRO DE COMPARACIÓN Y SEMÁFORO */}
          <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Calculator size={14} /> Validación de Adecuación (Suma vs Meta)
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Energía", actual: totales.kcal, meta: metasGramos.kcal, unit: "kcal" },
                { label: "Proteína", actual: totales.pro, meta: metasGramos.proG, unit: "g" },
                { label: "Lípidos", actual: totales.lip, meta: metasGramos.lipG, unit: "g" },
                { label: "Carbohidratos", actual: totales.hco, meta: metasGramos.hcoG, unit: "g" },
              ].map(res => {
                const status = getAdecuacion(res.actual, res.meta);
                return (
                  <div key={res.label} className={`p-5 rounded-3xl border-2 transition-all ${status.color}`}>
                    <p className="text-[9px] font-black uppercase opacity-60 mb-2">{res.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black">{status.porc}</span>
                      <span className="text-[10px] font-black">%</span>
                    </div>
                    <p className="text-[9px] font-bold opacity-30 italic mt-1 leading-tight">
                      {res.actual.toFixed(0)} de {res.meta.toFixed(0)} {res.unit}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}