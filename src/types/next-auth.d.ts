import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      status: string; // Aquí definimos el estatus para Nutri-AS
    } & DefaultSession["user"];
  }

  interface User {
    status: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    status: string;
  }
}