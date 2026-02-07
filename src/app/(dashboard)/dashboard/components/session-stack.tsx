"use client";

import { Clock, CalendarX } from "lucide-react";
import { useRouter } from "next/navigation";
import AppointmentActions from "./appointment-actions";

export default function SessionStack({ sessions = [], loading }: any) {
  const router = useRouter();

  if (loading) return <div className="animate-pulse h-40 bg-white rounded-4xl" />;

  // Validación de seguridad para evitar el error .map is not a function
  if (!Array.isArray(sessions)) {
    return (
      <div className="p-8 bg-white rounded-4xl border border-red-100 text-center text-red-500">
        Error al cargar las sesiones del día.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 font-display">Sesiones del Día</h2>
      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-4xl border-2 border-dashed border-gray-100 text-center">
           <CalendarX className="text-gray-300 mb-4" size={40} />
           <p className="text-gray-500 font-bold text-lg">No tienes sesiones el día de hoy</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((cita: any) => (
            <div 
              key={cita.id} 
              className="flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-50 hover:border-nutri-main/20 hover:shadow-lg transition-all group relative"
            >
              <div 
                onClick={() => router.push(`/dashboard/consultas/nueva?pacienteId=${cita.patientId}&citaId=${cita.id}`)}
                className="flex items-center gap-4 cursor-pointer flex-1"
              >
                <div className="bg-nutri-main/10 p-3 rounded-2xl text-nutri-main font-black text-xs group-hover:bg-nutri-main group-hover:text-white transition-all">
                  {new Date(cita.fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{cita.patient.nombre} {cita.patient.apellido}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cita.motivo || "Seguimiento"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter shadow-sm ${cita.status === 'ATENDIDA' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                  {cita.status}
                </span>

                <AppointmentActions 
                  appointmentId={cita.id} 
                  patientId={cita.patientId} 
                  originalFechaHora={cita.fechaHora} 
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}