// src/app/(dashboard)/page.tsx
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  
  return (
    <div className="p-8">
      <h1>Panel Nutri-AS</h1>
      <p>Bienvenido: {session?.user?.name}</p>
      {/* TS ahora reconocerá .status gracias al archivo .d.ts */}
      <p>Nivel de acceso: {session?.user?.status}</p> 
    </div>
  );
}