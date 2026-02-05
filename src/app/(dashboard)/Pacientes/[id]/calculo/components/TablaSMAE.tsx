import { GRUPOS_SMAE } from "../constants/smae";

export default function TablaSMAE({ equivalentes, setEquivalentes }: any) {
  return (
    <section className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase italic">
        Equivalentes Sistema Mexicano (SMAE)
      </div>
      <table className="w-full text-left text-sm">
        <tbody className="divide-y divide-gray-50">
          {Object.entries(GRUPOS_SMAE).map(([key, info]: [string, any]) => (
            <tr key={key} className="hover:bg-gray-50/30 transition-all">
              <td className="p-6 w-1/2">
                <span className="font-bold text-gray-700 capitalize text-xs block mb-2">{key.replace(/([A-Z])/g, ' $1')}</span>
                <input 
                  type="range" min="0" max="20" step="0.5"
                  value={equivalentes[key] || 0}
                  onChange={(e) => setEquivalentes((p: any) => ({ ...p, [key]: Number(e.target.value) }))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-400"
                />
              </td>
              <td className="p-6">
                <input 
                  type="number" step="0.5" 
                  value={equivalentes[key] || ""} 
                  onChange={(e) => setEquivalentes((p: any) => ({ ...p, [key]: Number(e.target.value) }))}
                  className="w-16 p-2 mx-auto block rounded-xl border-2 border-gray-100 font-black text-center text-xs outline-none focus:border-nutri-main"
                />
              </td>
              <td className="p-6 text-center font-black text-gray-400 text-xs italic">
                {(info.kcal * (equivalentes[key] || 0)).toFixed(0)} kcal
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}