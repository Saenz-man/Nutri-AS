"use server";

import { db } from "@/lib/db"; // ✅ Importación de la base de datos
import { auth } from "@/auth"; // ✅ Importación de autenticación
import { revalidatePath } from "next/cache"; // ✅ Importación para limpiar caché

/**
 * 🔍 VERIFICAR EXISTENCIA POR DÍA
 * Exportada para que page.tsx pueda usarla.
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
        fechaHora: {
          gte: inicioDia,
          lte: finDia
        }
      }
    }
  });

  return { existe: !!existente };
};

/**
 * 💾 GUARDAR MEDICIÓN COMPLETA
 * Incluye sanitización para evitar errores de String vs Float en Prisma 6.
 */
export const guardarMedicionAction = async (pacienteId: string, data: any, fecha: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  const sanitizedData: any = {};
  const numericFields = [
    'peso', 'talla', 'tallaSentado', 'envergadura', 
    'triceps', 'subescapular', 'biceps', 'crestaIliaca', 
    'supraespinal', 'abdominal', 'muslo', 'pierna',
    'grasaEquipo','musculo', 'agua', 'grasaVisceral', 'masaOsea',
    'imc', 'icc', 'cintura', 'cadera', 'brazoR', 'brazoC', 
    'piernaCirc', 'estiloideo', 'femur', 'humero'
  ];

  numericFields.forEach(field => {
    const value = data[field];
    if (value !== undefined && value !== "") {
      sanitizedData[field] = parseFloat(value);
    } else {
      sanitizedData[field] = null;
    }
  });

  if (data.edadMetabolica && data.edadMetabolica !== "") {
    sanitizedData.edadMetabolica = parseInt(data.edadMetabolica);
  } else {
    sanitizedData.edadMetabolica = null;
  }

  try {
    // 1. Crear cita técnica
    const appointment = await db.appointment.create({
      data: {
        patientId: pacienteId,
        nutritionistId: session.user.id,
        fechaHora: new Date(fecha),
        status: "ATENDIDA",
        motivo: "Evaluación de Composición Corporal",      }
    });

    // 2. Crear medición vinculada
    await db.medicion.create({
      data: {
        ...sanitizedData,
        appointmentId: appointment.id
      }
    });

    // ✅ 3. ACTUALIZACIÓN GLOBAL DEL PACIENTE
    // Guardamos la talla en el perfil principal para que el IMC no sea 0.0
    if (sanitizedData.talla) {
      await db.patient.update({
        where: { id: pacienteId },
        data: { talla: sanitizedData.talla }
      });
    }

    revalidatePath(`/dashboard/pacientes/${pacienteId}/historia`);
    revalidatePath(`/dashboard/pacientes/${pacienteId}`); // Refrescamos el perfil
    revalidatePath("/dashboard/pacientes");
    
    return { success: true };
  } catch (error) {
    console.error("❌ Error en Hostinger:", error);
    return { error: "Error al guardar los datos numéricos." };
  }
};