"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * 📋 OBTENER CATÁLOGO COMPLETO
 * Trae todos los pacientes vinculados a Edgar Uriel para el listado general.
 */
export const getPacientes = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("No autorizado");

  try {
    const pacientes = await db.patient.findMany({
      where: { 
        nutritionistId: userId // 🛡️ Aislamiento estricto de datos
      },
      orderBy: { nombre: "asc" },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        expediente: true,
        telefono: true,
      }
    });
    return { success: true, pacientes };
  } catch (error) {
    console.error("❌ Error al obtener catálogo:", error);
    return { error: "Fallo al conectar con la base de datos de Hostinger." };
  }
};

/**
 * 📝 REGISTRAR PACIENTE
 * Crea un nuevo paciente vinculado estrictamente al nutriólogo en sesión.
 */
export const registrarPaciente = async (data: any) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado. Debes iniciar sesión." };
  }

  try {
    const userId = session.user.id;

    // Control de Límite basado en el plan del usuario
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { maxPatients: true, _count: { select: { patients: true } } }
    });

    if (user && user._count.patients >= user.maxPatients) {
      return { error: "LIMIT_REACHED", max: user.maxPatients };
    }

    const existing = await db.patient.findFirst({
      where: { 
        expediente: data.expediente,
        nutritionistId: userId 
      }
    });

    if (existing) return { error: "DUPLICATE_PATIENT" };

    const newPatient = await db.patient.create({
      data: {
        ...data,
        nutritionistId: userId, // 🔒 Vínculo forzado en el servidor
      },
    });

    // Refrescamos rutas para actualizar el catálogo y el dashboard inmediatamente
    revalidatePath("/dashboard/pacientes");
    revalidatePath("/dashboard");

    return { success: true, id: newPatient.id };
  } catch (error) {
    console.error("❌ Error en registrarPaciente:", error);
    return { error: "Error crítico al guardar en la base de datos." };
  }
};

/**
 * 🔍 BUSCAR PACIENTES
 * Búsqueda inteligente para Nueva Consulta (Nombre, Apellido o Expediente).
 */
export const buscarPacientesAction = async (query: string) => {
  const session = await auth();
  
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    const pacientes = await db.patient.findMany({
      where: {
        nutritionistId: session.user.id,
        OR: [
          { nombre: { contains: query, mode: 'insensitive' } },
          { apellido: { contains: query, mode: 'insensitive' } },
          { expediente: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 5, 
    });
    return { success: true, pacientes };
  } catch (error) {
    console.error("❌ Error en buscarPacientesAction:", error);
    return { error: "Error al consultar pacientes." };
  }
};

/**
 * 🆔 OBTENER PACIENTE POR ID
 * Utilizado para cargar el expediente desde la URL en Nueva Consulta.
 */
export const getPacienteById = async (id: string) => {
  const session = await auth();
  
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    const paciente = await db.patient.findUnique({
      where: {
        id,
        nutritionistId: session.user.id,
      },
    });

    if (!paciente) return { error: "Paciente no encontrado" };

    return { success: true, paciente };
  } catch (error) {
    console.error("❌ Error en getPacienteById:", error);
    return { error: "Fallo al obtener el paciente." };
  }
};

/**
 * 🆔 GENERAR EXPEDIENTE AUTO
 * Calcula el siguiente folio basado en el historial del nutriólogo.
 */
export const generarExpedienteAuto = async () => {
  const session = await auth();
  if (!session?.user?.id) return "AS-0001";

  const lastPatient = await db.patient.findFirst({
    where: { nutritionistId: session.user.id },
    orderBy: { createdAt: 'desc' },
    select: { expediente: true }
  });

  if (!lastPatient) return "AS-0001";
  
  const parts = lastPatient.expediente.split("-");
  const prefix = parts[0] || "AS";
  const currentNumber = parseInt(parts[1] || "0");
  const nextNumber = (currentNumber + 1).toString().padStart(4, "0");
  
  return `${prefix}-${nextNumber}`;
};

// src/lib/actions/pacientes.ts

/**
 * 🔄 ACTUALIZAR INFORMACIÓN PERSONAL
 * Permite editar Nombre, Foto y Edad (o Fecha de Nacimiento).
 */
export const actualizarPaciente = async (id: string, data: any) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    const pacienteActualizado = await db.patient.update({
      where: { 
        id,
        nutritionistId: session.user.id // 🛡️ Seguridad: Solo sus propios pacientes
      },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        // Si añadiste el campo edad o fechaNacimiento en el schema:
        // edad: parseInt(data.edad), 
      },
    });

    revalidatePath(`/dashboard/pacientes/${id}`);
    revalidatePath("/dashboard/pacientes");
    
    return { success: true, paciente: pacienteActualizado };
  } catch (error) {
    console.error("❌ Error al actualizar paciente:", error);
    return { error: "No se pudieron guardar los cambios." };
  }
};

// src/lib/actions/pacientes.ts
export const getHistorialCompleto = async (pacienteId: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    const historial = await db.patient.findUnique({
      where: { 
        id: pacienteId, 
        nutritionistId: session.user.id 
      },
      include: {
        appointments: {
          orderBy: { fechaHora: "desc" }, // Requisito: Orden Cronológico
          include: {
      medicion: true,     // ✅ Debe ser singular (según tu schema.prisma)
      r24: true,          // ✅ Relación 1:1 definida en el modelo
      laboratorios: true, // ✅ Relación 1:N definida en el modelo
      plan: true          // ✅ Relación 1:1 definida en el modelo
    }
        }
      }
    });

    return { success: true, historial };
  } catch (error) {
    console.error("❌ Error en consolidación:", error);
    return { error: "Error al conectar con Hostinger." };
  }
};