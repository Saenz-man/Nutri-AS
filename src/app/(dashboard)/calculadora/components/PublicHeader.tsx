import { Calculator } from "lucide-react";

export default function PublicHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm gap-4">
      <div className="flex items-center gap-6">
        <div className="bg-nutri-main/10 p-4 rounded-2xl text-nutri-main">
          <Calculator size={28} />
        </div>
        <div>
          <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Herramienta Gratuita</p>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter italic">Calculadora Dietética Express</h1>
        </div>
      </div>
    </div>
  );
}