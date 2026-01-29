"use client";

import { useState } from "react";
import { useDietLogic } from "../hooks/useDietLogic";
import { GRUPOS_SMAE } from "../constants/smae";
import { guardarPlanAlimenticio } from "../actions/saveDietAction";
import { 
  ArrowLeft, Save, User, Settings2, Calculator, 
  Wand2, Activity, Loader2, CheckCircle2, X 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CalculadoraClient({ paciente }: { paciente: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [equivalentes, setEquivalentes] = useState<Record<string, number>>({});

  const { 
    peso, setPeso, talla, setTalla, edad, setEdad, 
    genero, setGenero, formula, setFormula, 
    actividad, setActividad, gett, metasGramos, macros, setMacros 
  } = useDietLogic(paciente);

  // 🪄 Algoritmo de Cálculo Automático
  const handleAutomatic = () => {
    const kcalMeta = gett;
    const propuesta = {
      verduras: 3,
      frutas: 3,
      cerealesSG: Math.max(1, Math.round((kcalMeta * 0.3) / 70)),
      cerealesCG: 1,
      leguminosas: 1,
      aoaMBAG: Math.max(1, Math.round((metasGramos.proG * 0.4) / 7)),
      aoaBAG: 2,
      aoaAAG: 0,
      lecheDescremada: 1,
      lecheEntera: 0,
      aceitesSP: Math.max(1, Math.round((metasGramos.lipG * 0.5) / 5)),
      aceitesCP: 1,
      azucaresSG: 1,
    };
    setEquivalentes(propuesta);
  };

  const handleSave = async () => {
    const appointmentId = paciente.appointments?.[0]?.id;
    if (!appointmentId) return; 

    setIsSaving(true);
    const payload = {
      metas: { kcal: gett, macros },
      distribucionSMAE: equivalentes,
      biometricos: { peso, talla, edad, formula, actividad }
    };

    const result = await guardarPlanAlimenticio(appointmentId, payload);
    setIsSaving(false);

    if (result.success) {
      setShowSuccessModal(true);
    } else {
      // Aquí se dispararía el Toast de error
      console.error("Error al guardar:", result.error);
    }
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
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Calculadora Dietética</p>
            <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter italic">Cálculo Personalizado</h1>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          {isSaving ? "Guardando..." : "Guardar Plan Alimenticio"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* 📋 COLUMNA IZQUIERDA: CONFIGURACIÓN BIOMÉTRICA */}
        <div className="space-y-6">
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
                <input type="number" value={peso} onChange={(e) => setPeso(Number(e.target.value))} className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-sm outline-none focus:border-nutri-main transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-2 text-nutri-main">Talla (cm)</label>
                <input type="number" value={talla} onChange={(e) => setTalla(Number(e.target.value))} className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-sm outline-none focus:border-nutri-main transition-all" />
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-gray-50">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Fórmula Basal</label>
                <select value={formula} onChange={(e) => setFormula(e.target.value)} className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-[10px] uppercase outline-none focus:border-nutri-main bg-white">
                  <option value="mifflin">Mifflin-St Jeor</option>
                  <option value="harris">Harris-Benedict</option>
                  <option value="valencia">Valencia</option>
                  <option value="schofield">Schofield</option>
                  <option value="oms">OMS / FAO</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Nivel Actividad</label>
                <select value={actividad} onChange={(e) => setActividad(Number(e.target.value))} className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-[10px] uppercase outline-none focus:border-nutri-main bg-white">
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

            {/* 🪄 BOTÓN AUTOMÁTICO DEBAJO DEL GET */}
            <button 
              onClick={handleAutomatic}
              className="w-full flex items-center justify-center gap-2 bg-gray-50 text-nutri-main p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest border-2 border-nutri-main/10 hover:bg-nutri-main/5 transition-all"
            >
              <Wand2 size={16} /> Cálculo Automático
            </button>
          </section>

          {/* CARD MACRONUTRIENTES (%) */}
          <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Activity size={14} /> Macronutrientes (%)</h2>
            <div className="space-y-3">
              {['hco', 'lip', 'pro'].map(m => (
                <div key={m} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-gray-500">{m}</span>
                  <span className="text-sm font-black text-gray-800">{(macros as any)[m]}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 🥗 COLUMNA DERECHA: SMAE Y ADECUACIÓN */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Equivalentes Sistema Mexicano (SMAE)</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="p-6 text-[9px] font-black text-gray-400 uppercase">Grupo de Alimento</th>
                    <th className="p-6 text-[9px] font-black text-gray-400 uppercase text-center">EQ</th>
                    <th className="p-6 text-[9px] font-black text-gray-400 uppercase text-center">Kcal</th>
                    <th className="p-4 text-[9px] font-black text-gray-400 uppercase text-center">P</th>
                    <th className="p-4 text-[9px] font-black text-gray-400 uppercase text-center">L</th>
                    <th className="p-4 text-[9px] font-black text-gray-400 uppercase text-center">H</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {Object.entries(GRUPOS_SMAE).map(([key, info]) => (
                    <tr key={key} className="hover:bg-gray-50/30 transition-all">
                      <td className="p-6 space-y-3">
                        <span className="font-bold text-gray-700 capitalize text-xs block">{key.replace(/([A-Z])/g, ' $1')}</span>
                        {/* 📊 BARRA DESLIZANTE (Slider 0-20) COMO EN LA IMAGEN */}
                        <input 
                          type="range" min="0" max="20" step="0.5"
                          value={equivalentes[key] || 0}
                          onChange={(e) => setEquivalentes(p => ({ ...p, [key]: Number(e.target.value) }))}
                          className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-400"
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
                      <td className="p-4 text-center font-bold text-gray-400 text-xs italic">{(info.pro * (equivalentes[key] || 0)).toFixed(1)}</td>
                      <td className="p-4 text-center font-bold text-gray-400 text-xs italic">{(info.lip * (equivalentes[key] || 0)).toFixed(1)}</td>
                      <td className="p-4 text-center font-bold text-gray-400 text-xs italic">{(info.hco * (equivalentes[key] || 0)).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* COMPARACIÓN Y SEMÁFORO */}
          <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Calculator size={14} /> Validación de Plan
            </h2>
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
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black">{status.porc}</span>
                      <span className="text-[10px] font-black">%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* ✅ MODAL DE ÉXITO */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300 border border-gray-100">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-gray-800 tracking-tighter uppercase">¡Plan Guardado!</h3>
              <p className="text-xs font-bold text-gray-400 italic">Sincronizado con Nutri-AS correctamente.</p>
            </div>
            <button 
              onClick={() => router.push(`/dashboard/Pacientes/${paciente.id}/historia`)}
              className="w-full bg-gray-900 text-white p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition-all"
            >
              Ir al Historial
            </button>
            <button onClick={() => setShowSuccessModal(false)} className="text-[10px] font-black text-gray-300 uppercase block mx-auto">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}