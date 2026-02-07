"use server";

// 💡 IMPORTANTE: Usa 'db' que es tu Singleton de Prisma 6
import { db } from "@/lib/db"; 
import { RegisterSchema, LoginSchema } from "@/schemas/auth.schema";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// --- REGISTRO ---
export const registerUser = async (values: any) => {
  // 1. Validamos los datos con Zod
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Campos inválidos." };

  // 2. Extraemos los datos usando el nombre CORRECTO (fechaNacimiento)
  const { 
    email, 
    password, 
    nombre, 
    apellido, 
    telefono, 
    carrera, 
    fechaNacimiento // ✅ Ya no usamos 'cumpleaños' aquí
  } = validatedFields.data;

  try {
    // 🔍 Verificamos si ya existe el nutriólogo
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) return { error: "El correo ya está en uso." };

    // 🔐 Encriptamos contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Guardamos en la Base de Datos
    const user = await db.user.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        telefono,
        carrera,
        // ✅ Convertimos el string que viene del form a Date real para Prisma
        fechaNacimiento: new Date(fechaNacimiento), 
        status: "ACTIVE", // Status por defecto
      },
    });

    return { success: true, name: user.nombre };
  } catch (error) {
    console.error("❌ Error en registro:", error);
    return { error: "Error de conexión con la base de datos." };
  }
};

// --- LOGIN ---
export const loginUser = async (values: any) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Datos incorrectos." };

  const { email, password } = validatedFields.data;

  try {
    // 🚀 Auth.js intentará validar contra la DB
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    // 🚨 REGLA DE ORO: Si es redirección, relánzalo para que Next.js haga su magia
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Correo o contraseña incorrectos." };
        default:
          return { error: "Algo salió mal con la sesión." };
      }
    }

    // Para cualquier otro error
    return { error: "Error de servidor. Intenta más tarde." };
  }
};