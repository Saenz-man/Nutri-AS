import { Printer, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface R24HeaderProps {
  patientId: string;
  onPrint: () => void;
}

export const R24Header = ({ patientId, onPrint }: R24HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
      
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Recordatorio de 24 Horas</h1>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-0.5">Reporte de Evaluación Dietética</p>
        </div>
      </div>
      
    <button 
  onClick={onPrint}
  className="btn-primary flex items-center gap-3 py-3 px-8 text-base bg-nutri-main"
>
  {/* Quité el bg-green-50 del icono para que se vea limpio */}
  <Printer className="w-5 h-5" /> 
  Imprimir Reporte PDF
</button>
    </div>
  );
};