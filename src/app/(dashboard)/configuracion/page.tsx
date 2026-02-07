// src/app/(dashboard)/configuracion/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ConfiguracionClient from "./ConfiguracionClient";

export default async function ConfiguracionPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userData = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!userData) redirect("/login");

  // Esta es la clave: renderizar el componente cliente que creamos
  return <ConfiguracionClient userData={userData} />;
}