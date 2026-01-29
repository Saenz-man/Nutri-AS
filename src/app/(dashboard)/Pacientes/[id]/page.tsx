"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, FileText, Clock, BarChart3, Calculator, 
  TestTube2, History, UserCircle, Loader2, ChevronRight, 
  Pencil, X, Save 
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { getPacienteById, actualizarPaciente } from "@/lib/actions/pacientes";
import { toast } from "sonner";

export default function ExpedientePacientePage() {
  const router = useRouter();
  const { id } = useParams();
  const [paciente, setPaciente] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Estados para Edición (Ajustados a tu Schema real)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({ 
    nombre: "", 
    apellido: "", 
    foto: "" 
  });

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await getPacienteById(id as string);
      if (res.success && res.paciente) {
        setPaciente(res.paciente);
        setEditData({ 
          nombre: res.paciente.nombre, 
          apellido: res.paciente.apellido, 
          foto: res.paciente.foto || "" 
        });
      } else {
        toast.error("No se pudo encontrar el expediente.");
        router.push("/dashboard/pacientes");
      }
      setLoading(false);
    };
    cargarDatos();
  }, [id, router]);

  const handleSave = async () => {
    setIsSaving(true);
    // Enviamos los datos usando 'foto' para que coincida con tu Prisma
    const res = await actualizarPaciente(id as string, editData);
    if (res.success) {
      setPaciente(res.paciente);
      setIsEditModalOpen(false);
      toast.success("Información actualizada");
    } else {
      toast.error(res.error || "Error al guardar");
    }
    setIsSaving(false);
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-nutri-main" size={48} />
    </div>
  );

  const bloques = [
    { id: 'historia', label: 'Historia Clínica', icon: FileText, color: 'text-blue-500 bg-blue-50' },
    { id: 'r24', label: 'R24 & SMAE', icon: Clock, color: 'text-orange-500 bg-orange-50' },
    { id: 'mediciones', label: 'Mediciones', icon: BarChart3, color: 'text-green-500 bg-green-50' },
    { id: 'calculo', label: 'Cálculo Dietético', icon: Calculator, color: 'text-purple-500 bg-purple-50' },
    { id: 'laboratorios', label: 'Estudios Lab.', icon: TestTube2, color: 'text-red-500 bg-red-50' },
    { id: 'consultas', label: 'Historial Consultas', icon: History, color: 'text-gray-500 bg-gray-50' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      
      {/* 🔝 CABECERA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-4xl border border-gray-100 shadow-sm relative">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push("/dashboard/pacientes")} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-400 hover:text-nutri-main transition-all group">
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-3xl overflow-hidden bg-gray-100 border-4 border-white shadow-md">
              {paciente.foto ? (
                <Image src={paciente.foto} alt={paciente.nombre} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300"><UserCircle size={40} /></div>
              )}
            </div>
            <div>
              <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest mb-1">Folio: {paciente.expediente}</p>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900 font-display">{paciente.nombre} {paciente.apellido}</h1>
                <button onClick={() => setIsEditModalOpen(true)} className="p-2 rounded-full hover:bg-gray-100 text-gray-300 hover:text-nutri-main transition-all">
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
          <div className={`w-3 h-3 rounded-full ${paciente.status === 'ACTIVO' ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span className="font-bold text-gray-600 text-sm uppercase tracking-tighter">{paciente.status}</span>
        </div>
      </div>

      {/* 🗂️ BLOQUES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bloques.map((item) => (
          <button key={item.id} onClick={() => router.push(`/dashboard/pacientes/${id}/${item.id}`)} className="group bg-white p-8 rounded-4xl border border-gray-100 hover:border-nutri-main/20 hover:shadow-2xl transition-all flex flex-col items-center text-center gap-4 relative overflow-hidden">
            <div className={`p-5 rounded-3xl ${item.color} group-hover:scale-110 transition-transform duration-500`}><item.icon size={32} /></div>
            <h3 className="font-bold text-gray-800 text-lg">{item.label}</h3>
            <p className="text-xs text-gray-400 font-medium px-4">Acceder al módulo clínico y registros históricos.</p>
            <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="text-nutri-main" size={20} /></div>
          </button>
        ))}
      </div>

      {/* 🛠️ MODAL DE EDICIÓN (Ajustado a tu Schema) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
          <div className="bg-white w-full max-w-md rounded-4xl p-8 shadow-2xl relative z-10 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold font-display">Editar Datos</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-red-500"><X /></button>
            </div>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Nombre</label>
                  <input type="text" className="nutri-input mt-1" value={editData.nombre} onChange={(e) => setEditData({...editData, nombre: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Apellidos</label>
                  <input type="text" className="nutri-input mt-1" value={editData.apellido} onChange={(e) => setEditData({...editData, apellido: e.target.value})} />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">URL de Foto (Opcional)</label>
                <input type="text" className="nutri-input mt-1" placeholder="https://..." value={editData.foto} onChange={(e) => setEditData({...editData, foto: e.target.value})} />
              </div>

              <button onClick={handleSave} disabled={isSaving} className="w-full bg-nutri-main text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
                {isSaving ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Guardar cambios</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}