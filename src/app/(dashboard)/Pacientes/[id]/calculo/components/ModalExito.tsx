// src/app/(dashboard)/Pacientes/[id]/calculo/components/ModalExito.tsx
import { CheckCircle2, FileDown, History, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModalExito({ show, onClose, pacienteId, downloadLink }: any) {
  const router = useRouter();
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md transition-all">
      {/* Contenedor principal con efecto de entrada */}
      <div className="bg-white rounded-[45px] p-10 max-w-sm w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Decoración de fondo sutil */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-nutri-main/5 rounded-full" />
        
        {/* Sección del Icono con animación de pulso */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping scale-75 opacity-20" />
          <div className="relative w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
        </div>

        {/* Texto de Éxito */}
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-gray-800 uppercase italic tracking-tight">
            ¡Plan Sincronizado!
          </h3>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
            Los cálculos se han guardado <br /> correctamente en el historial.
          </p>
        </div>

        {/* Acciones */}
        <div className="mt-10 flex flex-col gap-3">
          
          {/* ✅ ACCIÓN PRINCIPAL: DESCARGAR PDF */}
          {downloadLink && (
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-nutri-main to-green-400 rounded-[28px] blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative w-full bg-nutri-main text-white p-5 rounded-[25px] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                <FileDown size={18} />
                {downloadLink}
              </div>
            </div>
          )}

          {/* ACCIÓN SECUNDARIA: HISTORIAL */}
          <button 
            onClick={() => router.push(`/dashboard/Pacientes/${pacienteId}/historia`)}
            className="w-full bg-white text-gray-700 border-2 border-gray-100 p-5 rounded-[25px] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-200 transition-all"
          >
            <History size={18} className="text-gray-400" /> Ver Historial
          </button>
          
          {/* BOTÓN CERRAR / SEGUIR */}
          <button 
            onClick={onClose} 
            className="mt-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] hover:text-nutri-main transition-colors flex items-center justify-center gap-1 group"
          >
            Seguir editando
            <span className="block w-0 h-[1.5px] bg-nutri-main group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>

        {/* Botón X de cierre rápido */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-50 text-gray-300 hover:text-gray-500 transition-all"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}