import { auth } from "@/auth";
import { getDashboardSessions } from "@/lib/actions/appointments";
import AdminBanner from "./components/admin-banner";
import WelcomeModal from "./components/welcome-modal";
import SessionStack from "./components/session-stack";
import CalendarView from "./components/calendar-view";
import UpcomingSessions from "./components/upcoming-sessions";

// ✅ Forzamos que la página no se guarde en caché estática
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // 🔐 Obtenemos sesión y datos en el servidor
  const hoy: Date = new Date();
  const session = await auth();
  const { proximas } = await getDashboardSessions();

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Pasamos los datos directamente como props */}
      <WelcomeModal userName={session?.user?.name || "Nutriólogo"} />
      <AdminBanner initialUser={session?.user} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-12">
          {/* ✅ Al ser Server Component, router.refresh() actualizará estas listas automáticamente */}
          <SessionStack sessions={hoy} loading={false} />
          <UpcomingSessions sessions={proximas} loading={false} />
        </div>

        <div className="lg:col-span-5">
          <CalendarView />
        </div>
      </div>
    </div>
  );
}