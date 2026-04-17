"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { requestPasswordReset } from "@/actions/security.actions";

// Esquema de validación
const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Introduce un correo electrónico válido" }),
});

type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: ForgotPasswordValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await requestPasswordReset(values.email);
      if (result.error) setError(result.error);
      if (result.success) setSuccess(result.success);
    });
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-2">¡Correo enviado!</h3>
        <p className="text-green-700 mb-6">{success}</p>
        <Link 
          href="/login" 
          className="text-green-600 font-semibold hover:underline flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al inicio de sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">¿Olvidaste tu clave?</h2>
        <p className="text-gray-500 mt-2">No te preocupes, dinos tu correo y te ayudaremos.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">Correo Electrónico</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register("email")}
              disabled={isPending}
              placeholder="nutri@ejemplo.com"
              className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition-all ${
                errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-green-200 disabled:opacity-70 flex items-center justify-center"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Enviar enlace de recuperación"
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link href="/login" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
          Recordé mi contraseña, <span className="font-semibold underline">iniciar sesión</span>
        </Link>
      </div>
    </div>
  );
};