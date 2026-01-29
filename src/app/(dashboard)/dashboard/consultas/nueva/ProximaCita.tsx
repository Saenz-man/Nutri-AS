// src/app/(dashboard)/consultas/nueva/components/ProximaCita.tsx
"use client";

import { useState } from "react";
import { Calendar, Clock, Plus } from "lucide-react";
import { format } from "date-fns";
import { agendarCita } from "@/lib/actions/appointments";
import { toast } from "sonner";

export default function ProximaCita({ patientId }: { patientId: string }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 CANDADOS DE TIEMPO
  const ahora = new Date();
  const todayStr = format(ahora, "yyyy-MM-dd");
  const currentTimeStr = format(ahora, "HH:mm");

  const handleAgendar = async () => {
    if (!date || !time) return toast.error("Selecciona fecha y hora para la próxima cita.");
    
    setLoading(true);
    const res = await agendarCita(patientId, date, time);
    
    if (res.success) {
      toast.success("Próxima cita agendada.");
      setDate("");
      setTime("");
    } else {
      toast.error(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4 border-t border-gray-50 pt-6">
      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 italic">
        <Calendar size={14} /> Próxima Cita
      </h3>
      
      <div className="space-y-3">
        <div className="relative">
          <input 
            type="date" 
            min={todayStr} // 🔒 Bloquea días pasados
            className="nutri-input text-xs font-bold pl-4 py-3 border-2 border-gray-50 focus:border-nutri-main transition-all" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>

        <div className="relative">
          <input 
            type="time" 
            // 🔒 Bloquea horas pasadas si la fecha es hoy
            min={date === todayStr ? currentTimeStr : undefined}
            className="nutri-input text-xs font-bold pl-4 py-3 border-2 border-gray-50 focus:border-nutri-main transition-all" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
          />
        </div>

        <button 
          onClick={handleAgendar}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-nutri-main/10 text-nutri-main p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-nutri-main hover:text-white transition-all group"
        >
          {loading ? "..." : <Plus size={16} className="group-hover:rotate-90 transition-transform"/>}
          Agregar Próxima Cita
        </button>
      </div>
    </div>
  );
}