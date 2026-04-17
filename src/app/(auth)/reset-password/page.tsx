import { ResetPasswordForm } from "@/app/(auth)/reset-password/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-nutri-light p-4">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-4xl shadow-nutri w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nueva Contraseña</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Ingresa tu nueva clave de acceso para NUTRIAS.
          </p>
        </div>
        
        {/* Usamos Suspense porque useSearchParams lo requiere en el cliente */}
        <Suspense fallback={<div className="text-center">Cargando formulario...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}