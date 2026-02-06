import { Scale, Activity, Zap, BarChart3 } from "lucide-react";

interface Props {
  medicion: any;
  talla: number | null;
}

export default function IndicadoresClinicos({ medicion, talla }: Props) {
  const stats = [
    { label: 'Peso Actual', val: medicion?.peso ? `${medicion.peso} kg` : "-- kg", icon: Scale, color: 'text-green-500' },
    { label: 'IMC', val: medicion?.imc || "0.0", desc: talla ? `Talla: ${talla}cm` : "Sin talla", icon: Activity, color: 'text-blue-500' },
    { label: '% Grasa', val: medicion?.grasaEquipo ? `${medicion.grasaEquipo}%` : "-- %", icon: Zap, color: 'text-orange-500' },
    { label: '% Músculo', val: medicion?.musculo ? `${medicion.musculo}%` : "-- %", icon: BarChart3, color: 'text-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-6 rounded-[35px] border border-gray-50 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-[10px] font-black text-gray-300 uppercase italic">{s.label}</p>
            <s.icon size={18} className={s.color} />
          </div>
          <div className="text-3xl font-black text-gray-800 italic tracking-tighter">{s.val}</div>
        </div>
      ))}
    </div>
  );
}