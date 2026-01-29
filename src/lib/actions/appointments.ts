"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { startOfDay, endOfDay, addDays } from "date-fns";

/**
 * 📊 OBTENER SESIONES FILTRADAS POR TEMPORALIDAD
 * Separa estrictamente el "Hoy" del "Mañana en adelante".
 */
export const getDashboardSessions = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("No autorizado");

  const now = new Date();

  // 1. SESIONES DEL DÍA PRESENTE (00:00:00 a 23:59:59 de hoy)
  const hoy = await db.appointment.findMany({
    where: {
      nutritionistId: userId,
      fechaHora: { 
        gte: startOfDay(now), 
        lte: endOfDay(now) 
      },
      NOT: { status: "CANCELADA" } // No mostramos lo cancelado
    },
    include: { patient: true },
    orderBy: { fechaHora: "asc" },
  });

  // 2. PRÓXIMAS SESIONES (A partir de las 00:00:00 de mañana)
  const proximas = await db.appointment.findMany({
    where: {
      nutritionistId: userId,
      fechaHora: { 
        gt: endOfDay(now) // Todo lo que sea estrictamente después de hoy
      },
      NOT: { status: "CANCELADA" }
    },
    take: 10,
    include: { patient: true },
    orderBy: { fechaHora: "asc" },
  });

  return { hoy, proximas };
};

/**
 * 📅 AGENDAR CITA
 */
export const agendarCita = async (patientId: string, fecha: string, hora: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    const fechaHora = new Date(`${fecha}T${hora}`);
    const nuevaCita = await db.appointment.create({
      data: {
        fechaHora,
        patientId,
        nutritionistId: session.user.id,
        status: "PENDIENTE",
        motivo: "Seguimiento",
      }
    });

    revalidatePath("/dashboard");
    return { success: true, id: nuevaCita.id };
  } catch (error) {
    console.error("❌ Error al agendar:", error);
    return { error: "Fallo al guardar en Hostinger." };
  }
};

/**
 * 🔄 ACTUALIZAR CITA
 */
export const actualizarCita = async (
  appointmentId: string, 
  data: { status?: string; fecha?: string; hora?: string }
) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    const updateData: any = {};
    if (data.status) updateData.status = data.status;
    if (data.fecha && data.hora) {
      updateData.fechaHora = new Date(`${data.fecha}T${data.hora}`);
    }

    await db.appointment.update({
      where: { id: appointmentId },
      data: updateData,
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Error en el servidor." };
  }
};