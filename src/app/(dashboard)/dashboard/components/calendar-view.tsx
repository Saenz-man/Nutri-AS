"use client";

import { useState, useEffect } from "react";
import { 
  ChevronLeft, ChevronRight, Clock, User, 
  Loader2, Calendar as CalendarIcon 
} from "lucide-react";
import { 
  format, addMonths, subMonths, startOfMonth, 
  endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, 
  isSameMonth, isSameDay, addYears, subYears 
} from "date-fns";
import { es } from "date-fns/locale";
import { buscarPacientesAction } from "@/lib/actions/pacientes";
import { agendarCita } from "@/lib/actions/appointments";
import { toast } from "sonner";

export default function CalendarView() {
  // 1. ESTADOS DE NAVEGACIÓN Y SELECCIÓN
  const [viewDate, setViewDate] = useState(new Date()); // Mes/Año que se está viendo
  const [selectedDate, setSelectedDate] = useState(new Date()); // Día seleccionado para agendar
  
  // Estados para el formulario de agendamiento
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // 2. GENERACIÓN DE DÍAS DEL CALENDARIO DINÁMICO
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart); // Para incluir días del mes anterior y alinear
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // 3. FUNCIONES DE NAVEGACIÓN
  const nextMonth = () => setViewDate(addMonths(viewDate, 1));
  const prevMonth = () => setViewDate(subMonths(viewDate, 1));
  const nextYear = () => setViewDate(addYears(viewDate, 1));
  const prevYear = () => setViewDate(subYears(viewDate, 1));

  // 4. BÚSQUEDA DE PACIENTES (Debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2 && !selectedPatient) {
        setIsSearching(true);
        const res = await buscarPacientesAction(searchQuery);
        if (res.success) setSearchResults(res.pacientes || []);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedPatient]);

  // 5. LÓGICA PARA AGENDAR
  const handleAgendar = async () => {
    if (!selectedPatient || !appointmentTime) {
      return toast.error("Selecciona un paciente y un horario");
    }

    setLoading(true);
    const fechaStr = format(selectedDate, "yyyy-MM-dd");
    const res = await agendarCita(selectedPatient.id, fechaStr, appointmentTime);
    setLoading(false);

    if (res.success) {
      toast.success(`Cita agendada con éxito`);
      setSelectedPatient(null);
      setSearchQuery("");
      setAppointmentTime("");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="glass-card p-6 rounded-4xl space-y-8 animate-in fade-in duration-500">
      
      {/* CABECERA: Mes y Año con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 capitalize">
            {format(viewDate, "MMMM yyyy", { locale: es })}
          </h2>
          <div className="flex gap-4 mt-1">
             <button onClick={prevYear} className="text-[10px] font-black uppercase text-gray-400 hover:text-nutri-main">« Año Ant.</button>
             <button onClick={nextYear} className="text-[10px] font-black uppercase text-gray-400 hover:text-nutri-main">Año Sig. »</button>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-all"><ChevronLeft size={20} /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-all"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* DÍAS DE LA SEMANA */}
      <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(d => <div key={d}>{d}</div>)}
      </div>
      
      {/* CUADRÍCULA DINÁMICA DE DÍAS */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = isSameDay(day, selectedDate);
          
          return (
            <button 
              key={i} 
              onClick={() => {
                setSelectedDate(day);
                if (!isCurrentMonth) setViewDate(day); // Cambia de mes si clicamos un día gris
              }}
              className={`h-10 w-full rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
                isSelected 
                  ? 'bg-nutri-main text-white shadow-lg scale-110' 
                  : isCurrentMonth 
                    ? 'hover:bg-nutri-light text-gray-700' 
                    : 'text-gray-200' // Días fuera del mes actual
              }`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* FORMULARIO DE AGENDAMIENTO RÁPIDO */}
      <div className="pt-6 border-t border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-gray-900">
            Agendar para: <span className="text-nutri-main">{format(selectedDate, "dd 'de' MMMM", { locale: es })}</span>
          </p>
          <button 
            onClick={() => { setSelectedPatient(null); setSearchQuery(""); }} 
            className="text-[10px] font-black uppercase text-gray-400 hover:text-red-500"
          >
            Limpiar
          </button>
        </div>

        {/* Buscador de Paciente */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder={selectedPatient ? `${selectedPatient.nombre} ${selectedPatient.apellido}` : "Buscar paciente..."}
            className={`nutri-input pl-12 text-sm ${selectedPatient ? 'bg-green-50 border-nutri-main' : ''}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!!selectedPatient}
          />
          {isSearching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-nutri-main" size={16} />}

          {/* Resultados Flotantes */}
          {searchResults.length > 0 && (
            <div className="absolute w-full mt-2 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 p-2 space-y-1 animate-in slide-in-from-top-2">
              {searchResults.map((p) => (
                <button 
                  key={p.id} 
                  onClick={() => { setSelectedPatient(p); setSearchResults([]); }}
                  className="w-full text-left p-3 hover:bg-nutri-light rounded-2xl font-bold text-xs transition-all"
                >
                  {p.nombre} {p.apellido} <span className="text-[10px] text-gray-400 ml-2">{p.expediente}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selección de Hora y Botón */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="time" 
              className="nutri-input pl-12 text-sm" 
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>
          <button 
            onClick={handleAgendar}
            disabled={loading || !selectedPatient}
            className="bg-nutri-orange text-white px-6 py-4 rounded-2xl font-bold text-xs shadow-lg shadow-orange-500/20 hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Agendar"}
          </button>
        </div>
      </div>
    </div>
  );
}