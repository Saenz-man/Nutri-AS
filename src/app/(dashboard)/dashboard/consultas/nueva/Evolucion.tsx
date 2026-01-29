"use client";

import { FileText } from "lucide-react";

export default function Evolucion() {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4">
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subjetivo (Sensaciones)</label>
        <textarea rows={4} className="nutri-input resize-none" placeholder="¿Cómo se siente el paciente?" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Plan Alimenticio / Recomendaciones</label>
        <textarea rows={6} className="nutri-input resize-none" placeholder="Ajustes específicos para esta sesión..." />
      </div>
    </div>
  );
}