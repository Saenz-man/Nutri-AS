"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/auth.schema";
import { loginUser } from "@/actions/auth.actions";
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, TrendingUp, Users, LogIn } from "lucide-react";

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
    try {
      const result = await loginUser(values);
      if (result?.error) setError(result.error);
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-nutri-light">
      <Navbar />
      
      <main className="grow flex items-center justify-center py-8 px-4">
        {/* Dimensiones 1:1 con el registro: max-w-6xl y min-h-[700px] */}
        <div className="w-full max-w-6xl glass-card rounded-4xl shadow-nutri overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[700px]">
          
          {/* COLUMNA IZQUIERDA: Mensaje (md:col-span-5) */}
          <div className="relative bg-nutri-main p-10 md:p-14 md:col-span-5 text-white flex flex-col justify-center overflow-hidden order-1">
            <Users className="absolute top-10 right-10 text-white/10 w-40 h-40 -rotate-12" />
            <TrendingUp className="absolute bottom-10 left-10 text-white/10 w-32 h-32 rotate-6" />
            
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6">
                <LogIn className="text-white w-8 h-8" />
              </div>
              
              <h2 className="text-4xl md:text-5xl leading-tight text-white font-bold tracking-tight">
                Bienvenido de nuevo a Nutri-AS.
              </h2>
              
              <p className="text-nutri-light/90 text-lg md:text-xl leading-relaxed">
                Retoma la gestión de tus pacientes y accede a tus herramientas de cálculo inteligente diseñadas por **Un Desarrollo Mas**.
              </p>
              
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-nutri-orange rounded-full"></div>
                  <span className="font-bold">Reportes de evolución actualizados</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-nutri-orange rounded-full"></div>
                  <span className="font-bold">Base de datos de alimentos SMAE</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario (md:col-span-7) */}
          <div className="p-8 md:p-12 md:col-span-7 order-2 bg-white/40 backdrop-blur-sm flex flex-col justify-center">
            <div className="text-center md:text-left mb-10">
              <h1 className="text-4xl text-gray-900 font-bold tracking-tight">
                Inicia Sesión <span className="text-nutri-main">Ahora</span>
              </h1>
              <p className="text-gray-500 mt-2 font-medium">
                Accede a tu plataforma de gestión nutricional personalizada.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-1">
                <input 
                  {...register("email")} 
                  type="email" 
                  placeholder="Correo electrónico" 
                  className="nutri-input" 
                />
                {errors.email && <p className="text-red-500 text-xs ml-2 font-bold">{errors.email.message}</p>}
              </div>

              <div className="relative space-y-1">
                <input 
                  {...register("password")} 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Contraseña" 
                  className="nutri-input pr-12" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-gray-400 hover:text-nutri-main transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && <p className="text-red-500 text-xs ml-2 font-bold">{errors.password.message}</p>}
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
                  className="bg-nutri-main text-white w-full py-4 rounded-full font-bold text-lg shadow-lg hover:bg-nutri-dark hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Verificando..." : "Entrar al Dashboard"}
                </button>
              </div>

              <div className="text-center md:text-left space-y-4 pt-6 border-t border-gray-100 mt-8">
                <p className="text-gray-400 text-xs hover:text-nutri-main transition-colors cursor-pointer font-medium">
                  ¿Olvidaste tu contraseña?
                </p>
                <p className="text-gray-500 text-sm font-medium">
                  ¿No tienes cuenta?{" "}
                  <a href="/registro" className="text-nutri-main font-bold hover:text-nutri-dark transition-colors underline underline-offset-4 decoration-2">
                    Regístrate aquí.
                  </a>
                </p>
              </div>
            </form>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}