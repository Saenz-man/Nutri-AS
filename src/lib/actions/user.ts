"use server";

import { auth } from "@/auth"; 
import { db } from "@/lib/db"; 
import { revalidatePath } from "next/cache";
import { UpdateUserSchema } from "@/schemas/user.schema";

export async function updateUserService(userId: string, data: any) {
  try {
    const session = await auth();
    
    // Verificamos que el usuario logueado sea el mismo que intenta editar
    if (!session || session.user?.id !== userId) {
      return { error: "No autorizado" };
    }

    const validatedData = UpdateUserSchema.safeParse(data);
    
    if (!validatedData.success) {
      return { 
        error: "Datos inválidos", 
        details: validatedData.error.flatten().fieldErrors 
      };
    }

    // ✅ CORRECCIÓN: Extraemos directamente las variables del schema validado
    // Ya no intentamos leer 'cumpleaños' porque Zod ya lo transformó o validó como 'fechaNacimiento'
    const { 
      nombre, 
      apellido, 
      telefono, 
      carrera, 
      fechaNacimiento, 
      fotoPerfil, 
      fotoBanner 
    } = validatedData.data;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        nombre,
        apellido,
        telefono,
        carrera,
        
        // ✅ Aseguramos que sea un objeto Date válido si existe el dato
        fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : undefined,

        fotoPerfil,
        fotoBanner,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/configuracion");

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Error interno del servidor" };
  }
}