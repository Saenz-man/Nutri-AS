"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * 🛠️ 1. FUNCIÓN AUXILIAR: SANITIZACIÓN Y LIMPIEZA
 * Esta función procesa el objeto 'data' crudo del formulario. 
 * Convierte strings a números (float/int), maneja valores vacíos como null
 * y aplica la corrección de llaves únicas para 'pierna'.
 */
const sanitizeMedicionData = (data: any) => {
  const sanitized: any = {};
  
  // Listado oficial de campos numéricos del esquema Nutri-AS
  const numericFields = [
    'peso', 'talla', 'tallaSentado', 'envergadura', 
    'triceps', 'subescapular', 'biceps', 'crestaIliaca', 
    'supraespinal', 'abdominal', 'muslo', 
    'piernaPaniculo', // ✅ Independiente: Panículo (mm)
    'grasaEquipo', 'musculo', 'agua', 'grasaVisceral', 'masaOsea',
    'imc', 'icc', 'cintura', 'cadera', 'brazoR', 'brazoC', 
    'piernaCirc',    // ✅ Independiente: Circunferencia (cm)
    'estiloideo', 'femur', 'humero'
  ];

  numericFields.forEach(field => {
    const value = data[field];
    if (value !== undefined && value !== "" && value !== null) {
      const parsedValue = parseFloat(value);
      sanitized[field] = isNaN(parsedValue) ? null : parsedValue;
    } else {
      sanitized[field] = null;
    }
  });

  // Manejo específico para enteros (Edad Metabólica)
  if (data.edadMetabolica !== undefined && data.edadMetabolica !== "") {
    sanitized.edadMetabolica = parseInt(data.edadMetabolica) || null;
  }

  return sanitized;
};

/**
 * 🔍 2. VERIFICAR EXISTENCIA POR DÍA
 * Consulta si el paciente ya tiene una medición en la fecha actual.
 * Devuelve 'datos' para que el frontend pueda auto-completar el formulario
 * y activar el Modo Edición.
 */
export const checkMedicionDia = async (pacienteId: string, fecha: string) => {
  try {
    const inicioDia = new Date(fecha + "T00:00:00Z");
    const finDia = new Date(fecha + "T23:59:59Z");

    const medicion = await db.medicion.findFirst({
      where: {
        appointment: { patientId: pacienteId },
        createdAt: { gte: inicioDia, lte: finDia }
      }
    });

    // Retornamos 'datos' para resolver el error TS 2339
    return { existe: !!medicion, datos: medicion || null };
  } catch (error) {
    console.error("❌ Error checkMedicionDia:", error);
    return { existe: false, error: "Fallo al consultar registro previo." };
  }
};

/**
 * 💾 3. GUARDAR NUEVA MEDICIÓN
 * Crea una cita ('Appointment') y vincula los datos de composición corporal.
 * También actualiza la talla global en el perfil del paciente.
 */
export const guardarMedicionAction = async (pacienteId: string, data: any, fecha: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  const sanitizedData = sanitizeMedicionData(data);

  try {
    // 1. Generamos la cita técnica para el historial
    const appointment = await db.appointment.create({
      data: {
        patientId: pacienteId,
        nutritionistId: session.user.id,
        fechaHora: new Date(fecha),
        status: "ATENDIDA",
        motivo: "Evaluación Antropométrica",
      }
    });

    // 2. Creamos el registro de medición vinculado
    await db.medicion.create({
      data: { 
        ...sanitizedData, 
        appointmentId: appointment.id 
      }
    });

    // 3. Sincronizamos la talla en el expediente principal
    if (sanitizedData.talla) {
      await db.patient.update({
        where: { id: pacienteId },
        data: { talla: sanitizedData.talla }
      });
    }

    revalidatePath(`/dashboard/pacientes/${pacienteId}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error guardarMedicionAction:", error);
    return { error: "No se pudo crear el registro en Hostinger." };
  }
};

/**
 * 🔄 4. ACTUALIZAR MEDICIÓN EXISTENTE
 * Busca el registro del día y sobreescribe los valores.
 * Resuelve el error TS 2724 al exportar la acción correctamente.
 */
export const actualizarMedicionAction = async (pacienteId: string, data: any, fecha: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  const sanitizedData = sanitizeMedicionData(data);

  try {
    const inicioDia = new Date(fecha + "T00:00:00Z");
    const finDia = new Date(fecha + "T23:59:59Z");

    // Localizamos el registro de hoy
    const registroPrevio = await db.medicion.findFirst({
      where: {
        appointment: { patientId: pacienteId },
        createdAt: { gte: inicioDia, lte: finDia }
      }
    });

    if (!registroPrevio) return { error: "No se encontró el registro para actualizar." };

    // Actualizamos con los nuevos cálculos de Siri/Von Döbeln
    await db.medicion.update({
      where: { id: registroPrevio.id },
      data: sanitizedData
    });

    revalidatePath(`/dashboard/pacientes/${pacienteId}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error actualizarMedicionAction:", error);
    return { error: "Error al actualizar los datos biométricos." };
  }
};