"use client";

import { ArrowLeft, UserCircle, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  paciente: any;
  edad: number;
  isStatusLoading: boolean;
  onToggleStatus: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ExpedienteHeader({ paciente, edad, isStatusLoading, onToggleStatus, onEdit, onDelete }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-4xl border border-gray-100 shadow-sm relative">
      <div className="flex items-center gap-6">
        <button onClick={() => router.push("/dashboard/pacientes")} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-400 hover:text-nutri-main transition-all group">
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 rounded-3xl overflow-hidden bg-gray-100 border-4 border-white shadow-md">
            {paciente.foto ? <Image src={paciente.foto} alt={paciente.nombre} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><UserCircle size={40} /></div>}
          </div>
          <div>
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest mb-1">Folio: {paciente.expediente}</p>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 font-display">{paciente.nombre} {paciente.apellido}</h1>
              <div className="flex gap-2">
                <button onClick={onEdit} className="p-2 rounded-full hover:bg-gray-100 text-gray-300 hover:text-nutri-main transition-all"><Pencil size={18} /></button>
                <button onClick={onDelete} className="p-2 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
            <p className="text-xs font-bold text-gray-400 capitalize">{paciente.sexo || "Sexo no definido"} | {edad > 0 ? `${edad} Años` : "Sin edad registrada"}</p>
          </div>
        </div>
      </div>

      <button onClick={onToggleStatus} disabled={isStatusLoading} className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${paciente.status === 'ACTIVO' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
        <div className={`w-3 h-3 rounded-full ${paciente.status === 'ACTIVO' ? 'bg-green-500' : 'bg-gray-400'}`} />
        <span className="font-bold text-sm uppercase tracking-tighter">{paciente.status}</span>
      </button>
    </div>
  );
}