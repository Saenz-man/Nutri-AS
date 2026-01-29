"use client";

import { Camera, User, VenusAndMars } from "lucide-react";

export default function StepGeneralData({ register, errors, photoPreview, setPhotoPreview }: any) {
  return (
    <div className="glass-card p-8 md:p-12 rounded-4xl space-y-10 animate-in slide-in-from-right-4">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* FOTO DEL PACIENTE */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-32 h-32 rounded-full border-4 border-nutri-light bg-gray-50 flex items-center justify-center overflow-hidden relative group shadow-inner">
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
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center italic">Foto de Perfil</span>
        </div>

        {/* FORMULARIO DE DATOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Nombre(s)</label>
            <input {...register("nombre")} placeholder="Ej. Evolet" className="nutri-input" />
            {errors.nombre && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.nombre.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Apellidos</label>
            <input {...register("apellido")} placeholder="Ej. Saenz" className="nutri-input" />
            {errors.apellido && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.apellido.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Fecha de Nacimiento</label>
            <input {...register("fechaNacimiento")} type="date" className="nutri-input" />
          </div>

          {/* ✅ NUEVO CAMPO: SEXO PARA CÁLCULOS CLÍNICOS */}
          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Sexo Biológico</label>
            <select 
              {...register("sexo")} 
              className="nutri-input bg-white cursor-pointer font-bold appearance-none"
            >
              <option value="">Seleccionar...</option>
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
            </select>
            {errors.sexo && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.sexo.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Teléfono</label>
            <input {...register("telefono")} placeholder="461 000 0000" className="nutri-input" />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-400 uppercase ml-2">No. de Expediente</label>
            <input {...register("expediente")} placeholder="AS-0000" className="nutri-input" />
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-50">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 italic">Motivo de Consulta</label>
        <textarea 
          {...register("motivoConsulta")} 
          rows={3} 
          className="nutri-input resize-none italic" 
          placeholder="Describe brevemente por qué asiste el paciente..." 
        />
      </div>
    </div>
  );
}