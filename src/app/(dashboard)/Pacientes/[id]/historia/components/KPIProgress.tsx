// src/app/(dashboard)/Pacientes/[id]/historia/components/KPIProgress.tsx
import { Weight, Activity, Percent, Zap } from "lucide-react";

export default function KPIProgress({ appointments, tallaPaciente }: { appointments: any[], tallaPaciente: number }) {
  // Fragmento lógico para KPIProgress
const ultimaMedicionReal = appointments
  .filter(a => a.medicion) // Filtramos solo citas con datos
  .map(a => a.medicion)[0]; // Tomamos la más reciente

// Si no hay ninguna medición en el historial, el componente devuelve null o el mensaje de "Sin registros"
if (!ultimaMedicionReal) return null;
  const ultimaMed = appointments.find(a => a.medicion)?.medicion;
  
  // Cálculo de IMC: Peso / Talla^2
  const imc = (ultimaMed && tallaPaciente > 0) 
    ? (ultimaMed.peso / Math.pow(tallaPaciente / 100, 2)).toFixed(1)
    : "0.0";

  const kpis = [
    { label: "Evolución de Peso", val: `${ultimaMed?.peso || "--"} kg`, sub: "Actualizado hoy", icon: Weight, color: "text-green-500", bg: "bg-green-50" },
    { label: "Índice de Masa Corporal", val: imc, sub: tallaPaciente > 0 ? `Talla: ${tallaPaciente}cm` : "Talla no registrada", icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "% Grasa", val: `${ultimaMed?.grasaCorporal || "--"} %`, sub: "Composición corporal", icon: Percent, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "% Músculo", val: `${ultimaMed?.musculoKg || "--"} %`, sub: "Tejido Magro", icon: Zap, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, i) => (
        <div key={i} className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{kpi.label}</p>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${kpi.bg}`}>
              <kpi.icon className={kpi.color} size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-800">{kpi.val}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase italic">{kpi.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}