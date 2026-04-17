"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { ResetPasswordEmail } from "@/components/emails/ResetPasswordTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

// --- ESQUEMAS DE VALIDACIÓN (ZOD) ---

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "La contraseña actual es requerida"),
  newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirma la contraseña"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const ResetPasswordSchema = z.object({
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

// --- FUNCIONES DE ACCIÓN ---

/**
 * 1. Actualizar contraseña (desde el panel de configuración)
 */
export const updatePassword = async (userId: string, values: z.infer<typeof ChangePasswordSchema>) => {
  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Datos inválidos" };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  try {
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user || !user.password) {
      return { error: "Usuario no encontrado" };
    }

    const passwordsMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordsMatch) {
      return { error: "La contraseña actual es incorrecta." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

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

/**
 * 2. Solicitar recuperación (Genera token y envía email)
 */
export const requestPasswordReset = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    // Seguridad: No confirmamos si el email existe
    if (!user) {
      return { success: "Si el correo está registrado, recibirás un enlace pronto." };
    }

    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hora

    // Guardamos o actualizamos el token para este usuario
    await db.passwordResetToken.upsert({
      where: { email }, 
      update: { token, expires },
      create: { email, token, expires },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    const { error } = await resend.emails.send({
      from: 'NUTRIAS <noreply@nutrias.com.mx>',
      to: [email],
      subject: 'Restablece tu contraseña - NUTRIAS',
      react: ResetPasswordEmail({ resetLink }),
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: "No se pudo enviar el correo." };
    }

    return { success: "Correo de recuperación enviado con éxito." };
  } catch (error) {
    console.error("Request Reset Error:", error);
    return { error: "Algo salió mal al procesar la solicitud." };
  }
};

/**
 * 3. Restablecer contraseña (Verifica token y guarda nueva clave)
 */
export const resetPassword = async (
  token: string | null,
  values: z.infer<typeof ResetPasswordSchema>
) => {
  if (!token) return { error: "Falta el token de recuperación." };

  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Campos inválidos." };

  const { password } = validatedFields.data;

  try {
    // 1. Validar existencia del token
    const existingToken = await db.passwordResetToken.findUnique({
      where: { token }
    });

    if (!existingToken) return { error: "Token inválido o expirado." };

    // 2. Validar expiración
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: "El enlace ha expirado. Solicita uno nuevo." };

    // 3. Validar usuario
    const existingUser = await db.user.findUnique({
      where: { email: existingToken.email }
    });

    if (!existingUser) return { error: "El usuario ya no existe." };

    // 4. Ejecutar cambios en transacción (Seguridad atómica)
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.$transaction([
      db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
      }),
      db.passwordResetToken.delete({
        where: { id: existingToken.id }
      })
    ]);

    return { success: "¡Contraseña actualizada! Ya puedes iniciar sesión." };
  } catch (error) {
    console.error("Reset Password Error:", error);
    return { error: "Error al restablecer la contraseña." };
  }
};