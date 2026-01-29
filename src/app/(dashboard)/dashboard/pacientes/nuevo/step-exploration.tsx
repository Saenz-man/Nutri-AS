"use client";

import { Activity, ClipboardList, Info } from "lucide-react";

interface StepExplorationProps {
  register: any;
  errors?: any;
}

export default function StepExploration({ register, errors }: StepExplorationProps) {
  // Definición de los indicadores para la tabla clínica
  const indicadores = [
    { id: "piel", label: "Piel", normal: "Tersa, hidratada, sin lesiones." },
    { id: "cabello", label: "Cabello", normal: "Brillante, resistente, buena implantación." },
    { id: "dientes", label: "Dientes/Encías", normal: "Esmalte íntegro, encías rosadas." },
    { id: "mucosa", label: "Mucosa Oral", normal: "Hidratada, coloración adecuada." },
    { id: "uñas", label: "Uñas", normal: "Fuertes, sin manchas o surcos." },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4">
      {/* SECCIÓN A: EXPLORACIÓN FÍSICA */}
      <div className="glass-card p-8 md:p-12 rounded-4xl space-y-8">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 bg-nutri-main/10 text-nutri-main rounded-2xl flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 font-display">Exploración Física</h3>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Hallazgos Clínicos</p>
          </div>
        </div>

        <div className="overflow-hidden border border-gray-100 rounded-3xl shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              <tr>
                <th className="p-5">Indicador</th>
                <th className="p-5 hidden md:table-cell">Referencia Normal</th>
                <th className="p-5">Hallazgo del Paciente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {indicadores.map((item) => (
                <tr key={item.id} className="group hover:bg-nutri-light/20 transition-colors">
                  <td className="p-5 font-bold text-gray-800">{item.label}</td>
                  <td className="p-5 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium italic">
                      <Info size={14} className="text-nutri-main/50" />
                      {item.normal}
                    </div>
                  </td>
                  <td className="p-5">
                    <input 
                      {...register(`exploracion.${item.id}`)}
                      className="w-full bg-gray-50 border border-transparent rounded-xl p-3 text-sm font-medium focus:bg-white focus:border-nutri-main/30 focus:ring-4 focus:ring-nutri-main/5 outline-none transition-all placeholder:text-gray-300"
                      placeholder="Escribe tus observaciones..."
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECCIÓN B: CONCLUSIÓN PROFESIONAL */}
      <div className="glass-card p-8 md:p-12 rounded-4xl space-y-6 border-l-8 border-l-nutri-orange">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-50 text-nutri-orange rounded-2xl flex items-center justify-center">
            <ClipboardList size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 font-display">Diagnóstico Nutricional</h3>
        </div>

        <div className="space-y-2">
          <textarea 
            {...register("diagnosticoNutricional")}
            rows={6}
            className="nutri-input resize-none p-6 text-lg leading-relaxed"
            placeholder="Escribe la conclusión profesional, diagnóstico y los primeros pasos del plan de acción para el paciente..."
          />
          {errors?.diagnosticoNutricional && (
            <p className="text-red-500 text-xs font-bold ml-2">
              {errors.diagnosticoNutricional.message}
            </p>
          )}
        </div>
        
        <div className="bg-orange-50/50 p-4 rounded-2xl flex items-start gap-3">
          <Info className="text-nutri-orange shrink-0 mt-0.5" size={18} />
          <p className="text-xs font-bold text-orange-800/70 leading-relaxed">
            Esta información será la base para la primera consulta. Asegúrate de ser detallado para que el historial sea útil en el seguimiento a largo plazo.
          </p>
        </div>
      </div>
    </div>
  );
}