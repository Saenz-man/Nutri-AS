import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import HistoriaHeader from "./components/HistoriaHeader";
import KPIProgress from "./components/KPIProgress";
import ConsultaTimeline from "./components/ConsultaTimeline";
import CurvaAntropometria from "./components/CurvaAntropometria";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HistoriaClinicaPage({ params }: PageProps) {
  // ✅ 1. Resolvemos los params asíncronos (Next.js 16)
  const { id } = await params;

  // ✅ 2. Consulta a la base de datos con relaciones correctas
  const paciente = await db.patient.findUnique({
    where: { id },
    include: {
      appointments: {
        include: {
          medicion: true,
          laboratorios: true, // Nombre plural según tu Schema corregido
        },
        orderBy: { fechaHora: "desc" },
      },
    },
  });

  if (!paciente) return notFound();

  const tieneConsultas = paciente.appointments.length > 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
      {/* Solo pasamos los datos del paciente; la lógica interactiva vive en el Header */}
      <HistoriaHeader paciente={paciente} />

      {!tieneConsultas ? (
        <div className="bg-white rounded-4xl border-2 border-dashed border-gray-100 p-20 text-center space-y-4">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-3xl">📁</div>
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter">Aún no hay información</h2>
          <p className="text-gray-400 font-medium max-w-xs mx-auto text-sm">
            Registra una consulta o estudio para activar el historial de {paciente.nombre}.
          </p>
        </div>
      ) : (
        <>
          {/* ✅ Pasamos la talla base del paciente para el cálculo del IMC */}
          <KPIProgress 
            appointments={paciente.appointments} 
            tallaPaciente={paciente.talla || 0} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <ConsultaTimeline appointments={paciente.appointments} />
            </div>

            <aside className="space-y-8">
              <CurvaAntropometria 
                data={paciente.appointments
                  .filter((a: any) => a.medicion)
                  .map((a: any) => ({ 
                    fecha: a.fechaHora, 
                    peso: a.medicion.peso 
                  }))} 
              />
            </aside>
          </div>
        </>
      )}
    </div>
  );
}