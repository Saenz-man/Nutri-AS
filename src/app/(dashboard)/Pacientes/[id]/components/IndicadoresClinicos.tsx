import { Scale, Activity, Zap, BarChart3 } from "lucide-react";

// ✅ Definimos la interfaz exacta para que page.tsx no dé error
interface IndicadoresProps {
  ultimaMedicion: any; // Aquí es donde vive el peso, grasa, etc.
  talla: number | null | undefined;
}

export default function IndicadoresClinicos({ ultimaMedicion, talla }: IndicadoresProps) {
  const cards = [
    { 
      label: 'Peso Actual', 
      val: ultimaMedicion?.peso ? `${ultimaMedicion.peso} kg` : "-- kg", 
      desc: 'Evolución de Peso', 
      icon: Scale, 
      color: 'text-green-500' 
    },
    { 
      label: 'IMC', 
      val: ultimaMedicion?.imc || "0.0", 
      desc: talla ? `Talla Base: ${talla}cm` : "Sin talla", 
      icon: Activity, 
      color: 'text-blue-500' 
    },
    { 
      label: '% Grasa', 
      val: ultimaMedicion?.grasaEquipo ? `${ultimaMedicion.grasaEquipo}%` : "-- %", 
      desc: 'Composición Corporal', 
      icon: Zap, 
      color: 'text-orange-500' 
    },
    { 
      label: '% Músculo', 
      val: ultimaMedicion?.musculo ? `${ultimaMedicion.musculo}%` : "-- %", 
      desc: 'Masa Muscular', 
      icon: BarChart3, 
      color: 'text-purple-500' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((s, i) => (
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
  );
}