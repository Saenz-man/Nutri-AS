import { useState, useMemo, useEffect } from "react";

export const useDietLogic = (paciente: any) => {
  const ultimaMed = paciente?.appointments?.[0]?.medicion;

  const [peso, setPeso] = useState(ultimaMed?.peso || 70);
  const [talla, setTalla] = useState(paciente?.talla || 170);
  // 🟢 Inicializamos con lo que venga del objeto paciente
  const [edad, setEdad] = useState(paciente?.edad || 0); 
  const [genero, setGenero] = useState(paciente?.sexo || paciente?.genero || "mujer");
  const [formula, setFormula] = useState("mifflin");
  const [actividad, setActividad] = useState(1.2);
  const [macros, setMacros] = useState({ hco: 55, lip: 25, pro: 20 });

  // 🔄 SINCRONIZACIÓN FORZADA: Detecta cambios en el paciente
  useEffect(() => {
    if (paciente) {
      setPeso(ultimaMed?.peso || paciente.peso || 70);
      setTalla(paciente.talla || 170);
      setEdad(paciente.edad || 0);
      // Buscamos sexo o genero y normalizamos a minúsculas
      const g = (paciente.sexo || paciente.genero || "mujer").toLowerCase();
      setGenero(g);
    }
  }, [paciente, ultimaMed]);

  const imc = useMemo(() => {
    if (!peso || !talla) return 0;
    return parseFloat((peso / ((talla / 100) ** 2)).toFixed(2));
  }, [peso, talla]);

  const geb = useMemo(() => {
    if (!peso || !talla || !edad) return 0;
    const s = genero === "hombre" ? 1 : 0;
    
    switch (formula) {
      case "mifflin":
        return (10 * peso) + (6.25 * talla) - (5 * edad) + (s ? 5 : -161);
      case "harris":
        return s 
          ? 66.47 + (13.75 * peso) + (5.0 * talla) - (6.75 * edad) 
          : 655.09 + (9.56 * peso) + (1.84 * talla) - (4.67 * edad);
      case "valencia":
        return s ? (13.37 * peso) + 747 : (11.02 * peso) + 679;
      case "schofield":
        return s ? (15.05 * peso) + 692 : (14.81 * peso) + 486;
      case "oms":
        return s ? (15.3 * peso) + 679 : (14.7 * peso) + 496;
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