"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPacienteById, actualizarPaciente, getHistorialCompleto } from "@/lib/actions/pacientes";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import ExpedienteHeader from "./components/ExpedienteHeader";
import IndicadoresClinicos from "./components/IndicadoresClinicos";
import ModulosAcceso from "./components/ModulosAcceso";
import ModalEditarPaciente from "./components/ModalEditarPaciente";

// ✅ Garantizamos que devuelva un número para el Header
const calcularEdad = (fecha: any): number => {
  if (!fecha) return 0;
  const hoy = new Date();
  const cumple = new Date(fecha);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  const m = hoy.getMonth() - cumple.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) edad--;
  return edad;
};

export default function ExpedientePacientePage() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState<any>(null);
  const [ultimaMedicion, setUltimaMedicion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 📝 Incluimos email y telefono para que sean editables
  const [editData, setEditData] = useState({ 
    nombre: "", apellido: "", email: "", telefono: "", 
    sexo: "", talla: "", fechaNacimiento: "" 
  });

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await getPacienteById(id as string);
      const hist = await getHistorialCompleto(id as string);
      
      if (res.success && res.paciente) {
        setPaciente(res.paciente);
        setEditData({
          nombre: res.paciente.nombre,
          apellido: res.paciente.apellido,
          email: res.paciente.email || "", // ✅ Editable
          telefono: res.paciente.telefono || "", // ✅ Editable
          sexo: res.paciente.sexo || "MUJER",
          talla: res.paciente.talla?.toString() || "",
          fechaNacimiento: res.paciente.fechaNacimiento ? new Date(res.paciente.fechaNacimiento).toISOString().split('T')[0] : ""
        });

        // 🔍 Lógica para encontrar la medición más reciente de Dana
        const citas = hist.historial?.appointments || [];
        const citasConDatos = [...citas].sort((a: any, b: any) => 
          new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime()
        );
        const citaActual = citasConDatos.find((c: any) => c.medicion);
        if (citaActual) setUltimaMedicion(citaActual.medicion);
      }
      setLoading(false);
    };
    cargarDatos();
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await actualizarPaciente(id as string, editData);
    if (res.success) {
      setPaciente(res.paciente);
      setIsEditModalOpen(false);
      toast.success("Expediente de Dana actualizado.");
    }
    setIsSaving(false);
  };

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-nutri-main" size={48} /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-10">
      <ExpedienteHeader 
        paciente={paciente} 
        edad={calcularEdad(paciente.fechaNacimiento)} 
        isStatusLoading={false} 
        onToggleStatus={() => {}} 
        onEdit={() => setIsEditModalOpen(true)} 
        onDelete={() => {}} 
      />

      {/* 🚀 Aquí se resuelve el error 2322 al pasar las props correctas */}
      <IndicadoresClinicos 
        ultimaMedicion={ultimaMedicion} 
        talla={paciente?.talla} 
      />

      <ModulosAcceso id={id as string} />

      <ModalEditarPaciente 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        editData={editData} 
        setEditData={setEditData} 
        onSave={handleSave} 
        isSaving={isSaving} 
      />
    </div>
  );
}