"use client";

export default function PerfilNutricional({ values, onChange, getStatusColor }: any) {
  const fields = [
    { id: "hemoglobina", label: "Hemoglobina", unit: "g/dL" },
    { id: "hematocrito", label: "Hematocrito", unit: "%" },
    { id: "hierro", label: "Hierro Sérico", unit: "µg/dL" },
    { id: "ferritina", label: "Ferritina", unit: "ng/mL" },
    { id: "vitaminaB12", label: "Vitamina B12", unit: "pg/mL" },
    { id: "vitaminaD", label: "Vitamina D", unit: "ng/mL" },
    { id: "albumina", label: "Albúmina", unit: "g/dL" },
    { id: "globulina", label: "Globulina", unit: "g/dL" }
  ];

  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 space-y-6">
      <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
        <span className="w-2 h-2 bg-blue-500 rounded-full" /> Perfil Nutricional (Estado General)
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {fields.map(f => (
          <div key={f.id}>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">{f.label} ({f.unit})</label>
            <input 
              name={f.id}
              value={values[f.id] || ""}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className={`nutri-input mt-1 ${getStatusColor(f.id, values[f.id])}`}
              placeholder="0.0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}