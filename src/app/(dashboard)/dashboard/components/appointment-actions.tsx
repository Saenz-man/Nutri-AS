// src/app/(dashboard)/dashboard/components/appointment-actions.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Play, Calendar, XCircle, UserMinus, Loader2 } from "lucide-react";
import { actualizarCita } from "@/lib/actions/appointments";
import { toast } from "sonner";

export default function AppointmentActions({ appointmentId, patientId }: { appointmentId: string, patientId: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // 💡 Detenemos la propagación para que el menú funcione
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsOpen(!isOpen);
  };

  const handleStatus = async (e: React.MouseEvent, status: string) => {
    e.stopPropagation(); // Evita navegar al dashboard
    setLoading(true);
    const res = await actualizarCita(appointmentId, { status });
    setLoading(false);
    setIsOpen(false);
    if (res.success) toast.success(`Estado actualizado: ${status}`);
  };

  const handleReschedule = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!newDate || !newTime) return toast.error("Selecciona fecha y hora");
    setLoading(true);
    const res = await actualizarCita(appointmentId, { fecha: newDate, hora: newTime });
    setLoading(false);
    if (res.success) {
      toast.success("Cita reagendada");
      setShowReschedule(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleMenu} 
        className="p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-400"
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} />
          <div 
            onClick={(e) => e.stopPropagation()} // 💡 Evita que clics dentro del menú naveguen
            className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-3xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in duration-200"
          >
            <div className="p-2 space-y-1">
              <button 
                onClick={() => router.push(`/dashboard/consultas/nueva?pacienteId=${patientId}&citaId=${appointmentId}`)}
                className="w-full flex items-center gap-3 p-3 text-xs font-bold text-nutri-main hover:bg-nutri-light rounded-2xl transition-all"
              >
                <Play size={16} fill="currentColor" /> Atender Consulta
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); setShowReschedule(!showReschedule); }} 
                className="w-full flex items-center gap-3 p-3 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-2xl transition-all"
              >
                <Calendar size={16} /> Reagendar Cita
              </button>

              {showReschedule && (
                <div className="p-2 space-y-2 bg-gray-50 rounded-2xl mx-1">
                  <input type="date" className="nutri-input text-[10px] p-2" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                  <input type="time" className="nutri-input text-[10px] p-2" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
                  <button onClick={handleReschedule} disabled={loading} className="w-full bg-nutri-main text-white py-2 rounded-xl text-[10px] font-bold">
                    {loading ? "..." : "Confirmar"}
                  </button>
                </div>
              )}

              <div className="h-px bg-gray-50 my-1" />

              <button onClick={(e) => handleStatus(e, "CANCELADA")} className="w-full flex items-center gap-3 p-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                <XCircle size={16} /> Cancelar cita
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}