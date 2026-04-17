"use client";

import { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PacienteSchema } from "@/schemas/paciente.schema";
import { registrarPaciente, generarExpedienteAuto } from "@/lib/actions/pacientes";
import { toast } from "sonner";

// Iconos e Imagenes
import { 
  User, Heart, Activity, ArrowLeft, 
  ChevronLeft, ChevronRight, Save, Utensils   
} from "lucide-react";

// Componentes Modulares
import StepGeneralData from "./step-general-data";
import StepMedicalHistory from "./step-medical-history";
import StepHabits from "./step-habits"; 
import StepExploration from "./step-exploration";
import SuccessModal from "./success-modal";
import DuplicateModal from "./DuplicateModal";

// 📖 Diccionario de traducción de campos técnicos a nombres humanos
const etiquetasCampos: Record<string, string> = {
  nombre: "Nombre",
  apellido: "Apellido",
  email: "Correo electrónico",
  telefono: "Teléfono",
  fechaNacimiento: "Fecha de Nacimiento",
  sexo: "Sexo",
  expediente: "Número de Expediente",
  talla: "Estatura/Talla",
  motivoConsulta: "Motivo de Consulta",
  antecedentesFamiliares: "Antecedentes Familiares",
  patologicosPersonales: "Antecedentes Patológicos",
  cirugias: "Cirugías",
  diagnosticoNutricional: "Diagnóstico Nutricional",
  comidasAlDia: "Comidas al día",
  hidratacionAgua: "Consumo de agua",
  // Agrega más si tu esquema tiene otros campos obligatorios
};

export default function NuevoPacientePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Monitor de sesión
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const [step, setStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(PacienteSchema),
    defaultValues: {
      cirugias: "false",
      antecedentesFamiliares: [],
      patologicosPersonales: [],
      alergiasAlimentarias: "false", 
      suplementos: "false",
      seSaltaComidas: "false",
      otrasSustancias: "false",
      cafeina: "false"
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

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center font-bold text-nutri-main animate-pulse">
        Verificando sesión...
      </div>
    );
  }

  const onSubmit = async (data: any) => {
    try {
      const result = await registrarPaciente(data) as any;

      if (result.error === "DUPLICATE_PATIENT") {
        setShowDuplicateModal(true);
      } else if (result.error === "LIMIT_REACHED") {
        toast.error(`Límite alcanzado: ${result.max} pacientes.`);
      } else if (result.success) {
        setShowSuccessModal(true);
      } else {
        toast.error(result.error || "Error al guardar el paciente");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor");
    }
  };

  // ✅ CORRECCIÓN: Función que detecta qué campos faltan y los muestra en el Toast
  const onError = (formErrors: FieldErrors) => {
    const camposFaltantes = Object.keys(formErrors)
      .map((key) => etiquetasCampos[key] || key) // Usa la traducción o el nombre técnico si no existe
      .join(", ");

    toast.error(`Faltan campos obligatorios: ${camposFaltantes}`, {
      description: "Por favor, revisa todos los pasos del formulario.",
      duration: 5000,
    });

    console.log("❌ Errores de validación detectados:", formErrors);
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
      <div className="flex items-center gap-4 bg-white p-6 rounded-4xl shadow-sm border border-gray-100 overflow-x-auto">
        {[
          { id: 1, label: "Generales", icon: User },
          { id: 2, label: "Clínica", icon: Heart },
          { id: 3, label: "Hábitos", icon: Utensils },
          { id: 4, label: "Exploración", icon: Activity },
        ].map((s, index, array) => (
          <div key={s.id} className="flex items-center gap-3 flex-1 last:flex-none min-w-fit">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${step === s.id ? 'bg-nutri-main text-white scale-110 shadow-lg' : step > s.id ? 'bg-nutri-main/10 text-nutri-main' : 'bg-gray-50 text-gray-300'}`}>
              {step > s.id ? "✓" : <s.icon size={22} />}
            </div>
            {index !== array.length - 1 && (
              <div className="flex-1 h-1 bg-gray-100 rounded-full mx-2 overflow-hidden min-w-[20px] hidden md:block">
                <div className="h-full bg-nutri-main transition-all duration-700" style={{ width: step > s.id ? '100%' : '0%' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
        {step === 1 && (
          <StepGeneralData 
            register={register} 
            errors={errors} 
            photoPreview={photoPreview} 
            setPhotoPreview={setPhotoPreview} 
          />
        )}
        {step === 2 && (
          <StepMedicalHistory 
            register={register} 
            watchCirugias={watch("cirugias")} 
          />
        )}
        {step === 3 && (
          <StepHabits 
            register={register} 
            watch={watch} 
            errors={errors} 
          />
        )}
        {step === 4 && (
          <StepExploration 
            register={register} 
            errors={errors} 
          />
        )}

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
            {step < 4 ? (
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