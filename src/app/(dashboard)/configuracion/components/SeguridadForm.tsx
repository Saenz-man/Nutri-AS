"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyRound, ShieldAlert, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updatePassword } from "@/actions/security.actions"; // Importa la acción que creamos

export default function SeguridadForm({ userId }: { userId: string }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    watch,
    formState: { isSubmitting, errors } // Agregamos errors para feedback visual
  } = useForm();

  // Opcional: Validar visualmente si coinciden mientras escribe
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch = newPassword === confirmPassword;

  const onSubmit = async (data: any) => {
    // Validación básica de cliente antes de enviar
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Las nuevas contraseñas no coinciden");
      return;
    }

    try {
      // Llamada a la Server Action
      const result = await updatePassword(userId, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Contraseña actualizada correctamente");
        reset(); // Limpia el formulario si todo salió bien
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado");
    }
  };

  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
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
        
        {/* Contraseña Actual */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Contraseña Actual</label>
          <div className="relative">
            <input 
              type={showCurrent ? "text" : "password"}
              {...register("currentPassword", { required: true })}
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-nutri-main outline-none transition-all pr-12"
              placeholder="Ingresa tu contraseña actual"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-nutri-main transition-colors"
            >
              {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Nueva Contraseña */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Nueva Contraseña</label>
            <div className="relative">
              <input 
                type={showNew ? "text" : "password"}
                {...register("newPassword", { required: true, minLength: 6 })}
                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-nutri-main outline-none transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-nutri-main transition-colors"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Confirmar Nueva Contraseña</label>
            <div className="relative">
              <input 
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword", { required: true })}
                className={`w-full p-4 rounded-2xl border bg-gray-50/50 focus:bg-white outline-none transition-all pr-12 ${
                   confirmPassword && !passwordsMatch ? "border-red-300 focus:border-red-500" : "border-gray-100 focus:border-nutri-main"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-nutri-main transition-colors"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-red-500 font-bold ml-1">Las contraseñas no coinciden</p>
            )}
          </div>
        </div>

        <button 
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-gray-200"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <KeyRound size={18} />}
          {isSubmitting ? "Verificando..." : "Actualizar Contraseña"}
        </button>
      </form>
    </div>
  );
}