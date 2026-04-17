"use client";

import { Utensils, Droplets, AlertTriangle, Coffee, Info } from "lucide-react";

export default function StepHabits({ register, watch, errors }: any) {
  const watchAlergias = watch("alergiasAlimentarias");
  const watchSuplementos = watch("suplementos");
  const watchSaltaComidas = watch("seSaltaComidas");

  const gruposAlimentarios = [
    "Verduras", "Frutas", "Cereales y tubérculos", "Leguminosas", 
    "Origen animal", "Lácteos", "Grasas", "Embutidos", 
    "Repostería", "Botanas", "Refrescos", "Comida rápida", "Agua natural"
  ];

  const opcionesFrecuencia = ["Diario", "3–5x semana", "1–2x semana", "Ocasional", "Nunca"];

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4">
      {/* SECCIÓN 1: GUSTOS Y ALERGIAS */}
      <div className="glass-card p-8 md:p-12 rounded-4xl space-y-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Utensils className="text-nutri-main" size={24} /> Hábitos Alimentarios
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Gustos</label>
            <textarea {...register("gustosAlimentarios")} className="nutri-input min-h-[100px]" placeholder="¿Qué le encanta comer?" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Disgustos</label>
            <textarea {...register("disgustosAlimentarios")} className="nutri-input min-h-[100px]" placeholder="¿Qué evita comer?" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-50">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Alergias Alimentarias</label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer"><input type="radio" value="true" {...register("alergiasAlimentarias")} className="hidden peer"/><div className="p-3 border rounded-xl text-center font-bold peer-checked:bg-nutri-main peer-checked:text-white">Sí</div></label>
              <label className="flex-1 cursor-pointer"><input type="radio" value="false" {...register("alergiasAlimentarias")} className="hidden peer"/><div className="p-3 border rounded-xl text-center font-bold peer-checked:bg-nutri-main peer-checked:text-white">No</div></label>
            </div>
            {watchAlergias === "true" && <input {...register("alergiasDetalle")} placeholder="¿Cuáles?" className="nutri-input animate-in fade-in" />}
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Suplementos</label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer"><input type="radio" value="true" {...register("suplementos")} className="hidden peer"/><div className="p-3 border rounded-xl text-center font-bold peer-checked:bg-nutri-main peer-checked:text-white">Sí</div></label>
              <label className="flex-1 cursor-pointer"><input type="radio" value="false" {...register("suplementos")} className="hidden peer"/><div className="p-3 border rounded-xl text-center font-bold peer-checked:bg-nutri-main peer-checked:text-white">No</div></label>
            </div>
            {watchSuplementos === "true" && <input {...register("suplementosDetalle")} placeholder="Nombre / Dosis" className="nutri-input animate-in fade-in" />}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Intolerancias/Malestares</label>
            <textarea {...register("intolerancias")} className="nutri-input" rows={3} placeholder="Ej. Inflamación con lácteos" />
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: FRECUENCIA DE CONSUMO */}
      <div className="glass-card p-8 md:p-12 rounded-4xl space-y-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Droplets className="text-blue-500" size={24} /> Frecuencia de Consumo
        </h3>
        <div className="overflow-x-auto rounded-3xl border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase">
              <tr>
                <th className="p-4">Grupo</th>
                {opcionesFrecuencia.map(op => <th key={op} className="p-4 text-center">{op}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {gruposAlimentarios.map(grupo => (
                <tr key={grupo} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-700 text-sm">{grupo}</td>
                  {opcionesFrecuencia.map(op => (
                    <td key={op} className="p-4 text-center">
                      <input 
                        type="radio" 
                        value={op} 
                        {...register(`frecuenciaConsumo.${grupo.toLowerCase().replace(/ /g, "_")}`)}
                        className="w-5 h-5 accent-nutri-main"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}