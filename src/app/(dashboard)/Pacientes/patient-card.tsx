// src/app/(dashboard)/dashboard/pacientes/components/patient-card.tsx

"use client";

import { User, Phone, ChevronRight, Circle } from "lucide-react";

import Image from "next/image";

import { useRouter } from "next/navigation";

export default function PatientCard({ patient }: { patient: any }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/pacientes/${patient.id}`)}
      className="bg-white p-6 rounded-4xl border border-gray-100 hover:border-nutri-main/30 hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-center gap-5">
        {/* 📷 Foto de Perfil */}

        <div className="relative w-16 h-16 rounded-2xl bg-gray-50 overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
          {patient.image ? (
            <Image
              src={patient.image}
              alt={patient.nombre}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <User size={32} />
            </div>
          )}
        </div>

        {/* 👤 Identidad y Expediente */}

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-900 group-hover:text-nutri-main transition-colors">
              {patient.nombre} {patient.apellido}
            </h3>

            {/* 🟢 Indicador de Estado */}

            <Circle
              size={8}
              fill={patient.status === "ACTIVO" ? "#22c55e" : "#9ca3af"}
              className={
                patient.status === "ACTIVO" ? "text-green-500" : "text-gray-400"
              }
            />
          </div>

          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {patient.expediente}
          </p>
        </div>
      </div>

      {/* 📞 Contacto Directo */}

      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="bg-gray-50 p-2 rounded-xl text-gray-400">
            <Phone size={14} />
          </div>

          <span className="text-xs font-bold">
            {patient.telefono || "Sin teléfono"}
          </span>
        </div>

        <div className="bg-nutri-main/10 p-2 rounded-xl text-nutri-main opacity-0 group-hover:opacity-100 transition-all">
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}
