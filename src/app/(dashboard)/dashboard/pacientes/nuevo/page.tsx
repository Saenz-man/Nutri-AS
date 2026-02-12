"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PacienteSchema } from "@/schemas/paciente.schema";
import { registrarPaciente, generarExpedienteAuto } from "@/lib/actions/pacientes";
import { toast } from "sonner";

// Iconos e Imagenes
import { 
  User, Heart, Activity, ArrowLeft, 
  ChevronLeft, ChevronRight, Save 
} from "lucide-react";

// Componentes Modulares
import StepGeneralData from "./step-general-data";
import StepMedicalHistory from "./step-medical-history";
import StepExploration from "./step-exploration";
import SuccessModal from "./success-modal";
import DuplicateModal from "./DuplicateModal";

export default function NuevoPacientePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // 🕵️ LOG 1: Monitor de sesión en tiempo real para producción
  useEffect(() => {
    console.log("🔍 [CLIENT] Estado de sesión (status):", status);
    if (status === "authenticated") {
      console.log("👤 [CLIENT] Usuario autenticado:", session?.user?.email);
    }
  }, [status, session]);

  const [step, setStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(PacienteSchema),
    defaultValues: {
      cirugias: "false",
      antecedentesFamiliares: [],
      patologicosPersonales: []
    }
  });

  // Generación automática de expediente
  useEffect(() => {
    const fetchExpediente = async () => {
      try {
        const proximo = await generarExpedienteAuto();
        setValue("expediente", proximo);
      } catch (err) {
        console.error("❌ Error al generar expediente:", err);
      }
    };
    fetchExpediente();
  }, [setValue]);

  // ✅ CORRECCIÓN: Redirección mediante useEffect para evitar el "kick" al login
  useEffect(() => {
    if (status === "unauthenticated") {
      console.error("🚨 [CLIENT] Redirigiendo: Sesión no encontrada en el cliente.");
      router.push("/login");
    }
  }, [status, router]);

  // Pantalla de carga inicial (Solo una vez para evitar errores de TS)
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center font-bold text-nutri-main animate-pulse">
        Verificando sesión...
      </div>
    );
  }

  const onSubmit = async (data: any) => {
    console.log("🚀 [CLIENT] Iniciando envío de formulario...", data);
    try {
      // ✅ Forzamos tipo 'any' para evitar errores de tipado con .max en el build
      const result = await registrarPaciente(data) as any;

      console.log("✅ [CLIENT] Respuesta de registrarPaciente:", result);

      if (result.error === "DUPLICATE_PATIENT") {
        setShowDuplicateModal(true);
      } else if (result.error === "LIMIT_REACHED") {
        toast.error(`Límite alcanzado: ${result.max} pacientes.`);
      } else if (result.success) {
        console.log("🎉 [CLIENT] Guardado exitoso, mostrando modal.");
        setShowSuccessModal(true);
      } else {
        console.warn("⚠️ [CLIENT] El servidor devolvió un error:", result.error);
        toast.error(result.error || "Error al guardar el paciente");
      }
    } catch (error) {
      console.error("🔥 [CLIENT] Error crítico en la petición:", error);
      toast.error("Error de conexión con el servidor");
    }
  };

  const onError = (formErrors: any) => {
    console.warn("⚠️ [CLIENT] Errores de validación en el formulario:", formErrors);
    toast.error("Por favor, completa todos los campos requeridos.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* CABECERA */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => router.back()}
            className="p-3 rounded-2xl border border-gray-100 bg-white text-gray-400 hover:text-nutri-main transition-all group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-display">Alta de Paciente</h1>
            <p className="text-gray-500 font-bold mt-1">Historia Clínica Digital - {session?.user?.name}</p>
          </div>
        </div>
      </div>

      {/* PROGRESO */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-4xl shadow-sm border border-gray-100">
        {[
          { id: 1, label: "Generales", icon: User },
          { id: 2, label: "Antecedentes", icon: Heart },
          { id: 3, label: "Exploración", icon: Activity },
        ].map((s, index, array) => (
          <div key={s.id} className="flex items-center gap-3 flex-1 last:flex-none">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${step === s.id ? 'bg-nutri-main text-white scale-110 shadow-lg' : step > s.id ? 'bg-nutri-main/10 text-nutri-main' : 'bg-gray-50 text-gray-300'}`}>
              {step > s.id ? "✓" : <s.icon size={22} />}
            </div>
            {index !== array.length - 1 && (
              <div className="flex-1 h-1 bg-gray-100 rounded-full mx-2 overflow-hidden">
                <div className="h-full bg-nutri-main transition-all duration-700" style={{ width: step > s.id ? '100%' : '0%' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
        {step === 1 && <StepGeneralData register={register} errors={errors} photoPreview={photoPreview} setPhotoPreview={setPhotoPreview} />}
        {step === 2 && <StepMedicalHistory register={register} watchCirugias={watch("cirugias")} />}
        {step === 3 && <StepExploration register={register} errors={errors} />}

        {/* NAVEGACIÓN */}
        <div className="flex items-center justify-between pt-10 border-t border-gray-100">
          <button 
            type="button" 
            disabled={step === 1 || isSubmitting}
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 font-bold text-gray-400 hover:text-nutri-main disabled:opacity-0 transition-all"
          >
            <ChevronLeft size={24} /> Anterior
          </button>

          <div className="flex items-center gap-4">
            {step < 3 ? (
              <button 
                type="button" 
                onClick={() => setStep(step + 1)}
                className="bg-nutri-main text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-green-500/20"
              >
                Siguiente Paso <ChevronRight size={22} />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-nutri-orange text-white px-14 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50"
              >
                <Save size={22} /> {isSubmitting ? "Guardando..." : "Finalizar Alta"}
              </button>
            )}
          </div>
        </div>
      </form>

      <SuccessModal isOpen={showSuccessModal} />
      <DuplicateModal isOpen={showDuplicateModal} onClose={() => setShowDuplicateModal(false)} />
    </div>
  );
}