"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getHistorialCompleto } from "@/lib/actions/pacientes";
import { Loader2, AlertCircle } from "lucide-react";
import HistoriaHeader from "./components/HistoriaHeader";
import KPIProgress from "./components/KPIProgress";
import ConsultaTimeline from "./components/ConsultaTimeline";
import HistorialAccordions from "./components/HistorialAccordions";
import { toast } from "sonner";

export default function HistoriaClinicaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await getHistorialCompleto(id as string);
        if (res.success && res.historial) {
          setData(res.historial);
        } else {
          toast.error(res.error || "No se pudo cargar el historial clínico.");
          router.push(`/dashboard/pacientes/${id}`);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast.error("Error crítico de conexión con el servidor.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistorial();
  }, [id, router]);

  // Pantalla de carga profesional
  if (loading) return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-nutri-main" size={48} />
        <p className="text-sm font-bold text-gray-400 animate-pulse uppercase tracking-widest">
          Consolidando Historial...
        </p>
      </div>
    </div>
  );

  // Validación de existencia de datos
  if (!data) return (
    <div className="flex h-[70vh] items-center justify-center text-center p-10">
      <div className="max-w-md space-y-4">
        <AlertCircle className="mx-auto text-red-400" size={64} />
        <h2 className="text-2xl font-bold text-gray-900">Expediente no encontrado</h2>
        <p className="text-gray-500">No pudimos localizar los registros clínicos para este ID de paciente.</p>
        <button 
          onClick={() => router.push("/dashboard/pacientes")}
          className="bg-nutri-main text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-500/20"
        >
          Volver al Catálogo
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
      
      {/* 1. Cabecera de Identidad y Navegación */}
      <HistoriaHeader 
        paciente={data} 
        onExport={() => toast.info("Funcionalidad de exportación PDF en desarrollo")} 
      />

      {/* 2. Panel de Indicadores de Progreso (KPIs Nutricionales) */}
      {/* Compara automáticamente la primera consulta contra la actual */}
      <KPIProgress appointments={data.appointments || []} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 3. Línea de Tiempo de Consultas (Timeline) */}
        <div className="lg:col-span-2">
          <ConsultaTimeline appointments={data.appointments || []} />
        </div>

        {/* 4. Bloques de Información Consolidada (Accordions) */}
        {/* Incluye Curva de Antropometría y Evolución Dietética */}
        <aside className="space-y-6">
          <HistorialAccordions appointments={data.appointments || []} />
          
          {/* Nota de pie de página informativa */}
          <div className="p-6 bg-blue-50 rounded-4xl border border-blue-100">
            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Nota del Sistema</h4>
            <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
              Los datos mostrados en este historial corresponden a las citas marcadas como "Atendidas". 
              Cualquier cambio en las mediciones se verá reflejado automáticamente en el catálogo general.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}