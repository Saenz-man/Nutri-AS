"use client";

import { CheckCircle2, Zap, Users } from "lucide-react";

export default function PlanSuscripcion({ user }: { user: any }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-nutri-main to-nutri-teal p-8 rounded-[2rem] text-white shadow-lg shadow-nutri-main/20">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Plan Actual</span>
            <h3 className="text-4xl font-black mt-4">Profesional</h3>
            <p className="mt-2 text-white/80 font-medium">Estado: <span className="text-white font-bold">{user.status}</span></p>
          </div>
          <Zap size={48} className="text-white/30" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/30 flex items-center gap-4">
          <div className="bg-nutri-main/10 p-4 rounded-2xl text-nutri-main">
            <Users size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-tighter">Límite de Pacientes</p>
            <p className="text-xl font-black text-gray-900">{user.maxPatients} Pacientes Activos</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/30 flex items-center gap-4">
          <div className="bg-nutri-main/10 p-4 rounded-2xl text-nutri-main">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-tighter">Próximo Pago</p>
            <p className="text-xl font-black text-gray-900">18 de Julio, 2026</p>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center text-center">
        <p className="text-gray-500 font-medium mb-4">¿Necesitas gestionar más pacientes o cambiar tu método de pago?</p>
        <button className="text-nutri-main font-bold hover:underline">Contactar con soporte de facturación</button>
      </div>
    </div>
  );
}