import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // Sesión expira en 1 hora por inactividad
  },
  callbacks: {
    // Protección de rutas: solo permite entrar a /dashboard si hay sesión
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirige al login
      }
      return true;
    },
    // Pasamos el estatus (ACTIVE, TEST_USER) al token
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.status = user.status;
      }
      return token;
    },
    // Hacemos que el estatus esté disponible en session.user.status
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.status = token.status;
      }
      return session;
    },
  },
  providers: [], // Se llenan en src/auth.ts
} satisfies NextAuthConfig;