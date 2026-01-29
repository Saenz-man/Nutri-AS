"use client";

import { useState } from "react";
import { Calendar, Clock, Plus, Loader2, CheckCircle2 } from "lucide-react";
import { agendarCita } from "@/lib/actions/appointments";
import { toast } from "sonner";

export default function ProximaCita({ patientId }: { patientId: string }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [loading, setLoading] = useState(false);
  const [agendada, setAgendada] = useState(false);

  const handleAgendar = async () => {
    if (!fecha || !hora) return toast.error("Selecciona fecha y hora");
    
    setLoading(true);
    const res = await agendarCita(patientId, fecha, hora);
    setLoading(false);

    if (res.success) {
      setAgendada(true);
      toast.success("¡Cita agendada correctamente!");
    } else {
      toast.error(res.error || "Fallo al agendar");
    }
  };

  if (agendada) {
    return (
      <div className="bg-green-50 p-4 rounded-3xl border border-green-100 flex items-center gap-3 animate-in zoom-in">
        <CheckCircle2 className="text-green-500" />
        <p className="text-green-700 font-bold text-sm">Cita agendada con éxito</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
        <Calendar size={12} /> Próxima Cita
      </p>
      
      <div className="space-y-3">
        <input 
          type="date" 
          className="nutri-input text-sm p-3" 
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <input 
          type="time" 
          className="nutri-input text-sm p-3" 
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
        
        <button 
          onClick={handleAgendar}
          disabled={loading}
          className="w-full bg-nutri-main/10 text-nutri-main py-3 rounded-2xl font-bold text-xs hover:bg-nutri-main hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
          {loading ? "Agendando..." : "Agregar Próxima Cita"}
        </button>
      </div>
    </div>
  );
}