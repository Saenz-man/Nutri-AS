// src/app/(dashboard)/Pacientes/[id]/calculo/components/TablaSMAE.tsx
"use client";

import { GRUPOS_SMAE } from "../constants/smae";

export default function TablaSMAE({ equivalentes, setEquivalentes }: any) {
  
  // Manejador unificado para slider e input numérico
  const handleInputChange = (key: string, value: string) => {
    // Aseguramos que el valor esté entre 0 y 20
    let numValue = value === "" ? 0 : parseFloat(value);
    if (numValue > 20) numValue = 20;
    if (numValue < 0) numValue = 0;

    setEquivalentes((prev: any) => ({ ...prev, [key]: numValue }));
  };

  return (
    <section className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-700">
      <div className="p-8 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">
          Distribución de Equivalentes (SMAE)
        </h3>
        <span className="text-[9px] font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
          Rango permitido: 0 - 20 por grupo
        </span>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-50">
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest pl-8">Grupo / Ajuste Rápido</th>
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Cant. Exacta</th>
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Hdec</th>
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Prot</th>
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Lip</th>
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center pr-8">Kcal Totales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {Object.entries(GRUPOS_SMAE).map(([key, info]) => {
              // Obtenemos el valor actual o 0 si no existe
              const cant = equivalentes[key] || 0;
              
              return (
                <tr key={key} className="hover:bg-gray-50/40 transition-colors group">
                  {/* ✅ COLUMNA 1: Nombre + Slider */}
                  <td className="p-4 pl-8 align-middle">
                    <div className="flex flex-col gap-2 py-1">
                      <span className="text-[11px] font-bold text-gray-700 leading-none">{info.label}</span>
                      <div className="flex items-center gap-3">
                         {/* El nuevo slider de 0 a 20 */}
                        <input 
                          type="range" 
                          min="0" max="20" step="0.5"
                          value={cant}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className="h-1.5 w-32 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-nutri-main hover:bg-gray-200 transition-all"
                        />
                        {/* Pequeño indicador visual del valor del slider */}
                        <span className="text-[9px] font-black text-nutri-main w-6 text-right">{cant.toFixed(1)}</span>
                      </div>
                    </div>
                  </td>
                  
                  {/* COLUMNA 2: Input Numérico (para precisión) */}
                  <td className="p-4 align-middle">
                    <input 
                      type="number" step="0.5" min="0" max="20"
                      value={cant === 0 ? "" : cant}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      placeholder="0"
                      className="w-16 mx-auto block bg-white border-2 border-gray-100 focus:border-nutri-main/50 rounded-xl p-2 text-center text-xs font-black outline-none transition-all shadow-sm group-hover:border-gray-200"
                    />
                  </td>

                  {/* COLUMNAS DE CÁLCULO NUTRICIONAL */}
                  <td className="p-4 text-center text-xs font-medium text-gray-500 align-middle">
                    {(info.hco * cant).toFixed(1)}
                  </td>
                  <td className="p-4 text-center text-xs font-medium text-gray-500 align-middle">
                    {(info.pro * cant).toFixed(1)}
                  </td>
                  <td className="p-4 text-center text-xs font-medium text-gray-500 align-middle">
                    {(info.lip * cant).toFixed(1)}
                  </td>
                  <td className="p-4 text-center pr-8 align-middle">
                    <span className="text-sm font-black text-gray-800 italic tabular-nums">
                      {(info.kcal * cant).toFixed(0)} <small className="text-[8px] opacity-40 uppercase font-bold">kcal</small>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}