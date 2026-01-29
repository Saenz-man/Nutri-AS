"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, FileText, Clock, BarChart3, Calculator, 
  TestTube2, History, UserCircle, Loader2, ChevronRight, 
  Pencil, X, Save, Trash2, AlertTriangle, Scale, Activity, Zap
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { 
  getPacienteById, 
  actualizarPaciente, 
  cambiarStatusPaciente, 
  eliminarPaciente,
  getHistorialCompleto // ✅ Necesario para jalar la última medición
} from "@/lib/actions/pacientes";
import { toast } from "sonner";

export default function ExpedientePacientePage() {
  const router = useRouter();
  const { id } = useParams();
  const [paciente, setPaciente] = useState<any>(null);
  const [ultimaMedicion, setUltimaMedicion] = useState<any>(null); // ✅ Almacena bioimpedancia reciente
  const [loading, setLoading] = useState(true);
  
  // Estados para Edición y Modales
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [editData, setEditData] = useState({ nombre: "", apellido: "", foto: "" });

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await getPacienteById(id as string);
      const hist = await getHistorialCompleto(id as string); // ✅ Buscamos mediciones

      if (res.success && res.paciente) {
        setPaciente(res.paciente);
        
        // 🔍 Extraemos la medición más reciente del historial
        const citas = hist.historial?.appointments || [];
        const citaConMedicion = citas.find((c: any) => c.medicion);
        if (citaConMedicion) {
          setUltimaMedicion(citaConMedicion.medicion);
        }

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

  const handleToggleStatus = async () => {
    setIsStatusLoading(true);
    const res = await cambiarStatusPaciente(id as string, paciente.status);
    if (res.success) {
      setPaciente({ ...paciente, status: res.status });
      toast.success(`Estatus actualizado a ${res.status}`);
    } else {
      toast.error(res.error);
    }
    setIsStatusLoading(false);
  };

  const handleDelete = async () => {
    setIsSaving(true);
    const res = await eliminarPaciente(id as string);
    if (res.success) {
      toast.success("Paciente eliminado definitivamente");
      router.push("/dashboard/pacientes");
    } else {
      toast.error(res.error);
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-nutri-main" size={48} />
    </div>
  );

  // 📊 Definición de tarjetas de indicadores
  const stats = [
    { 
      label: 'Evolución de Peso', 
      val: ultimaMedicion?.peso ? `${ultimaMedicion.peso} kg` : "-- kg", 
      desc: 'Actualizado recientemente', 
      icon: Scale, 
      color: 'text-green-500' 
    },
    { 
      label: 'Índice de Masa Corporal', 
      val: ultimaMedicion?.imc || "0.0", 
      desc: paciente?.talla ? `Talla: ${paciente.talla}cm` : "Talla no registrada", 
      icon: Activity, 
      color: 'text-blue-500' 
    },
    { 
      label: '% Grasa', 
      val: ultimaMedicion?.grasaEquipo ? `${ultimaMedicion.grasaEquipo}%` : "-- %", 
      desc: 'Composición corporal', 
      icon: Zap, 
      color: 'text-orange-500' 
    },
    { 
      label: '% Músculo', 
      val: ultimaMedicion?.musculo ? `${ultimaMedicion.musculo}%` : "-- %", 
      desc: 'Tejido Magro', 
      icon: BarChart3, 
      color: 'text-purple-500' 
    },
  ];

  const bloques = [
    { id: 'historia', label: 'Historia Clínica', icon: FileText, color: 'text-blue-500 bg-blue-50' },
    { id: 'r24', label: 'R24 & SMAE', icon: Clock, color: 'text-orange-500 bg-orange-50' },
    { id: 'mediciones', label: 'Mediciones', icon: BarChart3, color: 'text-green-500 bg-green-50' },
    { id: 'calculo', label: 'Cálculo Dietético', icon: Calculator, color: 'text-purple-500 bg-purple-50' },
    { id: 'laboratorios', label: 'Estudios Lab.', icon: TestTube2, color: 'text-red-500 bg-red-50' },
    { id: 'consultas', label: 'Historial Consultas', icon: History, color: 'text-gray-500 bg-gray-50' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-10">
      
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
                <button onClick={() => setIsDeleteModalOpen(true)} className="p-2 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleToggleStatus}
          disabled={isStatusLoading}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${
            paciente.status === 'ACTIVO' 
            ? 'bg-green-50 border-green-100 text-green-600 hover:bg-green-100' 
            : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'
          }`}
        >
          {isStatusLoading ? <Loader2 className="animate-spin" size={14} /> : (
            <div className={`w-3 h-3 rounded-full ${paciente.status === 'ACTIVO' ? 'bg-green-500' : 'bg-gray-400'}`} />
          )}
          <span className="font-bold text-sm uppercase tracking-tighter">{paciente.status}</span>
        </button>
      </div>

      {/* 📊 INDICADORES CLÍNICOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[35px] border border-gray-50 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic leading-tight">{s.label}</p>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <div className="text-3xl font-black text-gray-800 italic tracking-tighter">{s.val}</div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🗂️ BLOQUES DE MÓDULOS */}
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

      {/* 🛠️ MODALES (Iguales a tu versión previa) */}
      {/* ... (Edición y Eliminación) ... */}

    </div>
  );
}