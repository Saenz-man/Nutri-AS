// src/proxy.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; // Usamos la config ligera sin bcrypt

export default NextAuth(authConfig).auth;

export const config = {
  // Esta línea protege todo lo que esté en /dashboard
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};