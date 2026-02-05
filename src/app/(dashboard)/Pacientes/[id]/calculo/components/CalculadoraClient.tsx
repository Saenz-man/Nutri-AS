"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// 🪝 Hooks y Lógica
import { useDietLogic } from "../hooks/useDietLogic";
import { guardarPlanAlimenticio } from "../actions/saveDietAction";
import { GRUPOS_SMAE } from "../constants/smae";

// 🧩 Componentes Atómicos (Nuevos)
import CalculadoraHeader from "./CalculadoraHeader";
import ConfiguracionBiometrica from "./ConfiguracionBiometrica";
import TablaSMAE from "./TablaSMAE";
import ValidacionPlan from "./ValidacionPlan";
import ModalExito from "./ModalExito";

// 📊 Mini-componente para los Macros (puedes moverlo a su propio archivo después)
const CardMacronutrientes = ({ macros }: { macros: any }) => (
  <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-4">
    <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
      Distribución de Macros (%)
    </h2>
    <div className="space-y-3">
      {['hco', 'lip', 'pro'].map(m => (
        <div key={m} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase text-gray-500">{m}</span>
          <span className="text-sm font-black text-gray-800">{(macros as any)[m]}%</span>
        </div>
      ))}
    </div>
  </section>
);

export default function CalculadoraClient({ paciente }: { paciente: any }) {
  const router = useRouter();
  
  // 1. Estados Locales
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [equivalentes, setEquivalentes] = useState<Record<string, number>>({});

  // 2. Lógica del Hook Personalizado
  const { 
    peso, setPeso, talla, setTalla, edad, 
    genero, formula, setFormula, 
    actividad, setActividad, gett, metasGramos, macros 
  } = useDietLogic(paciente);

  // 3. Cálculos de Totales SMAE
  const totales = useMemo(() => {
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

  // 4. Manejadores de Eventos
  const handleAutomatic = () => {
    const kcalMeta = gett;
    const propuesta = {
      verduras: 3,
      frutas: 3,
      cerealesSG: Math.max(1, Math.round((kcalMeta * 0.3) / 70)),
      cerealesCG: 1,
      leguminosas: 1,
      aoaMBAG: Math.max(1, Math.round((metasGramos.proG * 0.4) / 7)),
      aoaBAG: 2,
      aoaAAG: 0,
      lecheDescremada: 1,
      lecheEntera: 0,
      aceitesSP: Math.max(1, Math.round((metasGramos.lipG * 0.5) / 5)),
      aceitesCP: 1,
      azucaresSG: 1,
    };
    setEquivalentes(propuesta);
  };

  const handleSave = async () => {
    const appointmentId = paciente.appointments?.[0]?.id;
    if (!appointmentId) return; 

    setIsSaving(true);
    const payload = {
      metas: { kcal: gett, macros },
      distribucionSMAE: equivalentes,
      biometricos: { peso, talla, edad, formula, actividad }
    };

    const result = await guardarPlanAlimenticio(appointmentId, payload);
    setIsSaving(false);

    if (result.success) {
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 p-6 animate-in fade-in duration-700">
      
      <CalculadoraHeader 
        id={paciente.id} 
        onSave={handleSave} 
        isSaving={isSaving} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="space-y-6">
          <ConfiguracionBiometrica 
            paciente={paciente} 
            peso={peso} setPeso={setPeso} 
            talla={talla} setTalla={setTalla}
            formula={formula} setFormula={setFormula}
            actividad={actividad} setActividad={setActividad}
            gett={gett}
            handleAutomatic={handleAutomatic}
          />
          <CardMacronutrientes macros={macros} />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <TablaSMAE 
            equivalentes={equivalentes} 
            setEquivalentes={setEquivalentes} 
          />
          <ValidacionPlan 
            totales={totales} 
            metas={metasGramos} 
          />
        </div>
      </div>

      <ModalExito 
        show={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
        pacienteId={paciente.id} 
      />
    </div>
  );
}