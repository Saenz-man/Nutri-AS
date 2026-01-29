"use client";

import { Camera, User } from "lucide-react";

export default function StepGeneralData({ register, errors, photoPreview, setPhotoPreview }: any) {
  return (
    <div className="glass-card p-8 md:p-12 rounded-4xl space-y-10 animate-in slide-in-from-right-4">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="flex flex-col items-center gap-3">
          <div className="w-32 h-32 rounded-full border-4 border-nutri-light bg-gray-50 flex items-center justify-center overflow-hidden relative group">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-gray-300" />
            )}
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera className="text-white" />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => setPhotoPreview(URL.createObjectURL(e.target.files![0]))} 
              />
            </label>
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Foto del Paciente</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          <div className="space-y-1">
            <input {...register("nombre")} placeholder="Nombre(s)" className="nutri-input" />
            {errors.nombre && <p className="text-red-500 text-xs font-bold">{errors.nombre.message}</p>}
          </div>
          <div className="space-y-1">
            <input {...register("apellido")} placeholder="Apellidos" className="nutri-input" />
            {errors.apellido && <p className="text-red-500 text-xs font-bold">{errors.apellido.message}</p>}
          </div>
          <input {...register("fechaNacimiento")} type="date" className="nutri-input" />
          <input {...register("telefono")} placeholder="Teléfono (10 dígitos)" className="nutri-input" />
          <input {...register("expediente")} placeholder="No. de Expediente" className="nutri-input" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="font-bold text-gray-700 ml-1">Motivo de Consulta</label>
        <textarea {...register("motivoConsulta")} rows={4} className="nutri-input resize-none" placeholder="Describe el motivo de la visita..." />
      </div>
    </div>
  );
}