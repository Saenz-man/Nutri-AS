// src/app/(dashboard)/Pacientes/[id]/mediciones/components/AntropometriaIsak.tsx
"use client";

import { Ruler, Thermometer } from "lucide-react";

export default function AntropometriaIsak({ values, handleChange }: any) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 space-y-8">
      {/* 🟢 SECCIÓN 1: BÁSICOS (4 Mediciones) */}
      <div className="space-y-6">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
          <span className="w-2 h-2 bg-green-500 rounded-full" /> Medidas Básicas
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Masa Corporal (kg)</label>
            <input name="peso" value={values.peso} onChange={handleChange} className="nutri-input" placeholder="0.0" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Talla (cm)</label>
            <input name="talla" value={values.talla} onChange={handleChange} className="nutri-input" placeholder="0.0" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Talla Sentado (cm)</label>
            <input name="tallaSentado" value={values.tallaSentado} onChange={handleChange} className="nutri-input" placeholder="0.0" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Envergadura (cm)</label>
            <input name="envergadura" value={values.envergadura} onChange={handleChange} className="nutri-input" placeholder="0.0" />
          </div>
        </div>
      </div>

      {/* 🔴 SECCIÓN 2: PANÍCULOS (8 Mediciones) */}
      <div className="space-y-6">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
          <span className="w-2 h-2 bg-red-500 rounded-full" /> Panículos Cutáneos (mm)
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: "triceps", label: "Tríceps" },
            { id: "subescapular", label: "Subescapular" },
            { id: "biceps", label: "Bíceps" },
            { id: "crestaIliaca", label: "Cresta Ilíaca" },
            { id: "supraespinal", label: "Supraespinal" },
            { id: "abdominal", label: "Abdominal" },
            { id: "muslo", label: "Muslo" },
            { id: "pierna", label: "Pierna" }
          ].map((fold) => (
            <div key={fold.id}>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2">{fold.label}</label>
              <input name={fold.id} value={values[fold.id]} onChange={handleChange} className="nutri-input border-red-50/50 focus:border-red-200" placeholder="0.0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}