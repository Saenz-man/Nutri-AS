"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/auth.schema";
import { loginUser } from "@/actions/auth.actions";
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

type LoginInput = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (values: LoginInput) => {
    setError("");
    setLoading(true);
    
    // Log para ver qué datos salen del front-end
    console.log("🚀 Enviando intento de login para:", values.email); 
    
    try {
      const result = await loginUser(values);
      if (result?.error) {
        console.error("❌ Error en autenticación:", result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error("🔥 Error crítico en el proceso:", err);
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-nutri-light">
      <Navbar />
      
      <main className="grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md glass-card rounded-4xl p-10 md:p-14 border border-white/20 shadow-nutri">
          
          <div className="text-center mb-10">
            <h1 className="text-5xl font-serif text-gray-900 tracking-tight">
              Login <span className="text-nutri-main">Now</span>
            </h1>
            <p className="text-gray-500 mt-4 text-sm font-medium">
              Accede a tu plataforma de gestión nutricional
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <input 
                {...register("email")} 
                type="email" 
                placeholder="Correo electrónico" 
                className="nutri-input bg-white/50" 
              />
              {errors.email && <p className="text-red-500 text-xs ml-2 font-medium">{errors.email.message}</p>}
            </div>

            <div className="relative space-y-1">
              <input 
                {...register("password")} 
                type={showPassword ? "text" : "password"} 
                placeholder="Contraseña" 
                className="nutri-input bg-white/50 pr-12" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-400 hover:text-nutri-main transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && <p className="text-red-500 text-xs ml-2 font-medium">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center font-bold">
                {error}
              </div>
            )}
            
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? "Verificando..." : "Entrar al Dashboard"}
              </button>
            </div>

            <div className="text-center space-y-4 pt-6 border-t border-gray-100">
              <p className="text-gray-400 text-xs hover:text-nutri-main transition-colors cursor-pointer">
                ¿Olvidaste tu contraseña?
              </p>
              <p className="text-gray-500 text-sm">
                ¿No tienes cuenta?{" "}
                <a href="/registro" className="text-nutri-main font-bold hover:text-nutri-dark transition-colors">
                  Regístrate aquí.
                </a>
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}