"use server";

import { auth } from "@/auth"; 
import { db } from "@/lib/db"; 
import { revalidatePath } from "next/cache";
import { UpdateUserSchema } from "@/schemas/user.schema";

/**
 * 🛠️ ACTUALIZACIÓN GENERAL DEL PERFIL
 * Se usa para el formulario de configuración (nombre, carrera, etc.)
 */
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

/**
 * ☁️ ACTUALIZACIÓN DE IMÁGENES (CLOUDINARY)
 * Esta función es llamada directamente por el Widget de Cloudinary tras una subida exitosa.
 * No requiere pasar todo el objeto del usuario, solo el tipo de foto y la URL.
 */
export async function actualizarImagenUsuario(tipo: "fotoPerfil" | "fotoBanner", url: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    // Solo el usuario autenticado puede actualizar sus fotos
    if (!userId) {
      return { error: "No autorizado" };
    }

    await db.user.update({
      where: { id: userId },
      data: { [tipo]: url }
    });

    // Refrescamos las rutas para que los cambios se vean al instante
    revalidatePath("/dashboard");
    revalidatePath("/configuracion");
    
    return { success: true };
  } catch (error) {
    console.error("❌ Error al sincronizar imagen con Hostinger:", error);
    return { error: "Fallo al actualizar la imagen en la base de datos." };
  }
}