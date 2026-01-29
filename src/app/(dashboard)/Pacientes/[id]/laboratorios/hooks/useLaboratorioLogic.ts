// src/app/(dashboard)/Pacientes/[id]/laboratorios/hooks/useLaboratorioLogic.ts
import { useState, useMemo } from "react";

export interface RangoLab {
  min?: number;
  max?: number;
  unit: string;
}

export const RANGOS_LAB: Record<string, RangoLab> = {
  sodio: { min: 136, max: 145, unit: "mEq/L" },
  potasio: { min: 3.5, max: 5.5, unit: "mEq/L" },
  cloro: { min: 95, max: 105, unit: "mEq/L" },
  acidoUrico: { min: 4, max: 9, unit: "mg/dL" },
  glucosaAyuno: { min: 65, max: 100, unit: "mg/dL" },
  hbGlucosilada: { min: 5, max: 6, unit: "%" },
  creatinina: { min: 0.6, max: 1.2, unit: "mg/dL" },
  urea: { min: 10, max: 40, unit: "mg/dL" },
  colesterolTotal: { min: 120, max: 199, unit: "mg/dL" },
  hdl: { min: 40, max: 50, unit: "mg/dL" },
  ldl: { min: 65, max: 150, unit: "mg/dL" },
  trigliceridos: { min: 40, max: 160, unit: "mg/dL" },
};

export const useLaboratorioLogic = (initialValues = {}) => {
  const [values, setValues] = useState<any>(initialValues);

  const getStatus = (name: string, value: string) => {
    // ✅ Si no hay valor, devolvemos 'gray' para el borde gris inicial
    if (value === "" || value === null || value === undefined) return { color: "gray", label: "" };
    
    // Lógica para PH
    if (name === "ph") {
      const val = parseFloat(value);
      if (val >= 6.0 && val <= 7.5) return { color: "green", label: "Óptimo" };
      if ((val >= 5.5 && val < 6.0) || (val > 7.5 && val <= 8.0)) return { color: "yellow", label: "Alerta" };
      return { color: "red", label: "Riesgo" };
    }

    const val = parseFloat(value);
    const config = RANGOS_LAB[name];
    if (isNaN(val) || !config) return { color: "gray", label: "" };

    const { min, max } = config;
    const bufferMin = min ? min * 0.98 : 0;
    const bufferMax = max ? max * 1.02 : 9999;

    if ((!min || val >= min) && (!max || val <= max)) return { color: "green", label: "Normal" };
    if ((!min || val >= bufferMin) && (!max || val <= bufferMax)) return { color: "yellow", label: "Alerta" };
    return { color: "red", label: "Riesgo" };
  };

  const totalAlertas = useMemo(() => {
    return Object.keys(values).reduce((acc, key) => {
      const { color } = getStatus(key, values[key]);
      return (color === "red" || color === "yellow") ? acc + 1 : acc;
    }, 0);
  }, [values]);

  const indiceAterogenico = useMemo(() => {
    const ct = parseFloat(values.colesterolTotal);
    const hdl = parseFloat(values.hdl);
    return ct && hdl ? parseFloat((ct / hdl).toFixed(2)) : 0;
  }, [values.colesterolTotal, values.hdl]);

  return { values, setValues, getStatus, totalAlertas, indiceAterogenico };
};