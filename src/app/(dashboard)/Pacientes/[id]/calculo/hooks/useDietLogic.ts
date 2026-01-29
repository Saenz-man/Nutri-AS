// src/app/(dashboard)/Pacientes/[id]/calculo/hooks/useDietLogic.ts
import { useState, useMemo } from "react";

export const useDietLogic = (paciente: any) => {
  const ultimaMed = paciente?.appointments?.[0]?.medicion;

  // Estados Biométricos
  const [peso, setPeso] = useState(ultimaMed?.peso || 70);
  const [talla, setTalla] = useState(paciente?.talla || 170);
  const [edad, setEdad] = useState(28); 
  const [genero, setGenero] = useState(paciente?.sexo || "mujer");
  const [formula, setFormula] = useState("mifflin");
  const [actividad, setActividad] = useState(1.2);

  // Distribución de Macronutrientes
  const [macros, setMacros] = useState({ hco: 55, lip: 25, pro: 20 });

  // Cálculo de GEB (Gasto Energético Basal)
  const geb = useMemo(() => {
    if (!peso || !talla) return 0;
    switch (formula) {
      case "mifflin":
        return genero === "hombre" ? (10 * peso) + (6.25 * talla) - (5 * edad) + 5 : (10 * peso) + (6.25 * talla) - (5 * edad) - 161;
      case "harris":
        return genero === "hombre" ? 66.47 + (13.75 * peso) + (5.0 * talla) - (6.75 * edad) : 655.09 + (9.56 * peso) + (1.84 * talla) - (4.67 * edad);
      case "valencia":
        return genero === "hombre" ? (13.37 * peso) + 747 : (11.02 * peso) + 679;
      case "schofield":
        return genero === "hombre" ? (15.05 * peso) + 692 : (14.81 * peso) + 486;
      case "oms":
        return genero === "hombre" ? (15.3 * peso) + 679 : (14.7 * peso) + 496;
      default: return 0;
    }
  }, [peso, talla, edad, genero, formula]);

  const gett = geb * actividad;

  const metasGramos = useMemo(() => ({
    kcal: gett,
    hcoG: (gett * (macros.hco / 100)) / 4,
    lipG: (gett * (macros.lip / 100)) / 9,
    proG: (gett * (macros.pro / 100)) / 4,
  }), [gett, macros]);

  return { peso, setPeso, talla, setTalla, edad, setEdad, genero, setGenero, formula, setFormula, actividad, setActividad, gett, metasGramos, macros, setMacros };
};