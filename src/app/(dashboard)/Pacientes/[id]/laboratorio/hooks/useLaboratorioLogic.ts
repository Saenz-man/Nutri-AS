// hooks/useLaboratorioLogic.ts
import { useMemo, useState } from "react";

// Rangos de referencia estándar
const RANGOS = {
  glucosa: { min: 70, max: 100 },
  colesterolTotal: { max: 200 },
  trigliceridos: { max: 150 },
  hdl: { min: 40 }
};

export const useLaboratorioLogic = (initialData = {}) => {
  const [values, setValues] = useState<any>(initialData);

  const calculos = useMemo(() => {
    const total = parseFloat(values.colesterolTotal);
    const hdl = parseFloat(values.hdl);
    
    // Cálculo: Índice Aterogénico = Colesterol Total / HDL
    const indice = total && hdl ? parseFloat((total / hdl).toFixed(2)) : 0;
    
    return { indice };
  }, [values.colesterolTotal, values.hdl]);

  // Función de Semáforo
  const getStatusColor = (name: string, value: string) => {
    const val = parseFloat(value);
    if (!val || !RANGOS[name as keyof typeof RANGOS]) return "border-gray-100";
    
    const rango = RANGOS[name as keyof typeof RANGOS];
    if (rango.max && val > rango.max) return "border-red-500 bg-red-50"; // Alto
    if (rango.min && val < rango.min) return "border-yellow-500 bg-yellow-50"; // Bajo
    return "border-green-500 bg-green-50"; // Normal
  };

  return { values, setValues, calculos, getStatusColor };
};