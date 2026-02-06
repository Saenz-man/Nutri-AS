"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MedicionesHeader from "./components/MedicionesHeader";
import AntropometriaIsak from "./components/AntropometriaIsak";
import Bioimpedancia from "./components/Bioimpedancia";
import Complementarias from "./components/Complementarias";
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
  const [isEditing, setIsEditing] = useState(false); // Determina si guardamos o actualizamos
  const [edadPaciente, setEdadPaciente] = useState(0);

  // --- 🛡️ BLOQUEO DE FECHA (Time-Lock) ---
  // La fecha es inmutable: solo el día transcurriendo
  const fecha = new Date().toISOString().split('T')[0];

  // --- 🧠 HOOK DE INTELIGENCIA NUTRICIONAL ---
  const { 
    values, 
    setValues, 
    calculos, 
    handleChange, 
    ejecutarFormulasCientificas 
  } = useCalculosNutri(edadPaciente);

  /**
   * 🎂 1. SINCRONIZACIÓN DE EDAD
   * Carga la edad desde Hostinger para que las fórmulas ISAK sean precisas.
   */
  useEffect(() => {
    if (id) {
      getPacienteById(id as string).then(res => {
        if (res.success && res.paciente.fechaNacimiento) {
          setEdadPaciente(calcularEdad(res.paciente.fechaNacimiento));
        }
      });
    }
  }, [id]);

  /**
   * 🔍 2. MODO ESPEJO: DETECTOR DE REGISTROS
   * Si Dana ya tiene una medición hoy, hidratamos el formulario con sus datos.
   */
  useEffect(() => {
    const verificarRegistroHoy = async () => {
      const res = await checkMedicionDia(id as string, fecha);
      
      if (res.existe && res.datos) {
        setIsEditing(true);
        // Cargamos los datos previos para permitir la edición
        setValues(res.datos); 
        toast.info("Registro previo detectado. Los cambios se actualizarán sobre el registro de hoy.");
      } else {
        setIsEditing(false);
      }
    };
    verificarRegistroHoy();
  }, [fecha, id, setValues]);

  /**
   * 💾 3. PERSISTENCIA EN HOSTINGER
   * Decide si crea una nueva cita técnica o actualiza la existente.
   */
  const handleSave = async (): Promise<void> => {
    // Validación básica de seguridad
    if (!values.peso || !values.talla) {
      toast.error("Peso y Talla son obligatorios para el diagnóstico.");
      return;
    }

    setIsSaving(true);
    try {
      // Combinamos valores del formulario con cálculos automáticos (Siri/Von Döbeln)
      const payload = { ...values, ...calculos };
      
      let res;
      if (isEditing) {
        // 🔄 Actualización de registro existente
        res = await actualizarMedicionAction(id as string, payload, fecha);
      } else {
        // 🆕 Creación de nuevo registro
        res = await guardarMedicionAction(id as string, payload, fecha);
      }
      
      if (res.success) {
        toast.success(isEditing ? "Expediente actualizado correctamente." : "Medición guardada con éxito.");
        router.push(`/dashboard/pacientes/${id}`); 
      } else {
        toast.error(res.error || "Fallo en la comunicación con la base de datos.");
      }
    } catch (error) {
      toast.error("Error crítico de red.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      
      {/* 🔝 CABECERA: Sin setFecha para mantener el bloqueo de integridad */}
      <MedicionesHeader 
        id={id as string} 
        onSave={handleSave} 
        isSaving={isSaving}
        fecha={fecha}
        isEditing={isEditing} 
      />

      {/* 📏 SECCIÓN ISAK: Panículos (Usa 'piernaPaniculo') */}
      <AntropometriaIsak 
        values={values} 
        handleChange={handleChange} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ⚡ BIOIMPEDANCIA: Cálculos de Grasa y Músculo */}
        <Bioimpedancia 
          formData={values} 
          handleChange={handleChange} 
          onCalcular={ejecutarFormulasCientificas} 
        />

        {/* 🔄 COMPLEMENTARIAS: Circunferencias (Usa 'piernaCirc') */}
        <Complementarias 
          formData={values} 
          handleChange={handleChange} 
          resultados={calculos} 
        />
      </div>
    </div>
  );
}