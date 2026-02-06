"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer"; // 👈 Para la descarga del reporte
import LaboratorioHeader from "./components/LaboratorioHeader";
import PerfilBioquimico from "./components/PerfilBioquimico";
import PerfilLipidico from "./components/PerfilLipidico";
import PerfilNutricional from "./components/PerfilNutricional";
import ExamenOrina from "./components/ExamenOrina";
import TablaLaboratorio from "./components/TablaLaboratorio";
import ModalExito from "./components/ModalExito"; // 👈 Tu nuevo modal de labs
import LaboratorioPDF from "@/components/pdf/LaboratorioPDF"; // 👈 Tu nuevo formato PDF
import { useLaboratorioLogic } from "./hooks/useLaboratorioLogic";
import { toast } from "sonner";
import { guardarLaboratorioAction } from "@/lib/actions/laboratorios";
import { getHistorialCompleto, getPacienteById } from "@/lib/actions/pacientes"; // 👈 Añadido getPacienteById
import { Beaker, Activity, Droplets, FlaskConical, ListChecks } from "lucide-react";

export default function LaboratoriosPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false); // 👈 Control del modal de éxito
  const [activeTab, setActiveTab] = useState("tabla");
  const [ultimoEstudio, setUltimoEstudio] = useState<any>(null);
  const [pacienteData, setPacienteData] = useState<any>(null); // 👈 Datos para el PDF

  // 🛡️ FECHA DE REGISTRO INMUTABLE
  const fecha = new Date().toISOString().split('T')[0];

  const { 
    values, 
    setValues, 
    getStatusInfo, 
    getStatusColor,
    calculos, 
    totalAlertas, 
    hasChanges 
  } = useLaboratorioLogic();

  // 🔄 CARGA DE DATOS DEL PACIENTE (Para el PDF)
  useEffect(() => {
    if (id) {
      getPacienteById(id as string).then(res => {
        if (res.success) setPacienteData(res.paciente);
      });
    }
  }, [id]);

  // 🔄 CARGA DE ANTECEDENTES
  useEffect(() => {
    const cargarHistorico = async () => {
      const res = await getHistorialCompleto(id as string);
      if (res.success && res.historial?.appointments) {
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
   * 💾 GUARDADO ACTUALIZADO
   */
  const handleSave = async () => {
    if (!hasChanges) {
      toast.info("No hay cambios para guardar.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await guardarLaboratorioAction(id as string, values, fecha);
      if (res.success) {
        toast.success("Expediente actualizado con éxito.");
        setShowModal(true); // 👈 EN LUGAR DE REDIRIGIR, MOSTRAMOS EL MODAL
      } else {
        toast.error(res.error || "Fallo al sincronizar.");
      }
    } catch (error) {
      toast.error("Error crítico en el servidor.");
    } finally {
      setIsSaving(false);
    }
  };

  // 📄 PREPARACIÓN DE DATOS PARA EL PDF
  const dataForPdf = {
    paciente: pacienteData || {},
    values: values,
    nutricionista: {
      nombre: "Edgar Uriel",
      apellido: "Saenz Bobadilla",
      cedula: "---",
      telefono: "4615976167"
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

      {/* 🧪 CONTENIDO */}
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

      {/* 🚨 SEMÁFORO DE ALERTAS */}
      {totalAlertas > 0 && (
        <div className="fixed bottom-10 right-10 bg-red-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 animate-bounce z-50">
          <Activity size={20} className="animate-pulse" />
          <span className="font-black text-xs uppercase italic">Alerta: {totalAlertas} niveles críticos detectados</span>
        </div>
      )}

      {/* 🟢 MODAL DE ÉXITO CON DESCARGA DE PDF */}
      <ModalExito 
        show={showModal}
        onClose={() => setShowModal(false)}
        pacienteId={id}
        downloadLink={
          <PDFDownloadLink
            document={<LaboratorioPDF data={dataForPdf} />}
            fileName={`Laboratorios_${pacienteData?.nombre || 'Paciente'}.pdf`}
          >
            {({ loading }) => (loading ? "Generando..." : "Descargar Reporte")}
          </PDFDownloadLink>
        }
      />
    </div>
  );
}