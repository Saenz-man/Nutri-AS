"use client";

import { useState } from "react";
import { ChevronDown, LineChart, Apple } from "lucide-react";
import { format } from "date-fns";

export default function HistorialAccordions({ appointments }: { appointments: any[] }) {
  const [openSection, setOpenSection] = useState<string | null>("charts");

  const toggle = (id: string) => setOpenSection(openSection === id ? null : id);

  return (
    <div className="space-y-4">
      {/* 📏 Gráficas de Antropometría */}
      <div className="bg-white rounded-4xl border border-gray-100 overflow-hidden">
        <button onClick={() => toggle('charts')} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-green-500 rounded-2xl"><LineChart size={20} /></div>
            <span className="font-bold text-gray-900">Curva de Antropometría</span>
          </div>
          <ChevronDown className={`transition-transform ${openSection === 'charts' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'charts' && (
          <div className="px-6 pb-6 text-center py-10">
            <p className="text-gray-400 text-sm font-medium italic">Gráfica de evolución de peso activa próximamente...</p>
          </div>
        )}
      </div>

      {/* 🍎 Evolución Dietética */}
      <div className="bg-white rounded-4xl border border-gray-100 overflow-hidden">
        <button onClick={() => toggle('diets')} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl"><Apple size={20} /></div>
            <span className="font-bold text-gray-900">Evolución Dietética</span>
          </div>
          <ChevronDown className={`transition-transform ${openSection === 'diets' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'diets' && (
          <div className="px-6 pb-6 space-y-3">
            {appointments.map(app => app.plan && (
              <div key={app.id} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between group">
                <div>
                  <p className="text-xs font-black text-purple-600 uppercase tracking-widest">{format(new Date(app.fechaHora), "dd MMM")}</p>
                  <p className="font-bold text-gray-800">{app.plan.nombre}</p>
                </div>
                <button className="text-nutri-main font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalles</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}