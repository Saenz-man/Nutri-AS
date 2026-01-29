import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CalendarioPacienteWrapper from "./components/CalendarioPacienteWrapper";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HistorialConsultasPage({ params }: PageProps) {
  const { id } = await params;

  // 🔍 Obtenemos al paciente y sus citas reales de la BD
  const paciente = await db.patient.findUnique({
    where: { id },
    include: {
      appointments: {
        orderBy: { fechaHora: "asc" },
      },
    },
  });

  if (!paciente) return notFound();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link 
          href={`/dashboard/Pacientes/${id}`}
          className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-nutri-main transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tighter uppercase">Cronograma de Consultas</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase italic">
            Paciente: {paciente.nombre} {paciente.apellido}
          </p>
        </div>
      </div>

      {/* ✅ Pasamos las citas reales al componente de cliente */}
      <CalendarioPacienteWrapper 
        pacienteId={id} 
        initialAppointments={JSON.parse(JSON.stringify(paciente.appointments))} 
      />
    </div>
  );
}