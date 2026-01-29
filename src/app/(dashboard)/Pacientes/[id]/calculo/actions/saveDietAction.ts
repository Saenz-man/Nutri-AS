// src/app/(dashboard)/Pacientes/[id]/calculo/actions/saveDietAction.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function guardarPlanAlimenticio(appointmentId: string, datos: any) {
  try {
    // Guardamos el plan vinculado a la cita
    const plan = await db.planAlimenticio.upsert({
      where: { appointmentId },
      update: {
        nombre: `Plan - ${new Date().toLocaleDateString()}`,
        detalles: JSON.stringify(datos), // Guardamos equivalentes y macros como JSON
      },
      create: {
        appointmentId,
        nombre: `Plan - ${new Date().toLocaleDateString()}`,
        detalles: JSON.stringify(datos),
      },
    });

    revalidatePath("/dashboard/Pacientes/[id]/historia", "page");
    return { success: true, plan };
  } catch (error) {
    console.error("Error al guardar dieta:", error);
    return { success: false, error: "No se pudo guardar la dieta" };
  }
}