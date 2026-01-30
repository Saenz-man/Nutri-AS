"use client";

import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { 
  calcularIMC, 
  calcularICC, 
  obtenerClasificacionIMC,
  calcularGrasaSiri, 
  calcularMasaOseaDobeln,
  calcularMasaMuscularSimplificada 
} from "../lib/formulas";

/**
 * 🧠 HOOK: useCalculosNutri
 * Gestiona el estado de los 24+ campos antropométricos y ejecuta fórmulas ISAK.
 */
export const useCalculosNutri = (initialAge: number = 0) => {
  const [values, setValues] = useState<any>({
    // 🟢 MEDIDAS BÁSICAS (4)
    peso: "",
    talla: "",
    tallaSentado: "",
    envergadura: "",

    // 🔴 PANÍCULOS / PLIEGUES EN MM (8)
    triceps: "",
    subescapular: "",
    biceps: "",
    crestaIliaca: "",
    supraespinal: "",
    abdominal: "",
    muslo: "",
    pierna: "",

    // 🟠 DATOS DE BIOIMPEDANCIA
    grasaEquipo: "",
    agua: "",
    grasaVisceral: "",
    edadMetabolica: initialAge, // Se pre-llena con la edad del paciente
    masaOsea: "",
    musculo: "", // Tejido Magro calculado

    // 🔵 CIRCUNFERENCIAS Y DIÁMETROS
    cintura: "",
    cadera: "",
    brazoR: "",
    brazoC: "",
    piernaCirc: "", // Perímetro de pierna
    estiloideo: "", // Diámetro muñeca
    femur: "",      // Diámetro fémur
    humero: ""      // Diámetro húmero
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * 🎂 SINCRONIZACIÓN DE EDAD
   * Actualiza el campo de edad cuando los datos del paciente cargan desde Hostinger.
   */
  useEffect(() => {
    if (initialAge > 0) {
      setValues((prev: any) => ({ ...prev, edadMetabolica: initialAge }));
    }
  }, [initialAge]);

  /**
   * 📐 INDICADORES EN TIEMPO REAL (IMC e ICC)
   * Se recalculan automáticamente al escribir peso, talla, cintura o cadera.
   */
  const calculos = useMemo(() => {
    const p = parseFloat(values.peso);
    const t = parseFloat(values.talla);
    const cin = parseFloat(values.cintura);
    const cad = parseFloat(values.cadera);

    const imc = calcularIMC(p, t);
    const clasificacion = obtenerClasificacionIMC(imc);
    const icc = calcularICC(cin, cad);

    return { imc, clasificacion, icc };
  }, [values.peso, values.talla, values.cintura, values.cadera]);

  /**
   * 🧬 BOTÓN: CALCULAR RESULTADOS
   * Ejecuta el motor científico de Nutri-AS para obtener composición corporal.
   */
  const ejecutarFormulasCientificas = () => {
    const p = parseFloat(values.peso);
    const t = parseFloat(values.talla);

    // 1. % Grasa por Siri (Suma de 4 pliegues básicos)
    const g = calcularGrasaSiri(
      parseFloat(values.triceps), 
      parseFloat(values.biceps),
      parseFloat(values.subescapular), 
      parseFloat(values.crestaIliaca)
    );
    
    // 2. Masa Ósea por Von Dobeln (Talla + Muñeca + Fémur)
    const o = calcularMasaOseaDobeln(
      t, 
      parseFloat(values.estiloideo), 
      parseFloat(values.femur)
    );

    // 3. Masa Muscular (Tejido Magro) por fraccionamiento
    const m = calcularMasaMuscularSimplificada(p, g, o);

    if (g > 0 || o > 0 || m > 0) {
      setValues((prev: any) => ({ 
        ...prev, 
        grasaEquipo: g > 0 ? g.toFixed(2) : prev.grasaEquipo, 
        masaOsea: o > 0 ? o.toFixed(2) : prev.masaOsea,
        musculo: m > 0 ? m.toFixed(2) : prev.musculo
      }));
      toast.success("Composición corporal (Grasa, Músculo y Hueso) calculada con éxito.");
    } else {
      toast.error("Faltan datos críticos para aplicar las fórmulas ISAK.");
    }
  };

  /**
   * 🛡️ VALIDACIÓN DE RANGOS CLÍNICOS
   */
  const validarCampo = (name: string, value: string) => {
    const val = parseFloat(value);
    let error = "";

    if (name === "talla" && (val < 40 || val > 250)) error = "Estatura fuera de rango (40-250cm)";
    if (name === "peso" && (val < 2 || val > 500)) error = "Peso fuera de rango";

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  /**
   * ⌨️ MANEJADOR DE ENTRADA
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  return {
    values,
    errors,
    calculos,
    handleChange,
    validarCampo,
    ejecutarFormulasCientificas, // Función para el botón naranja
    setValues
  };
};