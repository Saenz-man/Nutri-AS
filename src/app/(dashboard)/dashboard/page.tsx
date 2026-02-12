import { auth } from "@/auth";
import { db } from "@/lib/db"; 
import { getDashboardSessions } from "@/lib/actions/appointments";
import AdminBanner from "./components/admin-banner";
import WelcomeModal from "./components/welcome-modal";
import SessionStack from "./components/session-stack";
import CalendarView from "./components/calendar-view";
import UpcomingSessions from "./components/upcoming-sessions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user?.id) return null;

  // ✅ CORRECCIÓN: Usamos 'nombre' y 'apellido' que son los campos reales en tu DB
  const dbUser = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      nombre: true,
      apellido: true,
      fotoPerfil: true,
      fotoBanner: true,
    }
  });

  // Formateamos el nombre para que el componente AdminBanner lo reconozca como 'name'
  const formattedUser = dbUser ? {
    ...dbUser,
    name: `${dbUser.nombre} ${dbUser.apellido}`
  } : null;

  const { proximas, hoy } = await getDashboardSessions();

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <WelcomeModal userName={dbUser?.nombre || "Nutriólogo"} />
      
      {/* Pasamos el usuario formateado con la propiedad 'name' */}
      <AdminBanner initialUser={formattedUser as any} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-12">
          <SessionStack sessions={hoy || []} loading={false} />
          <UpcomingSessions sessions={proximas || []} loading={false} />
        </div>

        <div className="lg:col-span-5">
          <CalendarView />
        </div>
      </div>
    </div>
  );
}