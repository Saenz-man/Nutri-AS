// src/app/(dashboard)/Pacientes/[id]/laboratorios/components/TablaLaboratorio.tsx
"use client";

import { Info } from "lucide-react";
import { RANGOS_LAB } from "../hooks/useLaboratorioLogic";

export default function TablaLaboratorio({ values, setValues, getStatusInfo, ultimoEstudio }: any) {
  const handleInput = (name: string, val: string) => {
    // Validación: Solo números y punto decimal
    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
      setValues((prev: any) => ({ ...prev, [name]: val }));
    }
  };

  return (
    <div className="bg-white rounded-4xl border border-gray-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="p-5 text-[10px] font-black text-gray-400 uppercase">Elemento</th>
            <th className="p-5 text-[10px] font-black text-gray-400 uppercase">Valor</th>
            <th className="p-5 text-[10px] font-black text-gray-400 uppercase">Anterior</th>
            <th className="p-5 text-[10px] font-black text-gray-400 uppercase text-center">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {Object.entries(RANGOS_LAB).map(([key, config]) => {
            const status = getStatusInfo(key, values[key]);
            const anterior = ultimoEstudio?.[key];

            return (
              <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-5">
                  <p className="font-bold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-[10px] text-gray-400 font-medium">Ref: {config.min} - {config.max} {config.unit}</p>
                </td>
                <td className="p-5">
                  <div className="relative max-w-[120px]">
                    <input
                      value={values[key] || ""}
                      onChange={(e) => handleInput(key, e.target.value)}
                      className={`w-full px-4 py-2 rounded-xl font-bold border transition-all outline-none ${
                        status.color === 'red' ? 'border-red-500 bg-red-50 text-red-700' :
                        status.color === 'yellow' ? 'border-yellow-500 bg-yellow-50 text-yellow-700' :
                        status.color === 'green' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-[10px] font-black text-gray-300 pointer-events-none">
                      {config.unit}
                    </span>
                  </div>
                </td>
                <td className="p-5">
                   <p className="text-xs font-bold text-gray-400">
                     {anterior ? `${anterior} ${config.unit}` : "--"}
                   </p>
                </td>
                <td className="p-5 text-center">
                  {status.label && (
                    <div className="group relative inline-block">
                      <div className={`w-3 h-3 rounded-full mx-auto ${
                        status.color === 'red' ? 'bg-red-500 animate-pulse' :
                        status.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      {/* Tooltip para Nivel Crítico */}
                      {status.color === 'red' && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[9px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {status.label}
                        </span>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}