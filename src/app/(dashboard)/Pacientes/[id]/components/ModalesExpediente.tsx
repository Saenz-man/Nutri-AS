import { UserCircle, Calendar, VenusAndMars, Ruler, Save, Loader2, X } from "lucide-react";

export function ModalEditarPaciente({ isOpen, onClose, data, setData, onSave, isSaving }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white rounded-[45px] w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100">
        <div className="bg-gray-50/50 px-10 py-8 border-b flex justify-between items-center">
          <h2 className="text-2xl font-black text-gray-800 uppercase italic">Editar Expediente</h2>
          <button onClick={onClose} className="p-3 hover:bg-red-50 rounded-2xl text-gray-400"><X size={24} /></button>
        </div>
        <div className="p-10 space-y-8">
          {/* Inputs de Nombre, Sexo, Talla, etc. usando data y setData */}
          <button onClick={onSave} disabled={isSaving} className="w-full bg-gray-900 text-white p-6 rounded-[30px] font-black uppercase tracking-widest flex items-center justify-center gap-4">
            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Actualizar Expediente
          </button>
        </div>
      </div>
    </div>
  );
}