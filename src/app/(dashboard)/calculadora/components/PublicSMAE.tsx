"use client";

import { GRUPOS_SMAE } from "@/constants/smae"; // ⚠️ Asegúrate de que esta ruta sea correcta

export default function PublicSMAE({ equivalentes, setEquivalentes }: any) {
  
  const handleInputChange = (key: string, value: string) => {
    let numValue = value === "" ? 0 : parseFloat(value);
    if (numValue > 25) numValue = 25;
    if (numValue < 0) numValue = 0;
    setEquivalentes((prev: any) => ({ ...prev, [key]: numValue }));
  };

  return (
    <section className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-700">
      <div className="p-8 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">
          Distribución de Equivalentes (SMAE)
        </h3>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-50">
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest pl-8">Grupo</th>
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Raciones</th>
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Hdec</th>
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Prot</th>
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Lip</th>
              <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center pr-8">Kcal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {Object.entries(GRUPOS_SMAE).map(([key, info]: any) => {
              const cant = equivalentes[key] || 0;
              return (
                <tr key={key} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="p-4 pl-8 align-middle">
                    <div className="flex flex-col gap-2 py-1">
                      <span className="text-[11px] font-bold text-gray-700 leading-none">{info.label}</span>
                      <input 
                          type="range" min="0" max="20" step="0.5" value={cant}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className="h-1.5 w-32 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-nutri-main"
                        />
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <input 
                      type="number" step="0.5" min="0" max="20" value={cant === 0 ? "" : cant}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      placeholder="0"
                      className="w-16 mx-auto block bg-white border-2 border-gray-100 focus:border-nutri-main/50 rounded-xl p-2 text-center text-xs font-black outline-none transition-all shadow-sm"
                    />
                  </td>
                  <td className="p-4 text-center text-xs text-gray-500">{(info.hco * cant).toFixed(1)}</td>
                  <td className="p-4 text-center text-xs text-gray-500">{(info.pro * cant).toFixed(1)}</td>
                  <td className="p-4 text-center text-xs text-gray-500">{(info.lip * cant).toFixed(1)}</td>
                  <td className="p-4 text-center pr-8 text-sm font-black text-gray-800">{(info.kcal * cant).toFixed(0)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}