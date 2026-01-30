// src/app/(dashboard)/dashboard/consultas/nueva/MedicionesAnteriores.tsx
"use client";

interface MedicionesAnterioresProps {
  imcActual: number;
  onPesoChange: (val: number) => void;
  talla: number;
  onTallaChange: (val: number) => void;
  // ✅ AÑADIMOS ESTOS PROPS
  onGrasaChange: (val: number) => void;
  onMusculoChange: (val: number) => void;
}

export default function MedicionesAnteriores({ 
  imcActual, 
  onPesoChange, 
  talla, 
  onTallaChange,
  onGrasaChange,   // 👈 Los recibimos aquí
  onMusculoChange  // 👈
}: MedicionesAnterioresProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* ... (Tus inputs de peso y talla actuales) ... */}

      {/* ⚪ BIOIMPEDANCIA OPCIONAL */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic"> % Grasa</label>
          <input 
            type="number" 
            step="0.1"
            className="nutri-input text-lg font-black"
            placeholder="0.0"
            onChange={(e) => onGrasaChange(parseFloat(e.target.value) || 0)} // ✅ Corregido
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic"> % Músculo</label>
          <input 
            type="number" 
            step="0.1"
            className="nutri-input text-lg font-black"
            placeholder="0.0"
            onChange={(e) => onMusculoChange(parseFloat(e.target.value) || 0)} // ✅ Corregido
          />
        </div>
      </div>
    </div>
  );
}