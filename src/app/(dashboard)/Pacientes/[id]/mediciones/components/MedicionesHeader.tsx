"use client";

import { ArrowLeft, Calendar, Save, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * 📝 INTERFAZ DE PROPIEDADES (HeaderProps)
 * Definimos el contrato del componente. Nota que 'setFecha' ha sido eliminado
 * para cumplir con la regla de integridad de fecha.
 */
interface MedicionesHeaderProps {
  id: string;
  onSave: () => Promise<void>;
  isSaving: boolean;
  fecha: string;      // Fecha del día transcurriendo
  hasChanges?: boolean;
  isEditing?: boolean; // Determina el texto del título y botón
}

export default function MedicionesHeader({ 
  id, 
  onSave, 
  isSaving, 
  fecha, 
  hasChanges,
  isEditing 
}: MedicionesHeaderProps) {
  const router = useRouter();

  /**
   * 📅 FORMATEO DE FECHA
   * Convierte la fecha ISO (AAAA-MM-DD) a un formato humano y profesional.
   * Ejemplo: "05 de febrero de 2026".
   */
  const fechaDisplay = new Date(fecha + "T00:00:00").toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  /**
   * ⬅️ GESTIÓN DE SALIDA (Botón Atrás)
   * Si el nutriólogo hizo cambios y no guardó, lanzamos una alerta de seguridad
   * para evitar pérdida de datos biométricos.
   */
  const handleBack = () => {
    if (hasChanges) {
      const confirm = window.confirm("Tienes cambios sin guardar en la evaluación. ¿Deseas salir?");
      if (!confirm) return;
    }
    router.push(`/dashboard/pacientes/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
      
      {/* 🏷️ SECCIÓN IZQUIERDA: Títulos y Navegación */}
      <div className="flex items-center gap-6">
        <button 
          onClick={handleBack} 
          className="p-4 rounded-2xl bg-gray-50 text-gray-400 hover:text-nutri-main transition-all group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <p className="text-[10px] font-black text-nutri-main uppercase tracking-[0.2em]">Módulo Clínico</p>
          <h1 className="text-2xl font-bold text-gray-900 uppercase italic tracking-tighter">
            {isEditing ? "Editar Medición" : "Nueva Medición"}
          </h1>
        </div>
      </div>
      
      {/* ⚙️ SECCIÓN DERECHA: Fecha Blindada y Guardado */}
      <div className="flex items-center gap-4">
        
     
        <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 cursor-default group">
          <Calendar size={18} className="text-gray-400 group-hover:text-nutri-main transition-colors" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter flex items-center gap-1">
              Registro del día <Lock size={8} className="opacity-50" />
            </span>
            <span className="text-xs font-black text-gray-800 italic uppercase">
              {fechaDisplay}
            </span>
          </div>
        </div>

        <button 
          onClick={onSave} 
          disabled={isSaving}
          className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-black hover:scale-[1.02] transition-all shadow-xl shadow-gray-200 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          <span>
            {isSaving ? "Sincronizando..." : isEditing ? "Actualizar Registro" : "Guardar Medición"}
          </span>
        </button>
      </div>
    </div>
  );
}