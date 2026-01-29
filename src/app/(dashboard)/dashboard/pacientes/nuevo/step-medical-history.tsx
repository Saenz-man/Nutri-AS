"use client";

import { Heart } from "lucide-react";

export default function StepMedicalHistory({ register, watchCirugias }: any) {
  return (
    <div className="glass-card p-8 md:p-12 rounded-4xl space-y-10 animate-in slide-in-from-right-4">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Heart className="text-nutri-orange" size={24} /> Antecedentes Familiares
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {["Diabetes", "HTA", "Cáncer", "Obesidad", "Enf. Renal"].map((item) => (
            <label key={item} className="flex items-center gap-3 p-4 border border-gray-100 rounded-2xl hover:bg-nutri-light transition-all cursor-pointer">
              <input type="checkbox" value={item} {...register("antecedentesFamiliares")} className="w-5 h-5 accent-nutri-main" />
              <span className="font-bold text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Cirugías</h3>
        <div className="flex gap-4 mb-6">
          <label className="flex-1">
            <input type="radio" value="true" {...register("cirugias")} className="hidden peer" />
            <div className="p-4 border border-gray-100 rounded-2xl text-center font-bold peer-checked:bg-nutri-main peer-checked:text-white transition-all cursor-pointer hover:bg-gray-50">Sí</div>
          </label>
          <label className="flex-1">
            <input type="radio" value="false" {...register("cirugias")} className="hidden peer" />
            <div className="p-4 border border-gray-100 rounded-2xl text-center font-bold peer-checked:bg-nutri-main peer-checked:text-white transition-all cursor-pointer hover:bg-gray-50">No</div>
          </label>
        </div>
        {watchCirugias === "true" && (
          <input {...register("cirugiasDetalle")} placeholder="¿Qué tipo de cirugía?" className="nutri-input animate-in fade-in" />
        )}
      </div>
    </div>
  );
}