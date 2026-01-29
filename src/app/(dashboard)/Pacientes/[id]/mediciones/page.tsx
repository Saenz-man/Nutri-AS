"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MedicionesHeader from "./components/MedicionesHeader";
import AntropometriaIsak from "./components/AntropometriaIsak";
import Bioimpedancia from "./components/Bioimpedancia";
import Complementarias from "./components/Complementarias";
import { useCalculosNutri } from "./hooks/useCalculosNutri";
import { guardarMedicionAction, checkMedicionDia } from "@/lib/actions/mediciones";
import { toast } from "sonner";

export default function MedicionesPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

  // Hook de inteligencia nutricional ($$IMC = \frac{Peso}{Talla^2}$$)
  const { values, calculos, handleChange, validarCampo, errors } = useCalculosNutri();

  const handleSave = async () => {
  const camposLlenos = Object.values(values).filter(v => v !== "" && v !== null);
  
  if (camposLlenos.length === 0) {
    // ❌ Antes: return toast.error(...)
    toast.error("Primero llena los datos antes de guardar."); // ✅ Ahora: Sin el 'return'
    return; // Usamos un return vacío para detener la ejecución si es necesario
  }

  setIsSaving(true);

  try {
    const { existe } = await checkMedicionDia(id as string, fecha);
    
    if (existe) {
      setIsSaving(false);
      toast.warning("Ya existe una medición para este día."); // ✅ Quitamos el 'return'
      return;
    }

    const res = await guardarMedicionAction(id as string, { ...values, ...calculos }, fecha);
    
    if (res.success) {
      toast.success("Datos guardados correctamente."); // ✅ Quitamos el 'return'
      router.push(`/dashboard/pacientes/${id}/historia`); 
    } else {
      toast.error(res.error);
    }
  } catch (error) {
    toast.error("Fallo de comunicación con el servidor.");
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      {/* Cabecera con selector de fecha y botón de guardado */}
      <MedicionesHeader 
        id={id as string} 
        onSave={handleSave} 
        isSaving={isSaving}
        fecha={fecha}
        setFecha={setFecha}
      />

      {/* Bloque de las 12 mediciones (4 Básicas + 8 Panículos) */}
      <AntropometriaIsak 
        values={values} 
        handleChange={handleChange} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bloque de Bioimpedancia / Equipo */}
        <Bioimpedancia 
          formData={values} 
          handleChange={handleChange} 
        />

        {/* Bloque de Circunferencias y cálculo de ICC */}
        <Complementarias 
          formData={values} 
          handleChange={handleChange} 
          resultados={calculos} 
        />
      </div>
    </div>
  );
}