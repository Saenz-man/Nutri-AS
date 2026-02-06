// src/app/(dashboard)/Pacientes/[id]/calculo/components/ModalExito.tsx
import { CheckCircle2, FileDown, History } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModalExito({ show, onClose, pacienteId, downloadLink }: any) {
  const router = useRouter();
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl text-center space-y-8 animate-in zoom-in-95">
        <div className="relative w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>

        <h3 className="text-2xl font-black text-gray-800 uppercase italic">¡Plan Sincronizado!</h3>

        <div className="flex flex-col gap-3">
          <button 
            onClick={() => router.push(`/dashboard/Pacientes/${pacienteId}/historia`)}
            className="w-full bg-gray-900 text-white p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <History size={16} /> Ver en Historial
          </button>
          
          {/* ✅ BOTÓN DE DESCARGA DIRECTO */}
          {downloadLink && (
             <div className="w-full bg-white text-gray-800 border-2 border-gray-100 p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                <FileDown size={16} className="text-nutri-main" />
                {downloadLink}
             </div>
          )}
          
          <button onClick={onClose} className="mt-2 text-[9px] font-black text-gray-300 uppercase tracking-widest hover:text-nutri-main underline">
            Seguir editando
          </button>
        </div>
      </div>
    </div>
  );
}