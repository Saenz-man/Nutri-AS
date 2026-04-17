import { z } from "zod";

export const PacienteSchema = z.object({
  // Paso 1: Datos Generales
  nombre: z.string().min(2, "El nombre es obligatorio"),
  apellido: z.string().min(2, "El apellido es obligatorio"),
  fechaNacimiento: z.string().min(1, "La fecha es obligatoria"),
  telefono: z.string().length(10, "El teléfono debe tener 10 dígitos"),
  expediente: z.string().min(1, "El número de expediente es requerido"),
  sexo: z.string().min(1, "El sexo es obligatorio"),
  email: z.string().email("Correo inválido").optional().or(z.literal("")),
  motivoConsulta: z.string().min(5, "Por favor, detalla el motivo de la consulta"),

  // Paso 2: Antecedentes
  antecedentesFamiliares: z.array(z.string()).default([]),
  patologicosPersonales: z.array(z.string()).default([]),
  cirugias: z.string().default("false"),
  cirugiasDetalle: z.string().optional(),

  // Paso 3: Hábitos y Preferencias Alimentarias (NUEVO)
  gustosAlimentarios: z.string().optional(),
  disgustosAlimentarios: z.string().optional(),
  alergiasAlimentarias: z.string().default("false"),
  alergiasDetalle: z.string().optional(),
  intolerancias: z.string().optional(),
  suplementos: z.string().default("false"),
  suplementosDetalle: z.string().optional(),
  comidasAlDia: z.string().optional(),
  seSaltaComidas: z.string().default("false"),
  seSaltaComidasDetalle: z.string().optional(),
  motivoComer: z.string().optional(),
  frecuenciaComidaFuera: z.string().optional(),
  hidratacionAgua: z.string().optional(),
  hidratacionOtros: z.string().optional(),

  // Toxicomanías y Conducta
  tabaco: z.string().optional(),
  tabacoCantidad: z.string().optional(),
  alcohol: z.string().optional(),
  alcoholCantidad: z.string().optional(),
  otrasSustancias: z.string().default("false"),
  otrasSustanciasDetalle: z.string().optional(),
  otrasSustanciasFrecuencia: z.string().optional(),
  cafeina: z.string().default("false"),
  cafeinaCantidad: z.string().optional(),
  observacionesConductuales: z.string().optional(),

  // Frecuencia de Consumo (Objeto JSON)
frecuenciaConsumo: z.record(z.string(), z.string()).optional(),
  // Paso 4: Exploración y Diagnóstico
exploracion: z.record(z.string(), z.string()).optional(),
  diagnosticoNutricional: z.string().min(5, "El diagnóstico es obligatorio"),
});