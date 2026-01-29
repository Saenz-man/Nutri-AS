"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ChartProps {
  data: any[]; // Arreglo de { fecha: string, peso: number }
}

export default function CurvaAntropometria({ data }: ChartProps) {
  // Formatear fechas para el eje X
  const formattedData = data.map(d => ({
    ...d,
    fecha: new Date(d.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })
  })).reverse();

  return (
    <div className="w-full h-[300px] mt-6 bg-white p-4 rounded-4xl border border-gray-100 shadow-sm">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-2">Evolución del Peso (kg)</p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
          <defs>
            <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis 
            dataKey="fecha" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 9, fontWeight: 900, fill: '#9ca3af'}} 
            dy={10}
          />
          <YAxis 
            hide 
            domain={['dataMin - 5', 'dataMax + 5']} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
          />
          <Area 
            type="monotone" 
            dataKey="peso" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPeso)" 
            dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}