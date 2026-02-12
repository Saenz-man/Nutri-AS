// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { db } from "@/lib/db"; 
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  
  providers: [
    Credentials({
      name: "Nutri-AS Access",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: `${user.nombre} ${user.apellido}`,
          email: user.email,
          status: user.status,
          // ✅ Incluimos las fotos en el objeto inicial
          fotoPerfil: user.fotoPerfil,
          fotoBanner: user.fotoBanner,
        };
      },
    }),
  ],
  // src/auth.ts (Sección de callbacks)
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.status = (user as any).status;
        token.fotoPerfil = (user as any).fotoPerfil;
        token.fotoBanner = (user as any).fotoBanner;
      }

      // ✅ AÑADIR ESTO: Permite actualizar la sesión sin cerrar sesión
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.status = token.status;
        session.user.fotoPerfil = token.fotoPerfil;
        session.user.fotoBanner = token.fotoBanner;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});