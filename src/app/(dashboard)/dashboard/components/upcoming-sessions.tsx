"use client";

import { CalendarDays, Clock } from "lucide-react";
import AppointmentActions from "./appointment-actions"; 

export default function UpcomingSessions({ sessions = [], loading }: any) {
  if (loading) return <div className="animate-pulse h-40 bg-gray-50 rounded-4xl" />;

  // Validación de seguridad
  if (!Array.isArray(sessions)) {
    return <div className="p-10 text-center text-gray-400">Error en el formato de datos.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 font-display">
          <CalendarDays className="text-nutri-orange" size={24} /> Próximas 10 Sesiones
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.length === 0 ? (
          <p className="text-gray-400 font-bold col-span-2 py-10 text-center border-2 border-dashed border-gray-100 rounded-4xl">
            No hay sesiones futuras programadas.
          </p>
        ) : (
          sessions.map((cita: any) => (
            <div key={cita.id} className="p-5 bg-white rounded-3xl border border-gray-100 hover:shadow-md transition-all group flex justify-between items-start">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <p className="font-bold text-nutri-main text-sm">
                    {new Date(cita.fechaHora).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </p>
                  <div className="flex items-center gap-1 text-gray-400 text-[10px] font-black uppercase tracking-tighter">
                    <Clock size={12} /> {new Date(cita.fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-nutri-main transition-colors">
                    {cita.patient.nombre} {cita.patient.apellido}
                  </p>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    {cita.status}
                  </span>
                </div>
              </div>

              <AppointmentActions 
                appointmentId={cita.id} 
                patientId={cita.patientId} 
                originalFechaHora={cita.fechaHora} 
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}