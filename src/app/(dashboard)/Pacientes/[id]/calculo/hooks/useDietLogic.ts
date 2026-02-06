import { useState, useMemo, useEffect } from "react";

const calcularEdad = (fecha: any): number => {
  if (!fecha) return 0;
  const hoy = new Date();
  const cumple = new Date(fecha);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  if (hoy.getMonth() < cumple.getMonth() || (hoy.getMonth() === cumple.getMonth() && hoy.getDate() < cumple.getDate())) edad--;
  return edad;
};

export const useDietLogic = (paciente: any) => {
  const ultimaMed = paciente?.appointments?.[0]?.medicion;

  const [peso, setPeso] = useState(ultimaMed?.peso || 70);
  const [talla, setTalla] = useState(paciente?.talla || 170);
  const [genero, setGenero] = useState((paciente?.sexo || "MUJER").toLowerCase());
  const [formula, setFormula] = useState("mifflin");
  const [actividad, setActividad] = useState(1.2);
  const [macros, setMacros] = useState({ hco: 55, lip: 25, pro: 20 });

  const edad = useMemo(() => calcularEdad(paciente?.fechaNacimiento), [paciente?.fechaNacimiento]);
  
  // ✅ IMC CALCULADO EN TIEMPO REAL
  const imc = useMemo(() => {
    if (!peso || !talla) return 0;
    return parseFloat((peso / ((talla / 100) ** 2)).toFixed(2));
  }, [peso, talla]);

  const geb = useMemo(() => {
    if (!peso || !talla || !edad) return 0;
    const s = genero === "hombre" ? 1 : 0;
    
    switch (formula) {
      case "mifflin": return (10 * peso) + (6.25 * talla) - (5 * edad) + (s ? 5 : -161);
      case "harris": return s ? 66.47 + (13.75 * peso) + (5.0 * talla) - (6.75 * edad) : 655.09 + (9.56 * peso) + (1.84 * talla) - (4.67 * edad);
      case "valencia": return s ? (13.37 * peso) + 747 : (11.02 * peso) + 679;
      // ... resto de fórmulas ...
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

  return { peso, setPeso, talla, setTalla, edad, genero, formula, setFormula, actividad, setActividad, gett, metasGramos, macros, setMacros, imc };
};