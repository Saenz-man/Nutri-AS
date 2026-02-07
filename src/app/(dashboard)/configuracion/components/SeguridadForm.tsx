"use client";

import { useForm } from "react-hook-form";
import { KeyRound, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function SeguridadForm({ userId }: { userId: string }) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    // Aquí llamarás a una server action específica para password
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: 'Actualizando contraseña...',
      success: 'Contraseña actualizada correctamente',
      error: 'La contraseña actual no es correcta',
    });
    reset();
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100 mb-8">
        <ShieldAlert className="text-orange-500 shrink-0" size={24} />
        <div>
          <h4 className="text-orange-800 font-bold text-sm">Recomendación de seguridad</h4>
          <p className="text-orange-700 text-xs mt-1">
            Usa una combinación de letras, números y símbolos. No compartas tu acceso con terceros.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Contraseña Actual</label>
          <input 
            type="password"
            {...register("currentPassword")}
            className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-nutri-main outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Nueva Contraseña</label>
            <input 
              type="password"
              {...register("newPassword")}
              className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-nutri-main outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Confirmar Nueva Contraseña</label>
            <input 
              type="password"
              {...register("confirmPassword")}
              className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-nutri-main outline-none transition-all"
            />
          </div>
        </div>

        <button 
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-50"
        >
          <KeyRound size={18} />
          Actualizar Contraseña
        </button>
      </form>
    </div>
  );
}