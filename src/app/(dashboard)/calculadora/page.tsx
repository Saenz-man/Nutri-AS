"use client";

import { useState, useMemo, useEffect } from "react";
import { GRUPOS_SMAE } from "@/constants/smae";
import { Play, RefreshCw } from "lucide-react";

// Componentes
import PublicHeader from "./components/PublicHeader";
import PublicDatos from "./components/PublicDatos";
import PublicConfig from "./components/PublicConfig";
import PublicMacros from "./components/PublicMacros";
import PublicSMAE from "./components/PublicSMAE";
import PublicValidation from "./components/PublicValidation";

export default function CalculadoraPage() {
  // 1. Estados Biométricos
  const [edad, setEdad] = useState(30);
  const [genero, setGenero] = useState("H");
  const [peso, setPeso] = useState(75);
  const [talla, setTalla] = useState(175);
  const [actividad, setActividad] = useState(1.2);
  const [formula, setFormula] = useState("mifflin");

  // ✅ ESTADO NUEVO: Meta Manual
  const [metaManual, setMetaManual] = useState<number | null>(null);

  // 2. Estados Nutricionales
  const [macros, setMacros] = useState({ hco: 50, pro: 20, lip: 30 });
  const [equivalentes, setEquivalentes] = useState<Record<string, number>>({});
  const [hasGenerated, setHasGenerated] = useState(false);

  // 3. Cálculos Biológicos (IMC, GET Sugerido)
  const biometricos = useMemo(() => {
    const metros = talla / 100;
    const imc = metros > 0 ? parseFloat((peso / (metros * metros)).toFixed(1)) : 0;

    let tmb = 0;
    if (formula === "mifflin") {
      const basar = (10 * peso) + (6.25 * talla) - (5 * edad);
      tmb = genero === "H" ? basar + 5 : basar - 161;
    } else if (formula === "harris") {
      if (genero === "H") tmb = 66.5 + (13.75 * peso) + (5.003 * talla) - (6.75 * edad);
      else tmb = 655.1 + (9.563 * peso) + (1.85 * talla) - (4.676 * edad);
    } else if (formula === "valencia") {
       if (genero === "H") tmb = (13.37 * peso) + 747;
       else tmb = (11.02 * peso) + 679;
    } else {
        tmb = peso * 24; 
    }

    return { imc, tmb, gettSugerido: Math.round(tmb * actividad) };
  }, [peso, talla, edad, genero, actividad, formula]);

  // ✅ META FINAL: Prioriza la manual sobre la calculada
  const metaFinal = useMemo(() => metaManual ?? biometricos.gettSugerido, [metaManual, biometricos.gettSugerido]);

  // 💡 Limpiar meta manual si cambian datos base (opcional, para forzar recálculo)
  useEffect(() => {
    setMetaManual(null);
  }, [peso, talla, edad, genero, actividad, formula]);

  // 4. Metas de Macros en Gramos (Dependen de metaFinal)
  const metasGramos = useMemo(() => {
    return {
      kcal: metaFinal,
      hcoG: (metaFinal * (macros.hco / 100)) / 4,
      proG: (metaFinal * (macros.pro / 100)) / 4,
      lipG: (metaFinal * (macros.lip / 100)) / 9,
    };
  }, [metaFinal, macros]);

  // 5. Totales SMAE
  const totalesSMAE = useMemo(() => {
    return Object.keys(equivalentes).reduce((acc, key) => {
      const cant = equivalentes[key] || 0;
      const info = GRUPOS_SMAE[key as keyof typeof GRUPOS_SMAE];
      if (!info) return acc;
      return {
        kcal: acc.kcal + (info.kcal * cant),
        pro: acc.pro + (info.pro * cant),
        lip: acc.lip + (info.lip * cant),
        hco: acc.hco + (info.hco * cant),
      };
    }, { kcal: 0, pro: 0, lip: 0, hco: 0 });
  }, [equivalentes]);

  // 6. Funciones
  const handleMacroChange = (key: string, value: number) => {
    setMacros((prev: any) => {
      const rest = 100 - value;
      const otherKeys = Object.keys(prev).filter(k => k !== key);
      const totalOther = prev[otherKeys[0]] + prev[otherKeys[1]];
      const ratio = totalOther > 0 ? rest / totalOther : 0.5;
      
      return {
        ...prev,
        [key]: value,
        [otherKeys[0]]: Math.round(prev[otherKeys[0]] * ratio),
        [otherKeys[1]]: Math.round(prev[otherKeys[1]] * ratio)
      };
    });
  };

  const handleGenerarSMAE = () => {
    const kcal = metaFinal; // ✅ Usa la meta final (manual o sugerida)
    const propuesta = {
      verduras: 4,
      frutas: 3, 
      cerealesSG: Math.max(2, Math.round((kcal * 0.35) / 70)),
      leguminosas: 1, 
      aoaMBAG: Math.max(2, Math.round((metasGramos.proG * 0.4) / 7)),
      aoaBAG: 1, 
      lecheDescremada: 1,
      grasasSG: Math.max(2, Math.round((metasGramos.lipG * 0.6) / 5)), 
      azucaresSG: 1,
    };
    setEquivalentes(propuesta as any);
    setHasGenerated(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 p-6 animate-in fade-in duration-700">
      <PublicHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6">
          <PublicDatos 
             edad={edad} setEdad={setEdad}
             genero={genero} setGenero={setGenero}
             peso={peso} setPeso={setPeso}
             talla={talla} setTalla={setTalla}
             actividad={actividad} setActividad={setActividad}
             imc={biometricos.imc}
          />
          <PublicConfig 
             formula={formula} setFormula={setFormula}
             gett={metaFinal} 
             setGett={setMetaManual} // ✅ Pasamos el setter manual
             calculatedGett={biometricos.gettSugerido} // ✅ Pasamos el calculado para reset
             imc={biometricos.imc} edad={edad}
          />
          <PublicMacros 
             macros={macros} onMacroChange={handleMacroChange}
             metasGramos={metasGramos} gett={metaFinal}
          />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <button 
            onClick={handleGenerarSMAE}
            className={`w-full p-6 rounded-[30px] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-xl group ${
              hasGenerated ? "bg-gray-800 text-white hover:bg-black" : "bg-nutri-main text-white"
            }`}
          >
            {hasGenerated ? <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" /> : <Play size={18} fill="currentColor" />}
            {hasGenerated ? "Recalcular Distribución Automática" : "Generar Distribución SMAE"}
          </button>
          
          <PublicSMAE equivalentes={equivalentes} setEquivalentes={setEquivalentes} />
          <PublicValidation totales={totalesSMAE} metas={metasGramos} />
        </div>
      </div>
    </div>
  );
}