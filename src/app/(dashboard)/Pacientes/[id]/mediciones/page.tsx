"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MedicionesHeader from "./components/MedicionesHeader";
import AntropometriaIsak from "./components/AntropometriaIsak";
import Bioimpedancia from "./components/Bioimpedancia";
import Complementarias from "./components/Complementarias";
import { useCalculosNutri } from "./hooks/useCalculosNutri";
import { guardarMedicionAction, checkMedicionDia } from "@/lib/actions/mediciones";
import { getPacienteById } from "@/lib/actions/pacientes"; 
import { calcularEdad } from "./lib/formulas";
import { toast } from "sonner";

export default function MedicionesPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [edadPaciente, setEdadPaciente] = useState(0);

  /**
   * 🎂 1. CARGA AUTOMÁTICA DE EDAD
   * Obtenemos la fecha de nacimiento de Hostinger para pre-llenar la edad.
   */
  useEffect(() => {
    if (id) {
      getPacienteById(id as string).then(res => {
        if (res.success && res.paciente.fechaNacimiento) {
          const edadCalculada = calcularEdad(res.paciente.fechaNacimiento);
          setEdadPaciente(edadCalculada);
        }
      });
    }
  }, [id]);

  /**
   * 🧠 2. HOOK DE INTELIGENCIA NUTRICIONAL
   * Pasamos la edad calculada como valor inicial para las fórmulas científicas.
   */
  const { 
    values, 
    calculos, 
    handleChange, 
    ejecutarFormulasCientificas, 
    validarCampo, 
    errors 
  } = useCalculosNutri(edadPaciente);

  /**
   * 💾 3. GUARDADO CLÍNICO
   * Envía toda la composición corporal calculada al expediente del paciente.
   */
  const handleSave = async (): Promise<void> => {
    if (!values.peso || !values.talla) {
      toast.error("Peso y Talla son obligatorios para el expediente.");
      return;
    }

    setIsSaving(true);

    try {
      // Evitar duplicidad de datos en las gráficas de evolución
      const { existe } = await checkMedicionDia(id as string, fecha);
      
      if (existe) {
        setIsSaving(false);
        toast.warning("Ya existe una medición registrada para este día.");
        return;
      }

      // Guardamos en la base de datos vinculando la cita técnica
      const res = await guardarMedicionAction(id as string, { ...values, ...calculos }, fecha);
      
      if (res.success) {
        toast.success("Medición y composición corporal guardadas.");
        router.push(`/dashboard/pacientes/${id}`); 
      } else {
        toast.error(res.error || "Error al procesar el guardado.");
      }
    } catch (error) {
      toast.error("Fallo de comunicación con el servidor.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      
      {/* 🔝 CABECERA: Control de fecha y Guardado */}
      <MedicionesHeader 
        id={id as string} 
        onSave={handleSave} 
        isSaving={isSaving}
        fecha={fecha}
        setFecha={setFecha}
      />

      {/* 📏 SECCIÓN ISAK: Panículos y Medidas Básicas */}
      <AntropometriaIsak 
        values={values} 
        handleChange={handleChange} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ⚡ BIOIMPEDANCIA: Incluye el botón de Cálculo Científico */}
        <Bioimpedancia 
          formData={values} 
          handleChange={handleChange} 
          onCalcular={ejecutarFormulasCientificas} 
        />

        {/* 🔄 COMPLEMENTARIAS: Circunferencias, Diámetros e ICC */}
        <Complementarias 
          formData={values} 
          handleChange={handleChange} 
          resultados={calculos} 
        />
      </div>
    </div>
  );
}