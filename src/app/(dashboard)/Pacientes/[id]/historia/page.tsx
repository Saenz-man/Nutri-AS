"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getHistorialCompleto } from "@/lib/actions/pacientes";
import { Loader2 } from "lucide-react";
import HistoriaHeader from "./components/HistoriaHeader";
import KPIProgress from "./components/KPIProgress";
import ConsultaTimeline from "./components/ConsultaTimeline";
import HistorialAccordions from "./components/HistorialAccordions";

export default function HistoriaClinicaPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      const res = await getHistorialCompleto(id as string);
      if (res.success) setData(res.historial);
      setLoading(false);
    };
    fetchHistorial();
  }, [id]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-nutri-main" size={48} />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
      
      {/* 1. Cabecera de Identidad y Navegación */}
      <HistoriaHeader 
        paciente={data} 
        onExport={() => console.log("Generando PDF...")} 
      />

      {/* 2. Panel de KPIs (Comparativa Inicial vs Actual) */}
      <KPIProgress appointments={data.appointments} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Línea de Tiempo de Consultas (Timeline) */}
        <div className="lg:col-span-2">
          <ConsultaTimeline appointments={data.appointments} />
        </div>

        {/* 4. Bloques de Información Consolidada (Accordions) */}
        <aside>
          <HistorialAccordions appointments={data.appointments} />
        </aside>
      </div>
    </div>
  );
}