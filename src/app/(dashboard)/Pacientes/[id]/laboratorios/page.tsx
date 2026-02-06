"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import LaboratorioHeader from "./components/LaboratorioHeader";
import PerfilBioquimico from "./components/PerfilBioquimico";
import PerfilLipidico from "./components/PerfilLipidico";
import PerfilNutricional from "./components/PerfilNutricional";
import ExamenOrina from "./components/ExamenOrina";
import TablaLaboratorio from "./components/TablaLaboratorio";
import { useLaboratorioLogic } from "./hooks/useLaboratorioLogic";
import { toast } from "sonner";
import { guardarLaboratorioAction } from "@/lib/actions/laboratorios";
import { getHistorialCompleto } from "@/lib/actions/pacientes";
import { Beaker, Activity, Droplets, FlaskConical, ListChecks } from "lucide-react";

export default function LaboratoriosPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("tabla");
  const [ultimoEstudio, setUltimoEstudio] = useState<any>(null);

  // 🛡️ FECHA DE REGISTRO INMUTABLE: Siempre hoy
  const fecha = new Date().toISOString().split('T')[0];

  // 🧪 Hook con la lógica de diagnóstico y semáforos
  const { 
    values, 
    setValues, 
    getStatusInfo, 
    getStatusColor,
    calculos, 
    totalAlertas, 
    hasChanges 
  } = useLaboratorioLogic();

  // 🔄 CARGA DE ANTECEDENTES: Para la columna "Anterior"
  useEffect(() => {
    const cargarHistorico = async () => {
      const res = await getHistorialCompleto(id as string);
      if (res.success && res.historial?.appointments) {
        // Buscamos el estudio más reciente cargado en Hostinger
        const citaConLab = res.historial.appointments.find((c: any) => c.laboratorios);
        if (citaConLab) setUltimoEstudio(citaConLab.laboratorios);
      }
    };
    cargarHistorico();
  }, [id]);

  const handleChange = (name: string, value: string) => {
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  /**
   * 💾 GUARDADO CON CANDADO DE SEGURIDAD
   */
  const handleSave = async () => {
    // 🛡️ VALIDACIÓN: No permite registros vacíos
    if (!hasChanges) {
      toast.info("No se registran cambios en el formulario.", {
        description: "Ingresa al menos un valor de laboratorio antes de guardar.",
        icon: <Activity size={16} className="text-blue-500" />
      });
      return;
    }

    setIsSaving(true);
    try {
      const res = await guardarLaboratorioAction(id as string, values, fecha);
      if (res.success) {
        toast.success("Expediente actualizado con éxito.");
        router.push(`/dashboard/Pacientes/${id}/historia`);
      } else {
        toast.error(res.error || "Fallo al sincronizar con Hostinger.");
      }
    } catch (error) {
      toast.error("Fallo crítico en el servidor.");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "tabla", label: "Vista General", icon: ListChecks },
    { id: "bioquimico", label: "Metabólico", icon: Beaker },
    { id: "lipidico", label: "Cardiovascular", icon: Activity },
    { id: "nutricional", label: "Nutricional", icon: FlaskConical },
    { id: "orina", label: "Urinario (EGO)", icon: Droplets },
  ];

  return (
    <div className="max-w-[98%] mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      
      {/* 🔝 HEADER: Sin setFecha para evitar el error TS 2322 */}
      <LaboratorioHeader 
        id={id as string} 
        onSave={handleSave} 
        isSaving={isSaving} 
        fecha={fecha} 
        hasChanges={hasChanges}
      />

      {/* 📑 NAVEGACIÓN MODULAR */}
      <div className="flex bg-white p-2 rounded-[30px] border border-gray-100 shadow-sm w-fit mx-auto gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? "bg-gray-900 text-white shadow-lg" 
              : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* 🧪 CONTENIDO DEL MÓDULO */}
      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-500">
        {activeTab === "tabla" && (
          <TablaLaboratorio 
            values={values} 
            setValues={setValues} 
            getStatusInfo={getStatusInfo} 
            ultimoEstudio={ultimoEstudio} 
          />
        )}
        
        {activeTab === "bioquimico" && (
          <PerfilBioquimico values={values} onChange={handleChange} getStatusColor={getStatusColor} />
        )}

        {activeTab === "lipidico" && (
          <PerfilLipidico values={values} onChange={handleChange} calculos={calculos} getStatusColor={getStatusColor} />
        )}

        {activeTab === "nutricional" && (
          <PerfilNutricional values={values} onChange={handleChange} getStatusColor={getStatusColor} />
        )}

        {activeTab === "orina" && (
          <ExamenOrina values={values} onChange={handleChange} />
        )}
      </div>

      {/* 🚨 SEMÁFORO DE ALERTAS FLOTANTE */}
      {totalAlertas > 0 && (
        <div className="fixed bottom-10 right-10 bg-red-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 animate-bounce z-50">
          <Activity size={20} className="animate-pulse" />
          <span className="font-black text-xs uppercase italic">Alerta: {totalAlertas} niveles críticos detectados</span>
        </div>
      )}
    </div>
  );
}