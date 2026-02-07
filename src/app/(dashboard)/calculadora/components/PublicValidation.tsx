import { Calculator } from "lucide-react";

export default function PublicValidation({ totales, metas }: any) {
  const getAdecuacion = (actual: number, meta: number) => {
    const porc = meta > 0 ? (actual / meta) * 100 : 0;
    const isOk = porc >= 95 && porc <= 105;
    return { 
      porc: porc.toFixed(1), 
      color: isOk ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50" 
    };
  };

  const indicadores = [
    { label: "Energía", actual: totales.kcal, meta: metas.kcal, unit: "kcal" },
    { label: "Proteína", actual: totales.pro, meta: metas.proG, unit: "g" },
    { label: "Lípidos", actual: totales.lip, meta: metas.lipG, unit: "g" },
    { label: "Carbos", actual: totales.hco, meta: metas.hcoG, unit: "g" },
  ];

  return (
    <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
      <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
        <Calculator size={14} /> Validación de Adecuación
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {indicadores.map(res => {
          const status = getAdecuacion(res.actual, res.meta);
          return (
            <div key={res.label} className={`p-5 rounded-3xl border border-transparent transition-all shadow-sm ${status.color}`}>
              <p className="text-[9px] font-black uppercase opacity-60 mb-2 italic">{res.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black italic">{status.porc}</span>
                <span className="text-[10px] font-black">%</span>
              </div>
              <p className="text-[8px] font-bold mt-1 opacity-50">
                {res.actual.toFixed(0)}{res.unit} / {res.meta.toFixed(0)}{res.unit}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}