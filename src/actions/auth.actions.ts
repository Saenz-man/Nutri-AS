"use server";

import { prisma } from "@/lib/prisma";
import { RegisterSchema, LoginSchema } from "@/schemas/auth.schema";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// --- ACCIÓN DE REGISTRO ---
export const registerUser = async (values: any) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos. Revisa los datos ingresados." };
  }

  const { email, password, nombre, apellido, telefono, carrera, cumpleaños } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "Este correo electrónico ya está en uso." };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        telefono,
        carrera,
        cumpleaños: new Date(cumpleaños),
        status: "ACTIVE", // Saltamos la pasarela por ahora como acordamos
      },
    });

    return { success: true, name: user.nombre };
  } catch (error) {
    console.error("Error en registro:", error);
    return { error: "Hubo un problema al crear la cuenta en Hostinger." };
  }
};

// --- ACCIÓN DE LOGIN (La que te falta exportar) ---
export const loginUser = async (values: any) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Correo o contraseña inválidos." };
  }

  const { email, password } = validatedFields.data;

  try {
    // Esta función de Auth.js hace la magia del redireccionamiento
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard", 
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales incorrectas." };
        default:
          return { error: "Algo salió mal. Inténtalo de nuevo." };
      }
    }
    // IMPORTANTE: Se debe lanzar el error para que Next.js maneje el redirect
    throw error;
  }
};