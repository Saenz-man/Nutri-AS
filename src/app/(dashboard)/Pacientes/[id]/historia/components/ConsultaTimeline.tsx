// src/app/(dashboard)/Pacientes/[id]/historia/components/ConsultaTimeline.tsx
"use client";

import { Activity, Beaker, ChevronRight, CalendarDays } from "lucide-react";

export default function ConsultaTimeline({ appointments }: { appointments: any[] }) {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-gray-100">
      {appointments.map((app) => {
        // Verificamos qué datos existen realmente en la base
        const tieneMedicion = !!app.medicion;
        const tieneLabs = !!app.laboratorios;

        return (
          <div key={app.id} className="relative flex items-start group">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center z-10 group-hover:border-nutri-main transition-all shadow-sm">
              <CalendarDays size={16} className="text-gray-300 group-hover:text-nutri-main" />
            </div>

            <div className="ml-6 flex-1 bg-white border border-gray-100 p-6 rounded-4xl shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {new Date(app.fechaHora).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
                <span className="px-3 py-1 bg-gray-50 rounded-full text-[9px] font-black text-gray-400 uppercase italic">
                  {app.status}
                </span>
              </div>

              <h3 className="font-bold text-gray-800 italic mb-4">"{app.motivo}"</h3>

              {/* 🛡️ Solo mostramos los bloques si existen registros en la base de datos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tieneMedicion && (
                  <div className="p-4 rounded-3xl border bg-green-50/30 border-green-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity size={14} className="text-green-500" />
                      <span className="text-[9px] font-black text-green-600 uppercase">Antropometría</span>
                    </div>
                    <p className="text-xs font-bold text-gray-700">
                      Peso: {app.medicion.peso}kg | IMC: {app.medicion.imc}
                    </p>
                  </div>
                )}

                {tieneLabs && (
                  <div className="p-4 rounded-3xl border bg-purple-50/30 border-purple-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Beaker size={14} className="text-purple-500" />
                      <span className="text-[9px] font-black text-purple-600 uppercase">Laboratorios</span>
                    </div>
                    <p className="text-xs font-bold text-gray-700">
                      Glucosa: {app.laboratorios.glucosaAyuno} | Colesterol: {app.laboratorios.colesterolTotal}
                    </p>
                  </div>
                )}
              </div>

              <button className="mt-4 flex items-center gap-1 text-[10px] font-black text-nutri-main uppercase hover:gap-2 transition-all">
                Detalle completo de consulta <ChevronRight size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}