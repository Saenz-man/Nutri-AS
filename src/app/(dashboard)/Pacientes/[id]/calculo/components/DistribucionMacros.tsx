"use client";

import { Activity } from "lucide-react";

interface Props {
  macros: { hco: number; lip: number; pro: number };
  setMacros: (macros: any) => void;
  metasGramos: { kcal: number; hcoG: number; lipG: number; proG: number };
}

export default function DistribucionMacros({ macros, setMacros, metasGramos }: Props) {
  
  // 🔄 Manejador para sliders: Ajusta los otros dos para sumar 100%
  const handleSliderChange = (key: string, value: number) => {
    const otherKeys = Object.keys(macros).filter(k => k !== key);
    const remaining = 100 - value;
    const currentOthersTotal = macros[otherKeys[0] as keyof typeof macros] + macros[otherKeys[1] as keyof typeof macros];
    
    let newOthers;
    if (currentOthersTotal === 0) {
      newOthers = { [otherKeys[0]]: remaining / 2, [otherKeys[1]]: remaining / 2 };
    } else {
      const ratio = remaining / currentOthersTotal;
      newOthers = {
        [otherKeys[0]]: Math.round(macros[otherKeys[0] as keyof typeof macros] * ratio),
        [otherKeys[1]]: Math.round(macros[otherKeys[1] as keyof typeof macros] * ratio)
      };
    }

    setMacros({ ...newOthers, [key]: value });
  };

  const macroData = [
    { id: 'hco', label: 'Hdec', color: 'bg-red-400', val: macros.hco, g: metasGramos.hcoG, cal: metasGramos.kcal * (macros.hco/100) },
    { id: 'pro', label: 'Prot', color: 'bg-gray-400', val: macros.pro, g: metasGramos.proG, cal: metasGramos.kcal * (macros.pro/100) },
    { id: 'lip', label: 'Lip', color: 'bg-orange-400', val: macros.lip, g: metasGramos.lipG, cal: metasGramos.kcal * (macros.lip/100) },
  ];

  return (
    <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-1">
        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Distribución de Nutrientes</h2>
        <p className="text-xl font-black text-gray-800 italic uppercase">Distribución</p>
      </div>

      {/* 🎚️ SECCIÓN DE SLIDERS */}
      <div className="space-y-6">
        {macroData.map((m) => (
          <div key={m.id} className="grid grid-cols-12 items-center gap-4 border-b border-gray-50 pb-4 last:border-0">
            <span className="col-span-2 text-xs font-black text-gray-600 uppercase italic">{m.label}</span>
            <div className="col-span-8 flex items-center gap-4">
              <input 
                type="range" min="0" max="100" value={m.val}
                onChange={(e) => handleSliderChange(m.id, Number(e.target.value))}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-nutri-main bg-gray-100`}
              />
            </div>
            <div className="col-span-2 flex items-center gap-1">
              <input 
                type="number" value={m.val}
                onChange={(e) => handleSliderChange(m.id, Number(e.target.value))}
                className="w-full p-2 border border-gray-100 rounded-xl text-center font-black text-xs outline-none focus:border-nutri-main"
              />
              <span className="text-[10px] font-black text-gray-400">%</span>
            </div>
          </div>
        ))}
      </div>

      {/* 📊 TABLA DE RESULTADOS DINÁMICOS */}
      <div className="overflow-hidden rounded-3xl border border-gray-50">
        <table className="w-full text-left text-[10px]">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="p-4 font-black uppercase text-gray-400"></th>
              <th className="p-4 font-black uppercase text-gray-400 text-center">Gramos</th>
              <th className="p-4 font-black uppercase text-gray-400 text-center">Calorías</th>
              <th className="p-4 font-black uppercase text-gray-400 text-center">Distribución</th>
            </tr>
          </thead>
         <tbody className="divide-y divide-gray-50">
            {macroData.map((m) => (
              <tr key={m.id} className="font-bold text-gray-700">
                <td className="p-4 italic uppercase">{m.label}</td>
                <td className="p-4 text-center">{m.g.toFixed(0)} g</td>
                <td className="p-4 text-center">{m.cal.toFixed(0)} cal</td>
                <td className="p-4 text-center">{m.val} %</td>
              </tr>
            ))} {/* Primero cerramos el map */}
          </tbody> {/* Luego cerramos el tbody */}
        </table>
        
        {/* TOTAL KCAL FOOTER */}
        <div className="bg-gray-800 p-6 text-center">
          <span className="text-white font-black italic tracking-widest text-lg">
            {metasGramos.kcal.toFixed(0)} kcal
          </span>
        </div>
      </div>
    </section>
  );
}