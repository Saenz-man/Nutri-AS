import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"; // Solo se carga en el servidor

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Nutri-AS Access",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Buscamos al usuario en PostgreSQL
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // 2. Validamos existencia y contraseña hasheada
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        // 3. Retornamos el perfil completo para Nutri-AS
        return {
          id: user.id,
          name: user.nombre,
          email: user.email,
          status: user.status, // ACTIVE o TEST_USER
        };
      },
    }),
  ],
});