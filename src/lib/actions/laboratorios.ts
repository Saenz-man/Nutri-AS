"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * 🔬 GUARDAR ESTUDIOS DE LABORATORIO
 * Sigue la misma lógica de sanitización que las mediciones
 */
export const guardarLaboratorioAction = async (pacienteId: string, data: any, fecha: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  // 🧹 1. Sanitización de Campos Numéricos (Bioquímico y Lipídico)
  const sanitizedData: any = {};
  
  const numericFields = [
    'sodio', 'potasio', 'cloro', 'bicarbonato', 'coTotal', 
    'acidoUrico', 'glucosaAyuno', 'glucosa1hr', 'glucosa2hr', 
    'hbGlucosilada', 'creatinina', 'urea', 'albumina', 
    'calcioTotal', 'fosforo', 'colesterolTotal', 'hdl', 
    'ldl', 'vldl', 'trigliceridos', 'lipidosTotales', 
    'ph', 'indiceAterogenico'
  ];

  numericFields.forEach(field => {
    const value = data[field];
    // Convertimos a Float o null para cumplir con el Schema de Prisma 6
    if (value !== undefined && value !== "" && value !== null) {
      sanitizedData[field] = parseFloat(value);
    } else {
      sanitizedData[field] = null;
    }
  });

  // 🚽 2. Sanitización de Campos de Texto (EGO Selectores)
  const textFieldEGO = ['proteinas', 'glucosaOrina', 'cetona', 'sangre', 'bilirrubina', 'nitritos', 'sedimento'];
  
  textFieldEGO.forEach(field => {
    sanitizedData[field] = data[field] || "Negativo";
  });

  try {
    // 📅 3. Crear o buscar la cita para este día
    const appointment = await db.appointment.create({
      data: {
        patientId: pacienteId,
        nutritionistId: session.user.id,
        fechaHora: new Date(fecha),
        status: "ATENDIDA",
        motivo: "Carga de Estudios de Laboratorio",
      }
    });

    // 💾 4. Insertar en la tabla Laboratorio vinculada a la cita
    await db.laboratorio.create({
      data: {
        ...sanitizedData,
        appointmentId: appointment.id
      }
    });

    // 🔄 5. Limpiar caché para ver los cambios en el historial
    revalidatePath(`/dashboard/Pacientes/${pacienteId}/historia`);
    revalidatePath("/dashboard/Pacientes");
    
    return { success: true };
  } catch (error) {
    console.error("❌ Error al guardar laboratorios en Hostinger:", error);
    return { error: "Error de comunicación con la base de datos." };
  }
};