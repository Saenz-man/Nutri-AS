"use client";

import { useState, useMemo } from "react";

export const useCalculosNutri = (initialValues = {}) => {
  const [values, setValues] = useState({
    // 🟢 Básicos (4)
    peso: "",
    talla: "",
    tallaSentado: "",
    envergadura: "",
    // 🔴 Panículos/Pliegues en mm (8)
    triceps: "",
    subescapular: "",
    biceps: "",
    crestaIliaca: "",
    supraespinal: "",
    abdominal: "",
    muslo: "",
    pierna: "",
    // 🔵 Otros campos para cálculos
    cintura: "",
    cadera: "",
    grasaEquipo: "",
    agua: "",
    grasaVisceral: "",
    edadMetabolica: "",
    masaOsea: "",
    brazoR: "",
    brazoC: "",
    estiloideo: "",
    femur: "",
    humero: "",
    ...initialValues
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 📐 CÁLCULO DE INDICADORES EN TIEMPO REAL
  const calculos = useMemo(() => {
    const p = parseFloat(values.peso);
    const t = parseFloat(values.talla) / 100; // cm a m

    let imc = 0;
    let clasificacion = "Pendiente";
    let icc = 0;

    // Fórmula: $IMC = \frac{Peso(kg)}{Estatura(m)^2}$
    if (p > 0 && t > 0) {
      imc = parseFloat((p / (t * t)).toFixed(2));
      
      if (imc < 18.5) clasificacion = "Bajo Peso";
      else if (imc < 25) clasificacion = "Normal";
      else if (imc < 30) clasificacion = "Sobrepeso";
      else clasificacion = "Obesidad";
    }

    // Fórmula: $ICC = \frac{Cintura(cm)}{Cadera(cm)}$
    const cin = parseFloat(values.cintura);
    const cad = parseFloat(values.cadera);
    if (cin > 0 && cad > 0) {
      icc = parseFloat((cin / cad).toFixed(2));
    }

    return { imc, clasificacion, icc };
  }, [values.peso, values.talla, values.cintura, values.cadera]);

  // 🛡️ VALIDACIÓN DE RANGOS
  const validarCampo = (name: string, value: string) => {
    const val = parseFloat(value);
    let error = "";

    if (name === "talla" && (val < 40 || val > 250)) error = "Estatura fuera de rango (40-250cm)";
    if (name === "peso" && (val < 2 || val > 500)) error = "Peso fuera de rango";

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  return {
    values,
    errors,
    calculos,
    handleChange,
    validarCampo,
    setValues
  };
};