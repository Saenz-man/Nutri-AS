import { useState, useMemo } from 'react';
import { GRUPOS_SMAE } from '../../../../../../constants/smae'; // Ajusta según tu ruta real

export const MEAL_TIMES = ['DESAYUNO', 'COLACIÓN 1', 'COMIDA', 'COLACIÓN 2', 'CENA', 'COLACIÓN 3'];

export interface MealTotals {
  kcal: number;
  pro: number;
  lip: number;
  hco: number;
}

export const useR24Logic = () => {
  const [data, setData] = useState<Record<string, Record<string, number>>>({});

  const updateValue = (meal: string, groupId: string, val: number) => {
    setData(prev => ({
      ...prev,
      [meal]: { ...prev[meal], [groupId]: val }
    }));
  };

  const totalsByMeal = useMemo(() => {
    return MEAL_TIMES.reduce<Record<string, MealTotals>>((acc, meal) => {
      const mealData = data[meal] || {};
      const totals: MealTotals = { kcal: 0, pro: 0, lip: 0, hco: 0 };

      Object.entries(mealData).forEach(([groupId, qty]) => {
        const info = GRUPOS_SMAE[groupId];
        if (info) {
          totals.kcal += qty * info.kcal;
          totals.pro += qty * info.pro;
          totals.lip += qty * info.lip;
          totals.hco += qty * info.hco;
        }
      });

      acc[meal] = totals;
      return acc;
    }, {});
  }, [data]);

  const grandTotal = useMemo(() => {
    return Object.values(totalsByMeal).reduce<MealTotals>((acc, curr) => ({
      kcal: acc.kcal + curr.kcal,
      pro: acc.pro + curr.pro,
      lip: acc.lip + curr.lip,
      hco: acc.hco + curr.hco,
    }), { kcal: 0, pro: 0, lip: 0, hco: 0 });
  }, [totalsByMeal]);

  return { data, updateValue, totalsByMeal, grandTotal };
};