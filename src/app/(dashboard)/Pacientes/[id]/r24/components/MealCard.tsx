import { Utensils } from 'lucide-react';
import { GRUPOS_SMAE } from '@/constants/smae'; // Ajusta la ruta a tu constante
import { MealTotals } from '../hooks/useR24Logic';

interface MealCardProps {
  meal: string;
  mealData: Record<string, number>;
  totals: MealTotals;
  onUpdate: (meal: string, groupId: string, val: number) => void;
}

export const MealCard = ({ meal, mealData, totals, onUpdate }: MealCardProps) => {
  return (
    <div className="bg-white rounded-4xl shadow-nutri border border-gray-100 overflow-hidden transition-all duration-300">
      <div className="bg-nutri-main p-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Utensils className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-white font-bold tracking-tight text-sm uppercase">{meal}</h3>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-lg">
          <span className="text-white font-black text-base">
            {Math.round(totals.kcal)} <small className="text-[10px] opacity-80 uppercase">kcal</small>
          </span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-4 bg-white">
        {Object.entries(GRUPOS_SMAE).map(([key, info]) => (
          <div key={key} className="group flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-nutri-main transition-colors truncate">
              {info.label}
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={mealData[key] || ''}
              onChange={(e) => onUpdate(meal, key, parseFloat(e.target.value) || 0)}
              className="nutri-input px-3 py-2 text-sm font-bold text-gray-700"
              placeholder="0"
            />
          </div>
        ))}
      </div>

      <div className="px-6 py-4 bg-nutri-light border-t border-gray-50 flex justify-between items-center">
        <MacroIndicator label="P" value={totals.pro} color="text-teal-600" />
        <div className="w-px h-4 bg-gray-200" />
        <MacroIndicator label="L" value={totals.lip} color="text-nutri-orange" />
        <div className="w-px h-4 bg-gray-200" />
        <MacroIndicator label="H" value={totals.hco} color="text-nutri-main" />
      </div>
    </div>
  );
};

const MacroIndicator = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-[9px] font-black text-gray-400 uppercase">{label}</span>
    <span className={`text-xs font-black ${color}`}>{value.toFixed(1)}g</span>
  </div>
);