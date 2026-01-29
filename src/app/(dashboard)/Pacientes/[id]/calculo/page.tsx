// src/app/(dashboard)/Pacientes/[id]/calculo/page.tsx
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import CalculadoraClient from "./components/CalculadoraClient";

export default async function CalculoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ Await params para Next.js 16

  const paciente = await db.patient.findUnique({
    where: { id },
    include: {
      appointments: {
        include: { medicion: true },
        orderBy: { fechaHora: "desc" },
        take: 1
      }
    }
  });

  if (!paciente) return notFound();

  // Serializamos los datos para evitar errores de hidratación
  const data = JSON.parse(JSON.stringify(paciente));

  return <CalculadoraClient paciente={data} />;
}