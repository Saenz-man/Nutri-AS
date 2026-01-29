"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * 📋 OBTENER CATÁLOGO COMPLETO
 * Trae todos los pacientes vinculados al nutriólogo en sesión.
 * Incluye campos necesarios para la visualización de tarjetas.
 */
export const getPacientes = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("No autorizado");

  try {
    const pacientes = await db.patient.findMany({
      where: { 
        nutritionistId: userId // 🛡️ Aislamiento por nutriólogo
      },
      orderBy: { nombre: "asc" },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        expediente: true,
        telefono: true,
        foto: true,   // ✅ Requerido para la Card
        status: true, // ✅ Requerido para el indicador de actividad
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
 * Crea un nuevo paciente y limpia la caché para actualización inmediata.
 */
export const registrarPaciente = async (data: any) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    const userId = session.user.id;

    // 1. Validación de límites (se mantiene igual)
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { maxPatients: true, _count: { select: { patients: true } } }
    });

    if (user && user._count.patients >= user.maxPatients) {
      return { error: "LIMIT_REACHED", max: user.maxPatients };
    }

    // 2. Transformación de datos crítica 🚀
    const newPatient = await db.patient.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        expediente: data.expediente,
        telefono: data.telefono,
        email: data.email,
        // ✅ CORRECCIÓN DE FECHA: De string a objeto Date
        fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento) : null,
        nutritionistId: userId,
        // ⚠️ NOTA: Si quieres guardar motivoConsulta, antecedentes, etc., 
        // primero debes añadirlos a tu schema.prisma y hacer npx prisma db push.
      },
    });

    revalidatePath("/dashboard/pacientes");
    return { success: true, id: newPatient.id };
  } catch (error) {
    console.error("❌ Error en registrarPaciente:", error);
    return { error: "Error crítico al guardar en la base de datos." };
  }
};

/**
 * 🔄 ACTUALIZAR INFORMACIÓN PERSONAL
 * Modifica datos básicos y fuerza el refresco en el expediente y catálogo.
 */
export const actualizarPaciente = async (id: string, data: any) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    const pacienteActualizado = await db.patient.update({
      where: { 
        id,
        nutritionistId: session.user.id 
      },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        foto: data.foto, // ✅ Uso del nombre de campo correcto
      },
    });

    // 🚀 REVALIDACIÓN TOTAL: Evita el refresco manual de página
    revalidatePath("/dashboard/pacientes");
    revalidatePath(`/dashboard/pacientes/${id}`);
    revalidatePath(`/dashboard/pacientes/${id}/historia`); 
    
    return { success: true, paciente: pacienteActualizado };
  } catch (error) {
    console.error("❌ Error al actualizar paciente:", error);
    return { error: "No se pudieron guardar los cambios." };
  }
};

/**
 * 📈 OBTENER HISTORIAL CLÍNICO CONSOLIDADO
 * Realiza un join masivo de todas las tablas clínicas vinculadas.
 */
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
          orderBy: { fechaHora: "desc" }, // Orden cronológico
          include: {
            medicion: true,     // ✅ Uso del singular (Prisma 6)
            r24: true,          
            laboratorios: true, 
            plan: true          
          }
        }
      }
    });

    return { success: true, historial };
  } catch (error) {
    console.error("❌ Error en consolidación:", error);
    return { error: "Error al consolidar los datos clínicos de Hostinger." };
  }
};

/**
 * 🔍 BUSCAR PACIENTES (Filtro rápido)
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
    return { error: "Error al consultar pacientes." };
  }
};

/**
 * 🆔 OBTENER PACIENTE POR ID
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
    return { error: "Fallo al obtener el paciente." };
  }
};

/**
 * 🆔 GENERAR EXPEDIENTE AUTOMÁTICO
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
 * 🔄 CAMBIAR STATUS
 * Alterna entre ACTIVO e INACTIVO sin borrar datos.
 */
export const cambiarStatusPaciente = async (id: string, currentStatus: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    const newStatus = currentStatus === "ACTIVO" ? "INACTIVO" : "ACTIVO";
    const actualizado = await db.patient.update({
      where: { id, nutritionistId: session.user.id },
      data: { status: newStatus as any },
    });

    revalidatePath(`/dashboard/pacientes/${id}`);
    revalidatePath("/dashboard/pacientes");
    return { success: true, status: actualizado.status };
  } catch (error) {
    return { error: "Error al cambiar el estatus." };
  }
};

/**
 * 🗑️ ELIMINAR PACIENTE
 * Borra permanentemente al paciente y su historial.
 */
export const eliminarPaciente = async (id: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    await db.patient.delete({
      where: { id, nutritionistId: session.user.id },
    });

    revalidatePath("/dashboard/pacientes");
    return { success: true };
  } catch (error) {
    return { error: "No se pudo eliminar al paciente." };
  }
};