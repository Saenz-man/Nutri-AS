import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CalculadoraHeader({ id, onSave, isSaving }: any) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-4xl border border-gray-100 shadow-sm gap-4">
      <div className="flex items-center gap-6">
        <Link href={`/dashboard/Pacientes/${id}`} className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Calculadora Dietética</p>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter italic">Cálculo Personalizado</h1>
        </div>
      </div>
      <button 
        onClick={onSave}
        disabled={isSaving}
        className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition-all disabled:opacity-50"
      >
        {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
        {isSaving ? "Guardando..." : "Guardar Plan Alimenticio"}
      </button>
    </div>
  );
}