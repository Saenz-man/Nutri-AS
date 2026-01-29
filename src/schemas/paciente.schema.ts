import { z } from "zod";

export const PacienteSchema = z.object({
  // Paso 1: Datos Generales
  nombre: z.string().min(2, "El nombre es obligatorio"),
  apellido: z.string().min(2, "El apellido es obligatorio"),
  fechaNacimiento: z.string().min(1, "La fecha es obligatoria"),
  telefono: z.string().length(10, "El teléfono debe tener 10 dígitos"),
  expediente: z.string().min(1, "El número de expediente es requerido"),
  motivoConsulta: z.string().min(5, "Por favor, detalla el motivo de la consulta"),

  // Paso 2: Antecedentes
  antecedentesFamiliares: z.array(z.string()).default([]),
  patologicosPersonales: z.array(z.string()).default([]),
  otrasEnfermedades: z.string().optional(),
  cirugias: z.string().default("false"),
  cirugiasDetalle: z.string().optional(),

  // Paso 3: Estilo de Vida y Diagnóstico
  alergiasMedicamentos: z.string().optional(),
  suplementos: z.string().optional(),
  diagnosticoNutricional: z.string().min(5, "El diagnóstico es obligatorio"),
});