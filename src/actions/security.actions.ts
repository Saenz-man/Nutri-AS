"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// Definimos el esquema aquí para reusarlo o validarlo en el server
const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "La contraseña actual es requerida"),
  newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirma la contraseña"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const updatePassword = async (userId: string, values: z.infer<typeof ChangePasswordSchema>) => {
  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Datos inválidos" };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  try {
    // 1. Buscar al usuario
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      return { error: "Usuario no encontrado" };
    }

    // 2. VERIFICAR LA CONTRASEÑA ACTUAL
    const passwordsMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordsMatch) {
      return { error: "La contraseña actual es incorrecta." };
    }

    // 3. Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Actualizar en DB
    await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    revalidatePath("/dashboard/configuracion");
    return { success: "Contraseña actualizada correctamente" };

  } catch (error) {
    return { error: "Error al actualizar la contraseña" };
  }
};