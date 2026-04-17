"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/actions/security.actions";
import { Loader2, Lock, CheckCircle2, Eye, EyeOff } from "lucide-react";

const ResetSchema = z.object({
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type ResetInput = z.infer<typeof ResetSchema>;

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [isPending, startTransition] = useTransition();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<ResetInput>({
    resolver: zodResolver(ResetSchema),
  });

  const onSubmit = (values: ResetInput) => {
    setError("");
    setSuccess("");
    
    startTransition(async () => {
      const res = await resetPassword(token, values);
      if (res.error) setError(res.error);
      if (res.success) {
        setSuccess(res.success);
        // Redirigir al login después de 3 segundos
        setTimeout(() => router.push("/login"), 3000);
      }
    });
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center animate-in fade-in zoom-in">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <p className="text-green-900 font-bold">{success}</p>
        <p className="text-green-700 text-sm mt-2">Redirigiendo al login...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <label className="text-sm font-bold text-gray-700 ml-1">Nueva Contraseña</label>
        <div className="relative">
          <input 
            {...register("password")} 
            type={showPass ? "text" : "password"} 
            className="nutri-input pr-12" 
            placeholder="Mínimo 6 caracteres"
          />
          <button 
            type="button" 
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-3 text-gray-400"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs font-bold">{errors.password.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-bold text-gray-700 ml-1">Confirmar Contraseña</label>
        <input 
          {...register("confirmPassword")} 
          type="password" 
          className="nutri-input" 
          placeholder="Repite tu contraseña"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs font-bold">{errors.confirmPassword.message}</p>}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center font-bold">
          {error}
        </div>
      )}

      <button 
        disabled={isPending || !token} 
        className="bg-nutri-main text-white w-full py-4 rounded-full font-bold shadow-lg hover:bg-nutri-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Actualizar Contraseña"}
      </button>

      {!token && (
        <p className="text-red-500 text-center text-xs font-bold">
          Error: El token no es válido o ha expirado.
        </p>
      )}
    </form>
  );
};