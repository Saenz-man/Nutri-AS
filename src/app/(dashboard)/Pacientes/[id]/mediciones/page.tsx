"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer"; // 👈 Para la descarga
import MedicionesHeader from "./components/MedicionesHeader";
import AntropometriaIsak from "./components/AntropometriaIsak";
import Bioimpedancia from "./components/Bioimpedancia";
import Complementarias from "./components/Complementarias";
import ModalExito from "./components/ModalExito"; // 👈 Tu nuevo modal
import MedicionesPDF from "@/components/pdf/MedicionesPDF"; // 👈 Tu nuevo formato de PDF
import { useCalculosNutri } from "./hooks/useCalculosNutri";
import { 
  guardarMedicionAction, 
  checkMedicionDia, 
  actualizarMedicionAction 
} from "@/lib/actions/mediciones"; 
import { getPacienteById } from "@/lib/actions/pacientes"; 
import { calcularEdad } from "./lib/formulas";
import { toast } from "sonner";

export default function MedicionesPage() {
  const { id } = useParams();
  const router = useRouter();

  // --- 📝 ESTADOS DE CONTROL ---
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false); // 👈 Estado para el modal
  const [pacienteData, setPacienteData] = useState<any>(null); // 👈 Datos para el PDF
  const [edadPaciente, setEdadPaciente] = useState(0);

  const fecha = new Date().toISOString().split('T')[0];

  const { 
    values, 
    setValues, 
    calculos, 
    handleChange, 
    ejecutarFormulasCientificas 
  } = useCalculosNutri(edadPaciente);

  // Carga inicial de datos del paciente
  useEffect(() => {
    if (id) {
      getPacienteById(id as string).then(res => {
        if (res.success) {
          setPacienteData(res.paciente);
          if (res.paciente.fechaNacimiento) {
            setEdadPaciente(calcularEdad(res.paciente.fechaNacimiento));
          }
        }
      });
    }
  }, [id]);

  useEffect(() => {
    const verificarRegistroHoy = async () => {
      const res = await checkMedicionDia(id as string, fecha);
      if (res.existe && res.datos) {
        setIsEditing(true);
        setValues(res.datos); 
        toast.info("Registro previo detectado.");
      } else {
        setIsEditing(false);
      }
    };
    verificarRegistroHoy();
  }, [fecha, id, setValues]);

  /**
   * 💾 PERSISTENCIA
   * Al terminar con éxito, activa el Modal de Éxito.
   */
  const handleSave = async (): Promise<void> => {
    if (!values.peso || !values.talla) {
      toast.error("Peso y Talla son obligatorios.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = { ...values, ...calculos };
      
      let res = isEditing 
        ? await actualizarMedicionAction(id as string, payload, fecha)
        : await guardarMedicionAction(id as string, payload, fecha);
      
      if (res.success) {
        toast.success(isEditing ? "Registro actualizado." : "Registro guardado.");
        setShowModal(true); // 👈 ACTIVAR MODAL EN LUGAR DE REDIRIGIR
      } else {
        toast.error(res.error || "Fallo en la comunicación.");
      }
    } catch (error) {
      toast.error("Error crítico de red.");
    } finally {
      setIsSaving(false);
    }
  };

  // Preparar la data para el PDF de Mediciones
  const dataForPdf = {
    paciente: pacienteData || {},
    biometricos: calculos,
    mediciones: { ...values, ...calculos },
    nutricionista: {
      nombre: "Edgar Uriel",
      apellido: "Saenz Bobadilla",
      cedula: "---",
      telefono: "4615976167"
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      
      <MedicionesHeader 
        id={id as string} 
        onSave={handleSave} 
        isSaving={isSaving}
        fecha={fecha}
        isEditing={isEditing} 
      />

      <AntropometriaIsak values={values} handleChange={handleChange} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Bioimpedancia 
          formData={values} 
          handleChange={handleChange} 
          onCalcular={ejecutarFormulasCientificas} 
        />

        <Complementarias 
          formData={values} 
          handleChange={handleChange} 
          resultados={calculos} 
        />
      </div>

      {/* 🟢 MODAL DE ÉXITO Y DESCARGA */}
      <ModalExito 
        show={showModal}
        onClose={() => setShowModal(false)}
        pacienteId={id}
        downloadLink={
          <PDFDownloadLink
            document={<MedicionesPDF data={dataForPdf} />}
            fileName={`Evaluacion_${pacienteData?.nombre || 'Paciente'}.pdf`}
          >
            {({ loading }) => (loading ? "Generando..." : "Descargar Reporte")}
          </PDFDownloadLink>
        }
      />
    </div>
  );
}