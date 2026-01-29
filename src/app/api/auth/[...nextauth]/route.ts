// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // Importamos los handlers que ya configuramos en src/auth.ts

export const { GET, POST } = handlers;