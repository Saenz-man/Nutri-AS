import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ModalExitoProps {
  show: boolean;
  onClose: () => void;
  pacienteId: string;
}

export default function ModalExito({ show, onClose, pacienteId }: ModalExitoProps) {
  const router = useRouter();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300 border border-gray-100">
        
        {/* ICONO DE ÉXITO */}
        <div className="relative w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
          <CheckCircle2 size={48} className="text-green-500 relative z-10" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-gray-800 tracking-tighter uppercase italic">¡Plan Sincronizado!</h3>
          <p className="text-xs font-bold text-gray-400 italic">
            El cálculo dietético se ha guardado en el historial del paciente correctamente.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={() => router.push(`/dashboard/Pacientes/${pacienteId}/historia`)}
            className="w-full bg-gray-900 text-white p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition-all hover:scale-[1.02] active:scale-95"
          >
            Ver en Historial
          </button>
          
          <button 
            onClick={onClose} 
            className="text-[10px] font-black text-gray-300 uppercase hover:text-gray-500 transition-colors"
          >
            Seguir editando
          </button>
        </div>
      </div>
    </div>
  );
}