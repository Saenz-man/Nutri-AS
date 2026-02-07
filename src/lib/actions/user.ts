"use server";

import { auth } from "@/auth"; 
import { db } from "@/lib/db"; // Usamos tu singleton db para consistencia
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

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        nombre: validatedData.data.nombre,
        apellido: validatedData.data.apellido,
        telefono: validatedData.data.telefono,
        carrera: validatedData.data.carrera,
        cumpleaños: validatedData.data.cumpleaños,
        fotoPerfil: validatedData.data.fotoPerfil,
        fotoBanner: validatedData.data.fotoBanner,
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