"use client";

import { X, Pencil, UserCircle, Calendar, VenusAndMars, Ruler, Loader2, Save, Mail, Phone, Hash, ChevronDown } from "lucide-react";
import { useMemo } from "react";

// Función de cálculo preciso
const calcularEdadLive = (fecha: string) => {
  if (!fecha) return 0;
  const hoy = new Date();
  const cumple = new Date(fecha);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  if (hoy.getMonth() < cumple.getMonth() || (hoy.getMonth() === cumple.getMonth() && hoy.getDate() < cumple.getDate())) edad--;
  return edad;
};

export default function ModalEditarPaciente({ isOpen, onClose, editData, setEditData, onSave, isSaving }: any) {
  const edadActual = useMemo(() => calcularEdadLive(editData.fechaNacimiento), [editData.fechaNacimiento]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-gray-100 animate-in zoom-in-95 duration-300">
        
        {/* 🏔️ HEADER PREMIUM */}
        <div className="bg-gray-50/50 px-10 py-8 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-nutri-main rounded-2xl flex items-center justify-center text-white shadow-lg shadow-nutri-main/20">
              <Pencil size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-nutri-main uppercase tracking-[0.2em] mb-1">Configuración de Perfil</p>
              <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Editar Expediente</h2>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-red-50 rounded-2xl text-gray-400 hover:text-red-500 transition-all active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* 📱 SECCIÓN: CONTACTO & IDENTIDAD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2 flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-gray-100" />
              <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Información de Contacto</h3>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 italic tracking-widest">Nombre(s)</label>
              <input 
                value={editData.nombre} 
                onChange={e => setEditData({...editData, nombre: e.target.value})} 
                className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-nutri-main/30 focus:ring-4 focus:ring-nutri-main/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-700 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 italic tracking-widest">Apellidos</label>
              <input 
                value={editData.apellido} 
                onChange={e => setEditData({...editData, apellido: e.target.value})} 
                className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-nutri-main/30 focus:ring-4 focus:ring-nutri-main/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-700 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 italic tracking-widest">Correo Electrónico</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-nutri-main transition-colors" size={18} />
                <input 
                  value={editData.email} 
                  onChange={e => setEditData({...editData, email: e.target.value})} 
                  className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-nutri-main/30 focus:ring-4 focus:ring-nutri-main/5 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-gray-700 transition-all outline-none"
                  placeholder="ejemplo@nutrias.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 italic tracking-widest">Teléfono Directo</label>
              <div className="relative group">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-nutri-main transition-colors" size={18} />
                <input 
                  value={editData.telefono} 
                  onChange={e => setEditData({...editData, telefono: e.target.value})} 
                  className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-nutri-main/30 focus:ring-4 focus:ring-nutri-main/5 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-gray-700 transition-all outline-none"
                  placeholder="55 0000 0000"
                />
              </div>
            </div>
          </div>

          {/* 🧬 SECCIÓN: DATOS CLÍNICOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3 flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-gray-100" />
              <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Parámetros Clínicos Base</h3>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 italic tracking-widest">Nacimiento</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={editData.fechaNacimiento} 
                  onChange={e => setEditData({...editData, fechaNacimiento: e.target.value})} 
                  className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-nutri-main/30 rounded-2xl px-5 py-4 text-sm font-bold text-gray-700 outline-none transition-all"
                />
                <div className="absolute right-4 -top-3 bg-white px-2 py-0.5 rounded-lg border border-gray-100 shadow-sm">
                  <span className="text-[9px] font-black text-nutri-main">{edadActual} AÑOS</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 italic tracking-widest">Sexo</label>
              <div className="relative group">
                <select 
                  value={editData.sexo} 
                  onChange={e => setEditData({...editData, sexo: e.target.value})} 
                  className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-nutri-main/30 rounded-2xl px-5 py-4 text-sm font-bold text-gray-700 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="MUJER">Mujer</option>
                  <option value="HOMBRE">Hombre</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 italic tracking-widest">Talla (cm)</label>
              <div className="relative group">
                <Ruler className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-nutri-main transition-colors" size={18} />
                <input 
                  type="number" 
                  value={editData.talla} 
                  onChange={e => setEditData({...editData, talla: e.target.value})} 
                  className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-nutri-main/30 rounded-2xl pl-14 pr-5 py-4 text-sm font-bold text-gray-700 outline-none transition-all"
                  placeholder="160"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 🚀 ACTION FOOTER */}
        <div className="p-10 pt-0">
          <button 
            onClick={onSave} 
            disabled={isSaving} 
            className="w-full bg-gray-900 text-white py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-black hover:shadow-2xl hover:shadow-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {isSaving ? "Sincronizando Datos..." : "Actualizar Expediente"}
          </button>
        </div>
      </div>
    </div>
  );
}