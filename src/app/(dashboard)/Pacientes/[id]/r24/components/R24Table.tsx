import { MEAL_TIMES } from '../hooks/useR24Logic';

const FOOD_GROUPS = [
  { id: 'frutas', name: 'Frutas' },
  { id: 'verduras', name: 'Verduras' },
  { id: 'cerealesSG', name: 'Cereales S/G' },
  { id: 'cerealesCG', name: 'Cereales C/G' },
  { id: 'leguminosas', name: 'Leguminosas' },
  { id: 'aoaMBAG', name: 'O.A. Muy Bajo Grasa' },
  { id: 'aoaBAG', name: 'O.A. Bajo Grasa' },
  { id: 'aoaMAG', name: 'O.A. Moderado Grasa' },
  { id: 'aoaAAG', name: 'O.A. Alto Grasa' },
  { id: 'lecheDescremada', name: 'Leche Descremada' },
  { id: 'grasasSG', name: 'Grasas' },
  { id: 'azucaresSG', name: 'Azúcar' },
];

export const R24Table = ({ data, onUpdate }: any) => {
  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm bg-white">
      <table className="w-full text-left border-collapse overflow-hidden">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest border-r border-gray-100">Equivalente</th>
            {MEAL_TIMES.map(time => (
              <th key={time} className="p-3 text-center text-[10px] font-black text-[#3d5a2b] border-r border-gray-100 uppercase tracking-tighter">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {FOOD_GROUPS.map((group) => (
            <tr key={group.id} className="hover:bg-[#3d5a2b]/5 transition-colors group">
              <td className="p-4 pl-6 font-bold text-sm text-gray-600 group-hover:text-[#3d5a2b]">{group.name}</td>
              {MEAL_TIMES.map(time => (
                <td key={time} className="p-1 border-l border-gray-50">
                  <input
                    type="number"
                    value={data[group.id]?.[time] || ''}
                    onChange={(e) => onUpdate(group.id, time, e.target.value)}
                    className="w-full bg-transparent text-center focus:bg-white focus:shadow-inner outline-none py-2.5 text-sm font-bold text-gray-700"
                    placeholder="-"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};