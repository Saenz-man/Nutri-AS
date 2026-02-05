"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * 📋 OBTENER CATÁLOGO COMPLETO
 * El filtro { nutritionistId: userId } es lo que oculta los pacientes si el ID no coincide.
 */
export const getPacientes = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    console.log("🔍 DEBUG - ID en sesión:", userId);

    if (!userId) {
      return { success: false, error: "Sesión no encontrada o expirada" };
    }

    const pacientes = await db.patient.findMany({
      where: { nutritionistId: userId },
      orderBy: { nombre: "asc" },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        expediente: true,
        telefono: true,
        foto: true,
        status: true,
        sexo: true,
        talla: true, // ✅ Importante para que el IMC no de 0.0
      }
    });

    return { success: true, pacientes };
  } catch (error) {
    console.error("❌ Error en getPacientes:", error);
    return { success: false, error: "Error de conexión con Hostinger" };
  }
};

/**
 * 📝 REGISTRAR PACIENTE (ALTA)
 */
export const registrarPaciente = async (data: any) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { error: "No autorizado" };

  try {
    // Validación de límites
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { maxPatients: true, _count: { select: { patients: true } } }
    });

    if (user && user._count.patients >= user.maxPatients) {
      return { error: "LIMIT_REACHED", max: user.maxPatients };
    }

    const newPatient = await db.patient.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        expediente: data.expediente,
        telefono: data.telefono,
        email: data.email,
        sexo: data.sexo, // ✅ Sincronizado
        fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento) : null,
        nutritionistId: userId,
      },
    });

    revalidatePath("/dashboard/pacientes");
    return { success: true, id: newPatient.id };
  } catch (error) {
    return { error: "Error al guardar en la base de datos." };
  }
};

/**
 * 🔄 ACTUALIZAR INFORMACIÓN PERSONAL
 */
export const actualizarPaciente = async (id: string, data: any) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { error: "No autorizado" };

  try {
    const pacienteActualizado = await db.patient.update({
      where: { 
        id,
        nutritionistId: userId 
      },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        foto: data.foto,
        sexo: data.sexo, 
      },
    });

    revalidatePath("/dashboard/pacientes");
    revalidatePath(`/dashboard/pacientes/${id}`);
    
    return { success: true, paciente: pacienteActualizado };
  } catch (error) {
    return { error: "No se pudieron guardar los cambios." };
  }
};

/**
 * 📈 OBTENER HISTORIAL CLÍNICO
 */
export const getHistorialCompleto = async (pacienteId: string) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { error: "No autorizado" };

  try {
    const historial = await db.patient.findUnique({
      where: { 
        id: pacienteId, 
        nutritionistId: userId 
      },
      include: {
        appointments: {
          orderBy: { fechaHora: "desc" },
          include: {
            medicion: true,     
            r24: true,          
            laboratorios: true, 
            plan: true          
          }
        }
      }
    });

    return { success: true, historial };
  } catch (error) {
    return { error: "Error al consolidar datos." };
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

/**
 * 🔄 CAMBIAR STATUS (ACTIVO/INACTIVO)
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
 * 🗑️ ELIMINAR PACIENTE (Borrado en Cascada Manual)
 */
export const eliminarPaciente = async (id: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "No autorizado" };

  try {
    await db.$transaction(async (tx) => {
      // 1. Obtener todas las citas del paciente para identificar sus IDs
      const appointments = await tx.appointment.findMany({
        where: { patientId: id },
        select: { id: true }
      });
      const appointmentIds = appointments.map(a => a.id);

      // 2. Borrar modelos que NO tienen 'onDelete: Cascade' en el schema
      // Borrar Recordatorios 24h (R24)
      await tx.r24.deleteMany({
        where: { appointmentId: { in: appointmentIds } }
      });

      // Borrar Planes Alimenticios
      await tx.planAlimenticio.deleteMany({
        where: { appointmentId: { in: appointmentIds } }
      });

      // 3. Borrar Consultas rápidas (Consultation)
      await tx.consultation.deleteMany({
        where: { patientId: id }
      });

      // 4. Borrar Citas (Appointment)
      // Nota: Esto disparará el Cascade automático para 'Medicion' y 'Laboratorio'
      // ya que ellos SI tienen 'onDelete: Cascade' en tu schema.prisma
      await tx.appointment.deleteMany({
        where: { patientId: id }
      });

      // 5. Finalmente, borrar al Paciente
      await tx.patient.delete({
        where: { id, nutritionistId: session.user.id },
      });
    });

    revalidatePath("/dashboard/pacientes");
    return { success: true };
  } catch (error) {
    console.error("❌ Error en eliminación completa:", error);
    return { error: "No se pudo eliminar al paciente debido a registros protegidos." };
  }
};