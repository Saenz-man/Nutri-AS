
"use client";

import { Calendar, Activity, Utensils, ClipboardList } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function ConsultaTimeline({ appointments }: { appointments: any[] }) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm h-full">
      <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <Calendar className="text-nutri-main" size={24} /> Línea de Tiempo
      </h2>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-100 before:to-transparent">
        {appointments.map((app, index) => (
          <div key={app.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Círculo indicador */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-50 text-nutri-main shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors group-hover:bg-nutri-main group-hover:text-white">
              <ClipboardList size={18} />
            </div>

            {/* Tarjeta de Contenido */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl border border-gray-50 shadow-sm group-hover:border-nutri-main/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <time className="font-black text-[10px] uppercase text-nutri-main tracking-widest">
                  {format(new Date(app.fechaHora), "dd MMMM, yyyy", { locale: es })}
                </time>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded-lg text-gray-500">{app.status}</span>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-700 font-medium italic">"{app.motivo}"</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Resumen Mediciones */}
                  <div className="bg-green-50/50 p-3 rounded-2xl flex items-center gap-2">
                    <Activity className="text-green-500" size={14} />
                    <span className="text-xs font-bold text-green-700">
                      {app.medicion ? `${app.medicion.peso}kg / IMC ${app.medicion.imc}` : "Sin datos"}
                    </span>
                  </div>
                  {/* Resumen R24 */}
                  <div className="bg-orange-50/50 p-3 rounded-2xl flex items-center gap-2">
                    <Utensils className="text-orange-500" size={14} />
                    <span className="text-xs font-bold text-orange-700">
                      {app.r24 ? `${app.r24.consumoKcal} kcal` : "Sin R24"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}