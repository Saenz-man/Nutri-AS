"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * 🔍 VERIFICAR EXISTENCIA POR DÍA
 * Evita duplicados si el nutriólogo intenta guardar dos veces el mismo día.
 */
export const checkMedicionDia = async (pacienteId: string, fecha: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  const inicioDia = new Date(fecha);
  inicioDia.setHours(0, 0, 0, 0);

  const finDia = new Date(fecha);
  finDia.setHours(23, 59, 59, 999);

  const existente = await db.medicion.findFirst({
    where: {
      appointment: {
        patientId: pacienteId,
        fechaHora: { gte: inicioDia, lte: finDia }
      }
    }
  });

  return { existe: !!existente };
};

/**
 * 💾 GUARDAR MEDICIÓN COMPLETA (MODO CIENTÍFICO)
 * Procesa pliegues, bioimpedancia y realiza cálculos automáticos.
 */
export const guardarMedicionAction = async (pacienteId: string, data: any, fecha: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  const sanitizedData: any = {};
  const numericFields = [
    'peso', 'talla', 'tallaSentado', 'envergadura', 
    'triceps', 'subescapular', 'biceps', 'crestaIliaca', 
    'supraespinal', 'abdominal', 'muslo', 'pierna',
    'grasaEquipo', 'musculo', 'agua', 'grasaVisceral', 'masaOsea',
    'imc', 'icc', 'cintura', 'cadera', 'brazoR', 'brazoC', 
    'piernaCirc', 'estiloideo', 'femur', 'humero'
  ];

  // 1. Sanitización de datos (Conversión a Float y manejo de NaN)
  numericFields.forEach(field => {
    const value = data[field];
    if (value !== undefined && value !== "" && value !== null) {
      const parsedValue = parseFloat(value);
      sanitizedData[field] = isNaN(parsedValue) ? null : parsedValue;
    } else {
      sanitizedData[field] = null;
    }
  });

  // 2. 🧬 LÓGICA DE CÁLCULO AUTOMÁTICO (SIRI)
  // Si falta el valor del equipo, calculamos %GC por suma de 4 pliegues
  if (!sanitizedData.grasaEquipo && sanitizedData.triceps && sanitizedData.subescapular && sanitizedData.biceps && sanitizedData.crestaIliaca) {
    const suma4 = sanitizedData.triceps + sanitizedData.subescapular + sanitizedData.biceps + sanitizedData.crestaIliaca;
    
    // Densidad corporal (Fórmula de Durnin & Womersley)
    const densidad = 1.1599 - (0.0717 * Math.log10(suma4)); 
    
    // Ecuación de Siri: ((4.95 / D) - 4.50) * 100
    const grasaSiri = ((4.95 / densidad) - 4.50) * 100;
    sanitizedData.grasaEquipo = parseFloat(grasaSiri.toFixed(2));
  }

  // 3. Edad Metabólica (Conversión a Int)
  if (data.edadMetabolica && data.edadMetabolica !== "") {
    const parsedEdad = parseInt(data.edadMetabolica);
    sanitizedData.edadMetabolica = isNaN(parsedEdad) ? null : parsedEdad;
  } else {
    sanitizedData.edadMetabolica = null;
  }

  try {
    // 1. Crear cita técnica en Hostinger
    const appointment = await db.appointment.create({
      data: {
        patientId: pacienteId, // ✅ CORRECCIÓN TS 2552: Nombre consistente
        nutritionistId: session.user.id,
        fechaHora: new Date(fecha),
        status: "ATENDIDA",
        motivo: "Evaluación de Composición Corporal",
      }
    });

    // 2. Crear registro de medición técnica
    await db.medicion.create({
      data: {
        ...sanitizedData,
        appointmentId: appointment.id
      }
    });

    // 3. Actualizar talla en el expediente del paciente
    if (sanitizedData.talla) {
      await db.patient.update({
        where: { id: pacienteId },
        data: { talla: sanitizedData.talla }
      });
    }

    // 🔄 Revalidar para actualizar indicadores en el MacBook Pro
    revalidatePath(`/dashboard/pacientes/${pacienteId}`);
    revalidatePath(`/dashboard/pacientes/${pacienteId}/historia`);
    
    return { success: true };
  } catch (error) {
    console.error("❌ Error en Hostinger:", error);
    return { error: "Error al guardar los datos numéricos." };
  }
};