import { FileText, Clock, BarChart3, Calculator, TestTube2, History } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModulosAcceso({ id }: { id: string }) {
  const router = useRouter();
  
  const modulos = [
    { id: 'historia', label: 'Historia Clínica', icon: FileText, color: 'text-blue-500 bg-blue-50' },
    { id: 'r24', label: 'R24 & SMAE', icon: Clock, color: 'text-orange-500 bg-orange-50' },
    { id: 'mediciones', label: 'Mediciones', icon: BarChart3, color: 'text-green-500 bg-green-50' },
    { id: 'calculo', label: 'Cálculo Dietético', icon: Calculator, color: 'text-purple-500 bg-purple-50' },
    { id: 'laboratorios', label: 'Estudios Lab.', icon: TestTube2, color: 'text-red-500 bg-red-50' },
    { id: 'consultas', label: 'Historial Consultas', icon: History, color: 'text-gray-500 bg-gray-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modulos.map((item) => (
        <button key={item.id} onClick={() => router.push(`/dashboard/pacientes/${id}/${item.id}`)} className="group bg-white p-8 rounded-4xl border border-gray-100 hover:border-nutri-main/20 hover:shadow-2xl transition-all flex flex-col items-center text-center gap-4 relative overflow-hidden">
          <div className={`p-5 rounded-3xl ${item.color} group-hover:scale-110 transition-transform duration-500`}><item.icon size={32} /></div>
          <h3 className="font-bold text-gray-800 text-lg">{item.label}</h3>
          <p className="text-xs text-gray-400 font-medium px-4 italic">Acceder al módulo clínico</p>
        </button>
      ))}
    </div>
  );
}