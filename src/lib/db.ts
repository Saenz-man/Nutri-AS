import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Dejamos el constructor vacío para que Prisma 7 use la configuración global
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;