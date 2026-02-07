"use client";

interface Props {
  macros: { hco: number; lip: number; pro: number };
  onMacroChange: (key: string, value: number) => void;
  metasGramos: any;
  gett: number;
}

export default function PublicMacros({ macros, onMacroChange, metasGramos, gett }: Props) {
  const config = [
    { key: 'hco', label: 'Hdec (Carbs)', color: 'accent-red-400', g: metasGramos.hcoG },
    { key: 'pro', label: 'Proteínas', color: 'accent-gray-400', g: metasGramos.proG },
    { key: 'lip', label: 'Lípidos', color: 'accent-orange-400', g: metasGramos.lipG },
  ];

  return (
    <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
      <div>
        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-6">
          Distribución Energética
        </h2>
        
        <div className="space-y-6">
          {config.map((m) => (
            <div key={m.key} className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span>{m.label}</span>
                <span className="text-nutri-main">{(macros as any)[m.key]}%</span>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={(macros as any)[m.key]}
                onChange={(e) => onMacroChange(m.key, Number(e.target.value))}
                className={`w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer ${m.color}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100">
        <table className="w-full text-left text-[10px] font-bold">
          <thead className="bg-gray-50/50">
            <tr className="text-gray-400 uppercase font-black">
              <th className="p-4 italic">Macro</th>
              <th className="p-4 text-center">Gramos</th>
              <th className="p-4 text-center">Calorías</th>
              <th className="p-4 text-center">Dist.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {config.map((row) => (
              <tr key={row.key}>
                <td className="p-4 italic uppercase">{row.label}</td>
                <td className="p-4 text-center font-black">{row.g.toFixed(0)} g</td>
                <td className="p-4 text-center">{(gett * ((macros as any)[row.key] / 100)).toFixed(0)}</td>
                <td className="p-4 text-center text-nutri-main">{(macros as any)[row.key]}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}