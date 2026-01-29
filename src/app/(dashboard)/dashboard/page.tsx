"use client";

import { useEffect, useState } from "react";
import AdminBanner from "./components/admin-banner";
import WelcomeModal from "./components/welcome-modal";
import SessionStack from "./components/session-stack";
import CalendarView from "./components/calendar-view";
import UpcomingSessions from "./components/upcoming-sessions";
import { useSession } from "next-auth/react";
import { getDashboardSessions } from "@/lib/actions/appointments";

// 💡 Definimos la estructura de los datos que vienen de Prisma 6
interface Appointment {
  id: string;
  status: string;
  fechaHora: Date; // Usamos el nombre exacto de tu DB
  patient: {
    nombre: string;
    apellido: string;
  };
}

interface DashboardData {
  hoy: Appointment[];
  proximas: Appointment[];
}

export default function DashboardPage() {
  const { data: session } = useSession();
  
  // ✅ Corregimos el Error 2345 definiendo el tipo inicial
  const [data, setData] = useState<DashboardData>({ 
    hoy: [], 
    proximas: [] 
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardSessions();
        // TypeScript ahora reconoce la estructura de las sesiones
        setData(res as unknown as DashboardData);
      } catch (err) {
        console.error("❌ Error al cargar sesiones desde Hostinger:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      <WelcomeModal userName={session?.user?.name || "Nutriólogo"} />
      <AdminBanner />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: HOY Y FUTURAS */}
        <div className="lg:col-span-7 space-y-12">
          {/* ✅ Se pasan las props que SessionStack ahora requiere (Error 2322) */}
          <SessionStack sessions={data.hoy} loading={loading} />
          
          {/* ✅ Sección de las próximas 10 sesiones aisladas por nutriólogo */}
          <UpcomingSessions sessions={data.proximas} loading={loading} />
        </div>

        {/* COLUMNA DERECHA: CALENDARIO INTERACTIVO */}
        <div className="lg:col-span-5">
          <CalendarView />
        </div>

      </div>
    </div>
  );
}