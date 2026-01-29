
"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const registrarConsulta = async (patientId: string, data: any) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    // 🔒 Verificamos que el paciente realmente le pertenezca al nutriólogo
    const pacienteValido = await db.patient.findFirst({
      where: { id: patientId, nutritionistId: session.user.id }
    });

    if (!pacienteValido) return { error: "Paciente no encontrado en tu cartera" };

    const nuevaConsulta = await db.consultation.create({
      data: {
        ...data,
        patientId,
        nutritionistId: session.user.id, // Vínculo forzado
      }
    });

    revalidatePath("/dashboard");
    return { success: true, id: nuevaConsulta.id };
  } catch (error) {
    console.error("❌ Error en registrarConsulta:", error);
    return { error: "Fallo al guardar en Hostinger" };
  }
};