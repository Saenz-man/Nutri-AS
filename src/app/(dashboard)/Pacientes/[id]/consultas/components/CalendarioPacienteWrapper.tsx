"use client";

import { useState } from "react";
import Link from "next/link"; // ✅ Importación de Link (Error 2304)
import { 
  format, startOfMonth, endOfMonth, eachDayOfInterval, 
  isSameDay, isPast, isToday, addMonths, subMonths,
  startOfWeek, endOfWeek, isSameMonth
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus, PlayCircle, Calendar as CalIcon, Clock, 
    Activity, Beaker, ClipboardList, CalendarDays // ✅ Importaciones de Iconos (Error 2304/2552)
} from "lucide-react";

export default function CalendarioPacienteWrapper({ pacienteId, initialAppointments }: any) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 🗓️ Lógica de Calendario Real: Obtenemos el inicio y fin de la cuadrícula (semanas completas)
  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(startMonth);
  const calendarEnd = endOfWeek(endMonth);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // Función para buscar citas en un día específico
  const getAppForDay = (day: Date) => 
    initialAppointments.find((a: any) => isSameDay(new Date(a.fechaHora), day));

  const appointmentSelected = getAppForDay(selectedDate);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      {/* CUADRÍCULA DEL CALENDARIO */}
      <div className="lg:col-span-3 bg-white rounded-4xl border border-gray-100 p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-gray-800 capitalize flex items-center gap-3">
            <div className="p-2 bg-nutri-main/10 text-nutri-main rounded-xl">
              <CalIcon size={20} />
            </div>
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </h2>
          <div className="flex gap-2">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400"><ChevronLeft size={20}/></button>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400"><ChevronRight size={20}/></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-3xl overflow-hidden">
          {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map(d => (
            <div key={d} className="bg-gray-50 p-4 text-center text-[10px] font-black text-gray-400 uppercase">{d}</div>
          ))}
          
          {days.map(day => {
            const app = getAppForDay(day);
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isPastDay = isPast(day) && !isToday(day);
            
            return (
              <div 
                key={day.toString()} 
                onClick={() => setSelectedDate(day)}
                className={`bg-white min-h-[120px] p-4 cursor-pointer transition-all relative group ${
                  !isCurrentMonth ? 'bg-gray-50/50 opacity-30' : 'hover:bg-gray-50/50'
                } ${isSelected ? 'ring-2 ring-inset ring-nutri-main z-10' : ''}`}
              >
                <span className={`text-xs font-black ${
                  isToday(day) ? 'bg-nutri-main text-white px-2 py-1 rounded-lg' : 'text-gray-400'
                }`}>
                  {format(day, 'd')}
                </span>
                
                {app && (
                  <div className={`mt-3 p-2 rounded-xl border-2 text-[8px] font-black uppercase leading-tight shadow-sm ${
                    isPastDay 
                      ? 'bg-gray-50 border-gray-100 text-gray-400' 
                      : 'bg-blue-50 border-blue-100 text-blue-600'
                  }`}>
                    {app.motivo || "Consulta"}
                    <div className="flex items-center gap-1 mt-1 opacity-70">
                      <Clock size={8} />
                      {format(new Date(app.fechaHora), 'HH:mm')}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>


<aside className="space-y-6">
  {/* Botón de Acción Principal */}
  <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl hover:-translate-y-1">
    <Plus size={16} /> Agendar Nueva Cita
  </button>

  <div className="bg-white rounded-4xl border border-gray-100 p-6 shadow-sm space-y-6">
    <div className="text-center">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Día Seleccionado</p>
      <p className="text-sm font-black text-gray-800 capitalize">
        {format(selectedDate, "eeee dd 'de' MMMM", { locale: es })}
      </p>
    </div>
    
    <div className="h-px bg-gray-50 w-full" />

    {appointmentSelected ? (
      <div className="space-y-4">
        {/* Encabezado de la Cita */}
        <div className="space-y-1">
          <p className="text-[9px] font-black text-nutri-main uppercase">Motivo de Consulta</p>
          <p className="text-xs font-bold text-gray-700 italic">"{appointmentSelected.motivo}"</p>
        </div>

        {/* 📊 RESUMEN DE RESULTADOS (Solo si existen en BD) */}
        <div className="space-y-3">
          {appointmentSelected.medicion && (
            <div className="p-4 bg-green-50/50 border border-green-100 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={14} className="text-green-500" />
                <span className="text-[9px] font-black text-green-600 uppercase">Resultado Antropometría</span>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-lg font-black text-gray-800">{appointmentSelected.medicion.peso} <span className="text-[10px] text-gray-400">kg</span></p>
                <p className="text-[10px] font-bold text-gray-500">IMC: {appointmentSelected.medicion.imc}</p>
              </div>
            </div>
          )}

          {appointmentSelected.laboratorios && (
            <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Beaker size={14} className="text-purple-500" />
                <span className="text-[9px] font-black text-purple-600 uppercase">Resultado Laboratorios</span>
              </div>
              <p className="text-[10px] font-bold text-gray-700">
                Glucosa: <span className="font-black">{appointmentSelected.laboratorios.glucosaAyuno || '--'}</span>
              </p>
              <p className="text-[10px] font-bold text-gray-700">
                Colesterol: <span className="font-black">{appointmentSelected.laboratorios.colesterolTotal || '--'}</span>
              </p>
            </div>
          )}
        </div>

        {/* 🚀 BOTÓN DE ACCESO AL EXPEDIENTE */}
        <Link 
          href={`/dashboard/Pacientes/${pacienteId}/historia?consulta=${appointmentSelected.id}`}
          className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
        >
          <ClipboardList size={16} /> Ver Expediente de Consulta
        </Link>

        {/* Botón Iniciar solo si es Hoy */}
        {isToday(selectedDate) && (
          <button className="w-full flex items-center justify-center gap-2 bg-nutri-main text-white p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-green-200 transition-all">
            <PlayCircle size={18} /> Iniciar Consulta de Hoy
          </button>
        )}
      </div>
    ) : (
      <div className="text-center py-10">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <CalendarDays size={20} className="text-gray-200" />
        </div>
        <p className="text-[10px] font-bold text-gray-300 uppercase italic">Sin actividad registrada</p>
      </div>
    )}
  </div>
</aside>
    </div>
  );
}