"use server";

import { LoginSchema } from "@/schemas/auth.schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const loginUser = async (values: unknown) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Correo o contraseña inválidos." };

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard", // Te enviará aquí si eres TEST_USER o ACTIVE
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
    throw error;
  }
};