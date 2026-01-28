"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth.schema";
import { registerUser } from "@/actions/auth.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// Componentes de Layout
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

type RegisterInput = z.infer<typeof RegisterSchema>;

export default function RegistroPage() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [welcomeData, setWelcomeData] = useState<{ show: boolean; name: string }>({
    show: false,
    name: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (values: RegisterInput) => {
    setError("");
    
    const result = await registerUser(values);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      // Activamos la vista de bienvenida con el nombre retornado por el Action
      setWelcomeData({ show: true, name: result.name || values.nombre });
    }
  };

  // VISTA DE BIENVENIDA (Post-Registro)
  if (welcomeData.show) {
    return (
      <div className="flex flex-col min-h-screen bg-[--color-nutri-light]">
        <Navbar />
        <main className="grow flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-card rounded-4xl p-10 md:p-14 text-center shadow-nutri animate-in fade-in zoom-in duration-500">
            <div className="mb-6">
              <div className="w-20 h-20 bg-nutri-main/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌱</span>
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900">
                ¡Bienvenido, <span className="text-nutri-main">{welcomeData.name}</span>!
              </h1>
            </div>
            
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Tu cuenta en <span className="font-bold text-gray-800">Nutri-AS</span> ha sido creada con éxito. 
              Ya puedes comenzar a gestionar tu clínica y utilizar el motor de cálculos.
            </p>

            <button
              onClick={() => router.push("/dashboard")}
              className="btn-primary w-full text-xl py-5"
            >
              Aceptar e ir al Panel
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // VISTA DEL FORMULARIO DE REGISTRO
  return (
    <div className="flex flex-col min-h-screen bg-[--color-nutri-light]">
      <Navbar />
      
      <main className="grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-2xl glass-card rounded-4xl p-8 md:p-12 shadow-nutri">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900">
              Crea tu cuenta en <span className="text-nutri-main">Nutri-AS</span>
            </h1>
            <p className="text-gray-500 mt-3 text-lg">
              Únete a la gestión inteligente para profesionales de la salud
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Fila: Nombre y Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <input {...register("nombre")} placeholder="Nombre" className="nutri-input" />
                {errors.nombre && <p className="text-red-500 text-xs ml-1 font-medium">{errors.nombre.message}</p>}
              </div>
              <div className="space-y-1">
                <input {...register("apellido")} placeholder="Apellido" className="nutri-input" />
                {errors.apellido && <p className="text-red-500 text-xs ml-1 font-medium">{errors.apellido.message}</p>}
              </div>
            </div>
            
            {/* Email y Contraseña */}
            <div className="space-y-1">
              <input {...register("email")} type="email" placeholder="Correo electrónico profesional" className="nutri-input" />
              {errors.email && <p className="text-red-500 text-xs ml-1 font-medium">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <input {...register("password")} type="password" placeholder="Contraseña (mín. 8 caracteres)" className="nutri-input" />
              {errors.password && <p className="text-red-500 text-xs ml-1 font-medium">{errors.password.message}</p>}
            </div>
            
            {/* Teléfono y Carrera */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <input {...register("telefono")} placeholder="Teléfono" className="nutri-input" />
                {errors.telefono && <p className="text-red-500 text-xs ml-1 font-medium">{errors.telefono.message}</p>}
              </div>
              <div className="space-y-1">
                <input {...register("carrera")} placeholder="Carrera o Especialidad" className="nutri-input" />
                {errors.carrera && <p className="text-red-500 text-xs ml-1 font-medium">{errors.carrera.message}</p>}
              </div>
            </div>
            
            {/* Fecha de Nacimiento */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Fecha de Nacimiento</label>
              <input {...register("cumpleaños")} type="date" className="nutri-input" />
              {errors.cumpleaños && <p className="text-red-500 text-xs ml-1 font-medium">{errors.cumpleaños.message}</p>}
            </div>

            {/* Error del Servidor */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm text-center font-bold">
                {error}
              </div>
            )}

            <div className="pt-6">
              <button type="submit" className="btn-primary w-full">
                Empezar ahora
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8 font-medium">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="text-nutri-main font-bold hover:text-nutri-dark transition-colors underline decoration-2 underline-offset-4">
                Inicia sesión aquí
              </a>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}