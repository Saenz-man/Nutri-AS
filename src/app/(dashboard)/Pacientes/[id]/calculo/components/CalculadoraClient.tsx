"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PDFDownloadLink } from '@react-pdf/renderer';

// 🪝 Hooks y Lógica
import { useDietLogic } from "../hooks/useDietLogic";
import { guardarPlanCompleto } from "../actions/saveDietAction"; 
import { GRUPOS_SMAE } from "../../../../../../constants/smae";
import { Play, RefreshCw, FileDown } from "lucide-react";

// 🧩 Componentes Atómicos
import CalculadoraHeader from "./CalculadoraHeader";
import DatosPacienteCard from "./DatosPacienteCard"; 
import ConfiguracionBiometrica from "./ConfiguracionBiometrica";
import SeccionMacros from "./SeccionMacros";
import TablaSMAE from "./TablaSMAE";
import ValidacionPlan from "./ValidacionPlan";
import ModalExito from "./ModalExito";
import PlanAlimenticioPDF from "@/components/pdf/PlanAlimenticioPDF";

export default function CalculadoraClient({ paciente }: { paciente: any }) {
  const router = useRouter();
  
  // 1. Estados Locales
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [equivalentes, setEquivalentes] = useState<Record<string, number>>({});
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // 2. Lógica del Hook Nutricional
  const { 
    peso, setPeso, talla, setTalla, edad, 
    genero, formula, setFormula, 
    actividad, setActividad, gett, metasGramos, macros, setMacros, imc 
  } = useDietLogic(paciente);

  // Evitar errores de hidratación con react-pdf
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 🔄 3. Lógica de Macros (Ajuste automático para sumar 100%)
  const handleMacroChange = (key: string, value: number) => {
    setMacros((prev: any) => {
      const rest = 100 - value;
      const otherKeys = Object.keys(prev).filter(k => k !== key);
      const totalOther = prev[otherKeys[0]] + prev[otherKeys[1]];
      const ratio = totalOther > 0 ? rest / totalOther : 0.5;
      
      return {
        ...prev, [key]: value,
        [otherKeys[0]]: Math.round(prev[otherKeys[0]] * ratio),
        [otherKeys[1]]: Math.round(prev[otherKeys[1]] * ratio)
      };
    });
  };

  // 🤖 4. Generación Inteligente SMAE
  const handleGenerarSMAE = () => {
    const kcalMeta = gett;
    const propuesta = {
      verduras: 4,
      frutas: 3, 
      cerealesSG: Math.max(2, Math.round((kcalMeta * 0.35) / 70)),
      leguminosas: 1, 
      aoaMBAG: Math.max(2, Math.round((metasGramos.proG * 0.4) / 7)),
      aoaBAG: 1, 
      lecheDescremada: 1,
      grasasSG: Math.max(2, Math.round((metasGramos.lipG * 0.6) / 5)), // ✅ Llave corregida para el PDF
      azucaresSG: 1,
    };
    setEquivalentes(propuesta as any);
    setHasGenerated(true);
  };

  // 5. Totales SMAE en tiempo real
  const totales = useMemo(() => {
    return Object.keys(equivalentes).reduce((acc, key) => {
      const cant = equivalentes[key] || 0;
      const info = GRUPOS_SMAE[key];
      if (!info) return acc;
      return {
        kcal: acc.kcal + (info.kcal * cant),
        pro: acc.pro + (info.pro * cant),
        lip: acc.lip + (info.lip * cant),
        hco: acc.hco + (info.hco * cant),
      };
    }, { kcal: 0, pro: 0, lip: 0, hco: 0 });
  }, [equivalentes]);

  // 📦 Datos preparados para el PDF

const pdfData = {
  paciente: {
    nombre: paciente.nombre,
    apellido: paciente.apellido
  },
  biometricos: {
    peso, talla, edad, imc, genero: genero.toUpperCase()
  },
  metas: {
    kcal: gett,
    macros: macros,
    metasGramos: metasGramos
  },
  distribucionSMAE: equivalentes, // ✅ Aquí pasamos los valores 6.5, 3, 7.5, etc.
  nutricionista: {
    nombre: "Edgar Uriel",
    apellido: "Saenz Bobadilla",
    cedula: "---",
    telefono: "4615976167"
  }
};

  // 6. Guardado Integral a Hostinger
  const handleSave = async () => {
    const appointmentId = paciente.appointments?.[0]?.id;
    if (!appointmentId) {
      alert("❌ No hay una cita activa para este paciente.");
      return;
    }

    setIsSaving(true);
    const result = await guardarPlanCompleto(appointmentId, {
      pacienteId: paciente.id,
      metas: { kcal: gett, macros, metasGramos },
      distribucionSMAE: equivalentes,
      biometricos: { peso, talla, imc, edad, formula, actividad, genero }
    });
    setIsSaving(false);

    if (result.success) setShowSuccessModal(true);
    else alert("⚠️ Error: " + result.error);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 p-6 animate-in fade-in duration-700">
      <CalculadoraHeader id={paciente.id} onSave={handleSave} isSaving={isSaving} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6">
          <DatosPacienteCard 
            paciente={paciente} edad={edad} genero={genero}
            peso={peso} setPeso={setPeso} talla={talla} setTalla={setTalla}
            actividad={actividad} setActividad={setActividad} imc={imc}
          />
          <ConfiguracionBiometrica formula={formula} setFormula={setFormula} gett={gett} imc={imc} edad={edad} />
          <SeccionMacros 
            macros={macros} onMacroChange={handleMacroChange} 
            metasGramos={metasGramos} gett={gett} 
            onGenerarSMAE={handleGenerarSMAE}
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
            {hasGenerated ? "Actualizar Distribución SMAE" : "Generar Distribución SMAE"}
          </button>
          <TablaSMAE equivalentes={equivalentes} setEquivalentes={setEquivalentes} />
          <ValidacionPlan totales={totales} metas={metasGramos} />
        </div>
      </div>

      <ModalExito 
        show={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
        pacienteId={paciente.id} 
        downloadLink={isClient && (
          <PDFDownloadLink 
            document={<PlanAlimenticioPDF data={pdfData} />} 
            fileName={`Plan_${paciente.apellido}_${new Date().toLocaleDateString()}.pdf`}
          >
            {({ loading }) => (
              <span className="flex items-center gap-2">
                <FileDown size={16} className="text-nutri-main" />
                {loading ? "Generando..." : "Descargar en PDF"}
              </span>
            )}
          </PDFDownloadLink>
        )}
      />
    </div>
  );
}