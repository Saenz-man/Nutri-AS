// src/app/(dashboard)/Pacientes/[id]/laboratorios/hooks/useLaboratorioLogic.ts
import { useState, useMemo } from "react";

export interface RangoLab {
  min?: number;
  max?: number;
  unit: string;
}

export const RANGOS_LAB: Record<string, RangoLab> = {
  // Bioquímico
  sodio: { min: 136, max: 145, unit: "mEq/L" },
  potasio: { min: 3.5, max: 5.5, unit: "mEq/L" },
  cloro: { min: 95, max: 105, unit: "mEq/L" },
  acidoUrico: { min: 4, max: 9, unit: "mg/dL" },
  glucosaAyuno: { min: 65, max: 100, unit: "mg/dL" },
  hbGlucosilada: { min: 5, max: 6, unit: "%" },
  creatinina: { min: 0.6, max: 1.2, unit: "mg/dL" },
  urea: { min: 10, max: 40, unit: "mg/dL" },
  // Lipídico
  colesterolTotal: { min: 120, max: 199, unit: "mg/dL" },
  hdl: { min: 40, max: 50, unit: "mg/dL" },
  ldl: { min: 65, max: 150, unit: "mg/dL" },
  trigliceridos: { min: 40, max: 160, unit: "mg/dL" },
};

export const useLaboratorioLogic = (initialValues = {}) => {
  const [values, setValues] = useState<any>(initialValues);

  /**
   * 🚦 Lógica de colores e información (Semáforo Nutri-AS)
   */
  const getStatusInfo = (name: string, value: any) => {
    if (value === "" || value === null || value === undefined) {
      return { color: "gray", label: "" };
    }
    
    const val = parseFloat(value);
    if (isNaN(val)) return { color: "gray", label: "" };

    // Caso Especial: PH Urinario
    if (name === "ph") {
      if (val >= 6.0 && val <= 7.5) return { color: "green", label: "Óptimo" };
      if ((val >= 5.5 && val < 6.0) || (val > 7.5 && val <= 8.0)) return { color: "yellow", label: "Alerta" };
      return { color: "red", label: "Nivel Crítico" };
    }

    const config = RANGOS_LAB[name];
    if (!config) return { color: "gray", label: "" };

    // ✅ Fix TS 18048: Manejo seguro de min/max con valores por defecto
    const min = config.min ?? 0;
    const max = config.max ?? 999999;
    const bufferMin = min * 0.98;
    const bufferMax = max * 1.02;

    if (val >= min && val <= max) return { color: "green", label: "Normal" };
    if (val >= bufferMin && val <= bufferMax) return { color: "yellow", label: "Alerta" };
    return { color: "red", label: "Nivel Crítico" };
  };

  /**
   * 🎨 Obtener clases de Tailwind para los inputs
   */
  const getStatusColor = (name: string, value: any) => {
    const status = getStatusInfo(name, value);
    switch (status.color) {
      case "red": return "border-red-500 bg-red-50 text-red-700";
      case "yellow": return "border-yellow-500 bg-yellow-50 text-yellow-700";
      case "green": return "border-green-500 bg-green-50 text-green-700";
      default: return "border-gray-100 bg-gray-50/50";
    }
  };

  /**
   * 📈 Cálculos automáticos (como el Índice Aterogénico)
   */
  const calculos = useMemo(() => {
    const ct = parseFloat(values.colesterolTotal) || 0;
    const hdl = parseFloat(values.hdl) || 0;
    const indice = hdl > 0 ? parseFloat((ct / hdl).toFixed(2)) : 0;
    return { indice };
  }, [values.colesterolTotal, values.hdl]);

  /**
   * 🚨 Conteo de alertas totales
   */
  const totalAlertas = useMemo(() => {
    return Object.entries(values).filter(([key, val]) => {
      const status = getStatusInfo(key, val);
      return status.color === 'red' || status.color === 'yellow';
    }).length;
  }, [values]);

  /**
   * 🔄 Estado de cambios
   */
  const hasChanges = Object.values(values).some(v => v !== "" && v !== null);

  return { 
    values, 
    setValues, 
    getStatusInfo, 
    getStatusColor, 
    calculos, 
    totalAlertas, 
    hasChanges,
    indiceAterogenico: calculos.indice // Alias para compatibilidad
  };
};