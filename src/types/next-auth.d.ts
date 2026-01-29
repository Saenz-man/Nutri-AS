import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;      // Vínculo con PostgreSQL
      status: string;  // ACTIVE o TEST_USER
    } & DefaultSession["user"];
  }

  interface User {
    id: string;        // UUID del nutriólogo
    status: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;        // Necesario para el puente JWT -> Session
    status: string;
  }
}