// src/app/(dashboard)/Pacientes/[id]/mediciones/components/ModalExito.tsx
import { CheckCircle2, FileDown, History, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModalExito({ show, onClose, pacienteId, downloadLink }: any) {
  const router = useRouter();
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-[45px] p-10 max-w-sm w-full shadow-2xl text-center relative animate-in fade-in zoom-in-95 duration-300">
        
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping scale-75 opacity-20" />
          <div className="relative w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-gray-800 uppercase italic tracking-tight">¡Registro Guardado!</h3>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
            La evaluación biométrica se ha <br /> sincronizado con éxito.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {/* Botón de Descarga de PDF */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-nutri-main to-green-400 rounded-[28px] blur opacity-25"></div>
            <div className="relative w-full bg-nutri-main text-white p-5 rounded-[25px] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
              <FileDown size={18} />
              {downloadLink}
            </div>
          </div>

          <button 
            onClick={() => router.push(`/dashboard/pacientes/${pacienteId}`)}
            className="w-full bg-white text-gray-700 border-2 border-gray-100 p-5 rounded-[25px] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
          >
            <History size={18} className="text-gray-400" /> Volver al Perfil
          </button>
        </div>

        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-300 hover:text-gray-500">
          <X size={20} />
        </button>
      </div>
    </div>
  );
}