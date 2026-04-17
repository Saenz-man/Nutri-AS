"use client";
import { useR24Logic, MEAL_TIMES } from './hooks/useR24Logic';
import { MealCard } from './components/MealCard';
import { R24Header } from './components/R24Header';
import { R24PDF } from '@/components/pdf/R24PDF'; 
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

export default function R24Page() {
  const { data, updateValue, totalsByMeal, grandTotal } = useR24Logic();

  const handlePrint = async () => {
    try {
      const doc = (
        <R24PDF 
          data={data} 
          totals={totalsByMeal} 
          grandTotal={grandTotal} 
          patientName="Edgar Uriel Saenz Bobadilla" 
        />
      );
      
      const blob = await pdf(doc).toBlob();
      saveAs(blob, `R24_NutriAS_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Error PDF:", error);
      alert("Error al generar el PDF. Revisa que no haya bordes mal definidos.");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen">
      <R24Header patientId="1" onPrint={handlePrint} />
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Lado Izquierdo: Las Tarjetas de Comida */}
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {MEAL_TIMES.map((meal) => (
            <MealCard
              key={meal}
              meal={meal}
              mealData={data[meal] || {}}
              totals={totalsByMeal[meal]}
              onUpdate={updateValue}
            />
          ))}
        </div>

        {/* Lado Derecho: Resumen Flotante */}
        <div className="xl:col-span-1">
          <div className="glass-card rounded-4xl p-8 sticky top-10 border-nutri-main/20">
            <h2 className="text-xl font-black text-nutri-main mb-6 uppercase tracking-tighter text-center">Resumen Diario</h2>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-black text-gray-900 tracking-tighter">
                  {Math.round(grandTotal.kcal)}
                </div>
                <span className="text-xs font-bold text-nutri-main uppercase tracking-widest">Kilocalorías</span>
              </div>
              
              <div className="grid grid-cols-1 gap-3 pt-4">
                <ProgressItem label="Proteína" value={grandTotal.pro} color="bg-teal-500" />
                <ProgressItem label="Lípidos" value={grandTotal.lip} color="bg-nutri-orange" />
                <ProgressItem label="Carbohidratos" value={grandTotal.hco} color="bg-nutri-main" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProgressItem = ({ label, value, color }: any) => (
  <div className="bg-nutri-light p-4 rounded-2xl flex justify-between items-center">
    <span className="text-[10px] font-black text-gray-500 uppercase">{label}</span>
    <span className={`font-bold ${color.replace('bg-', 'text-')}`}>{value.toFixed(1)}g</span>
  </div>
);