"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function guardarPlanCompleto(appointmentId: string, payload: any) {
  const { biometricos, metas, distribucionSMAE, pacienteId } = payload;

  if (!appointmentId) {
    return { success: false, error: "No se encontró el ID de la cita." };
  }

  try {
    await db.$transaction([
      // 1. Guardar Plan Alimenticio
      db.planAlimenticio.upsert({
        where: { appointmentId }, // Asegúrate que este campo sea @unique en tu schema.prisma
        update: {
          nombre: `Plan Nutricional - ${new Date().toLocaleDateString()}`,
          detalles: JSON.stringify({ metas, distribucionSMAE, contextoBiometrico: biometricos }),
        },
        create: {
          appointmentId,
          nombre: `Plan Nutricional - ${new Date().toLocaleDateString()}`,
          detalles: JSON.stringify({ metas, distribucionSMAE, contextoBiometrico: biometricos }),
        },
      }),

      // 2. Sincronizar Talla del Paciente
      db.patient.update({
        where: { id: pacienteId },
        data: { talla: biometricos.talla }
      }),

      // 3. Registrar Medición (Peso/IMC)
      db.medicion.upsert({
        where: { appointmentId },
        update: { peso: biometricos.peso, talla: biometricos.talla, imc: biometricos.imc },
        create: { appointmentId, peso: biometricos.peso, talla: biometricos.talla, imc: biometricos.imc }
      })
    ]);

    revalidatePath(`/dashboard/Pacientes/${pacienteId}/historia`);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Error en DB:", error.message);
    return { success: false, error: error.message };
  }
}