"use client";

import { useState, useTransition, useEffect } from "react"; 
import { useRouter } from "next/navigation";
import { MoreVertical, Play, Calendar, XCircle, Loader2 } from "lucide-react";
import { actualizarCita } from "@/lib/actions/appointments";
import { toast } from "sonner";
import { format, isValid } from "date-fns"; // ✅ Añadimos isValid

export default function AppointmentActions({ 
  appointmentId, 
  patientId,
  originalFechaHora // ✅ Recibimos la fecha actual de la cita
}: { 
  appointmentId: string, 
  patientId: string,
  originalFechaHora: Date | string | undefined // ✅ Soportamos string por la serialización de Next.js
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); 
  const [isOpen, setIsOpen] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🛡️ VALIDACIÓN DE FECHA: Evita el RangeError
  const fechaValida = originalFechaHora ? new Date(originalFechaHora) : new Date();
  const esFechaReal = isValid(fechaValida);
  
  // 🕒 Valores por defecto basados en la cita actual
 const [newDate, setNewDate] = useState(esFechaReal ? format(fechaValida, "yyyy-MM-dd") : "");
  const [newTime, setNewTime] = useState(esFechaReal ? format(fechaValida, "HH:mm") : "");
  // 🔒 Candados de tiempo actual
  const ahora = new Date();
  const todayStr = format(ahora, "yyyy-MM-dd");
  const currentTimeStr = format(ahora, "HH:mm");

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsOpen(!isOpen);
  };

  const handleStatus = async (e: React.MouseEvent, status: string) => {
    e.stopPropagation();
    setLoading(true);
    const res = await actualizarCita(appointmentId, { status });
    if (res.success) {
      toast.success(`Estado actualizado: ${status}`);
      startTransition(() => { router.refresh(); });
      setIsOpen(false);
    } else {
      toast.error(res.error || "Error al actualizar");
    }
    setLoading(false);
  };

  const handleReschedule = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!newDate || !newTime) return toast.error("Selecciona fecha y hora");
    
    // 🔒 Validación extra en cliente
    const seleccion = new Date(`${newDate}T${newTime}`);
    if (seleccion < ahora) {
      return toast.error("No puedes reagendar al pasado.");
    }

    setLoading(true);
    const res = await actualizarCita(appointmentId, { fecha: newDate, hora: newTime });
    
    if (res.success) {
      toast.success("Cita reagendada con éxito");
      startTransition(() => { router.refresh(); });
      setShowReschedule(false);
      setIsOpen(false);
    } else {
      toast.error(res.error || "Fallo al reagendar");
    }
    setLoading(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleMenu} 
        disabled={loading || isPending}
        className="p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-400 disabled:opacity-50"
      >
        {loading || isPending ? <Loader2 size={20} className="animate-spin" /> : <MoreVertical size={20} />}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div 
            onClick={(e) => e.stopPropagation()} 
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
                <div className="p-2 space-y-2 bg-gray-50 rounded-2xl mx-1 border border-gray-100">
                  <div className="px-2">
                    <label className="text-[8px] font-black text-gray-400 uppercase">Fecha</label>
                    <input 
                      type="date" 
                      min={todayStr} // 🔒 CANDADO: Bloquea días anteriores a hoy
                      className="nutri-input text-[10px] p-2" 
                      value={newDate} 
                      onChange={(e) => setNewDate(e.target.value)} 
                    />
                  </div>
                  <div className="px-2 pb-1">
                    <label className="text-[8px] font-black text-gray-400 uppercase">Hora</label>
                    <input 
                      type="time" 
                      // 🔒 CANDADO: Bloquea horas pasadas si la fecha es hoy
                      min={newDate === todayStr ? currentTimeStr : undefined}
                      className="nutri-input text-[10px] p-2" 
                      value={newTime} 
                      onChange={(e) => setNewTime(e.target.value)} 
                    />
                  </div>
                  <button onClick={handleReschedule} disabled={loading} className="w-full bg-nutri-main text-white py-2 rounded-xl text-[10px] font-bold shadow-sm">
                    {loading ? "..." : "Confirmar"}
                  </button>
                </div>
              )}

              <div className="h-px bg-gray-50 my-1" />

              <button 
                onClick={(e) => handleStatus(e, "CANCELADA")} 
                disabled={loading || isPending}
                className="w-full flex items-center gap-3 p-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all disabled:opacity-50"
              >
                <XCircle size={16} /> Cancelar cita
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}