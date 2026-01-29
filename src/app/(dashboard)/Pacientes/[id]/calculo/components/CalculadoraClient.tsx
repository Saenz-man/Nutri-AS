"use client";

import { useState } from "react";
import { useDietLogic } from "../hooks/useDietLogic";
import { GRUPOS_SMAE } from "../constants/smae";
import { 
  ArrowLeft, Save, User, Settings2, Calculator, 
  Wand2, Activity, Info 
} from "lucide-react";
import Link from "next/link";

export default function CalculadoraClient({ paciente }: { paciente: any }) {
  const { 
    peso, setPeso, talla, setTalla, edad, setEdad, 
    genero, setGenero, formula, setFormula, 
    actividad, setActividad, gett, metasGramos, macros 
  } = useDietLogic(paciente);
  
  const [equivalentes, setEquivalentes] = useState<Record<string, number>>({});

  // 🪄 Algoritmo de Cálculo Automático
  const handleAutomatic = () => {
    const kcalMeta = gett;
    const propuesta = {
      verduras: 3,
      frutas: 3,
      cerealesSG: Math.round((kcalMeta * 0.3) / 70),
      cerealesCG: 1,
      leguminosas: 1,
      aoaMBAG: Math.round((metasGramos.proG * 0.4) / 7),
      aoaBAG: 2,
      aoaAAG: 0,
      lecheDescremada: 1,
      lecheEntera: 0,
      aceitesSP: Math.round((metasGramos.lipG * 0.5) / 5),
      aceitesCP: 1,
      azucaresSG: 1,
    };
    setEquivalentes(propuesta);
  };

  const totales = Object.keys(equivalentes).reduce((acc, key) => {
    const cant = equivalentes[key] || 0;
    const info = GRUPOS_SMAE[key as keyof typeof GRUPOS_SMAE];
    if (!info) return acc;
    return {
      kcal: acc.kcal + (info.kcal * cant),
      pro: acc.pro + (info.pro * cant),
      lip: acc.lip + (info.lip * cant),
      hco: acc.hco + (info.hco * cant),
    };
  }, { kcal: 0, pro: 0, lip: 0, hco: 0 });

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
      
      {/* 🔝 HEADER */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-4xl border border-gray-100 shadow-sm gap-4">
        <div className="flex items-center gap-6">
          <Link href={`/dashboard/Pacientes/${paciente.id}`} className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Calculadora Nutri-AS</p>
            <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter italic">Cálculo de Equivalentes</h1>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition-all">
            <Save size={16} /> Guardar Dieta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* 📋 CONFIGURACIÓN (Lado Izquierdo) */}
        <div className="space-y-6">
          <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><User size={14} /> Datos de {paciente.nombre}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Peso (kg)</label>
                <input type="number" value={peso} onChange={(e) => setPeso(Number(e.target.value))} className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-sm outline-none focus:border-nutri-main transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Talla (cm)</label>
                <input type="number" value={talla} onChange={(e) => setTalla(Number(e.target.value))} className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-sm outline-none focus:border-nutri-main transition-all" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 p-6 rounded-3xl text-center">
                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Gasto Energético Total</p>
                <p className="text-4xl font-black text-white tracking-tighter">{gett.toFixed(0)} <span className="text-xs">KCAL</span></p>
              </div>

              {/* 🪄 BOTÓN AUTOMÁTICO DEBAJO DEL GASTO ENERGÉTICO */}
              <button 
                onClick={handleAutomatic}
                className="w-full flex items-center justify-center gap-2 bg-nutri-main text-white p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-green-600 transition-all border-b-4 border-green-700 active:border-b-0"
              >
                <Wand2 size={16} /> Cálculo Automático
              </button>
            </div>
          </section>

          <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Activity size={14} /> Macronutrientes (%)</h2>
            {['hco', 'lip', 'pro'].map(m => (
                <div key={m} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-gray-500">{m}</span>
                    <span className="text-sm font-black text-gray-800">{(macros as any)[m]}%</span>
                </div>
            ))}
          </section>
        </div>

        {/* 🥗 TABLA SMAE (Lado Derecho) */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">Equivalentes Sistema Mexicano (SMAE)</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="p-6 text-[9px] font-black text-gray-400 uppercase">Grupo de Alimento</th>
                    <th className="p-6 text-[9px] font-black text-gray-400 uppercase text-center">EQ</th>
                    <th className="p-6 text-[9px] font-black text-gray-400 uppercase text-center">Kcal</th>
                    <th className="p-6 text-[9px] font-black text-gray-400 uppercase text-center">P</th>
                    <th className="p-6 text-[9px] font-black text-gray-400 uppercase text-center">L</th>
                    <th className="p-6 text-[9px] font-black text-gray-400 uppercase text-center">H</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {Object.entries(GRUPOS_SMAE).map(([key, info]) => (
                    <tr key={key} className="hover:bg-gray-50/30 transition-all">
                      <td className="p-6 space-y-3">
                        <span className="font-bold text-gray-700 capitalize text-xs block">{key.replace(/([A-Z])/g, ' $1')}</span>
                        {/* 📊 BARRA DESLIZANTE EN COLUMNA GRUPO */}
                        <input 
                          type="range" min="0" max="20" step="0.5"
                          value={equivalentes[key] || 0}
                          onChange={(e) => setEquivalentes(p => ({ ...p, [key]: Number(e.target.value) }))}
                          className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-nutri-main"
                        />
                      </td>
                      <td className="p-6">
                        <input 
                          type="number" step="0.5" 
                          value={equivalentes[key] || ""} 
                          onChange={(e) => setEquivalentes(p => ({ ...p, [key]: Number(e.target.value) }))}
                          className="w-16 p-2 mx-auto block rounded-xl border-2 border-gray-100 font-black text-center text-xs outline-none focus:border-nutri-main transition-all"
                          placeholder="0"
                        />
                      </td>
                      <td className="p-6 text-center font-black text-gray-400 text-xs italic">{(info.kcal * (equivalentes[key] || 0)).toFixed(0)}</td>
                      <td className="p-6 text-center font-bold text-gray-400 text-xs italic">{(info.pro * (equivalentes[key] || 0)).toFixed(1)}</td>
                      <td className="p-6 text-center font-bold text-gray-400 text-xs italic">{(info.lip * (equivalentes[key] || 0)).toFixed(1)}</td>
                      <td className="p-6 text-center font-bold text-gray-400 text-xs italic">{(info.hco * (equivalentes[key] || 0)).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CUADRO DE COMPARACIÓN */}
          <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Energía", actual: totales.kcal, meta: metasGramos.kcal, unit: "kcal" },
                { label: "Proteína", actual: totales.pro, meta: metasGramos.proG, unit: "g" },
                { label: "Lípidos", actual: totales.lip, meta: metasGramos.lipG, unit: "g" },
                { label: "HCO", actual: totales.hco, meta: metasGramos.hcoG, unit: "g" },
              ].map(res => {
                const status = getAdecuacion(res.actual, res.meta);
                return (
                  <div key={res.label} className={`p-5 rounded-3xl border-2 transition-all ${status.color}`}>
                    <p className="text-[9px] font-black uppercase opacity-60 mb-2">{res.label}</p>
                    <p className="text-2xl font-black">{status.porc}%</p>
                    <p className="text-[9px] font-bold opacity-30 mt-1">{res.actual.toFixed(0)} / {res.meta.toFixed(0)} {res.unit}</p>
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