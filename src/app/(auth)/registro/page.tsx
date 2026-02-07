"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth.schema";
import { registerUser } from "@/actions/auth.actions";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Camera, User, Users, TrendingUp, Award } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

type RegisterInput = z.infer<typeof RegisterSchema>;

export default function RegistroPage() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [preview, setPreview] = useState<string | null>(null);
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: RegisterInput) => {
    setError("");
    // Aquí podrías necesitar lógica extra si vas a subir la imagen (preview) al servidor
    const result = await registerUser(values);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setWelcomeData({ show: true, name: result.name || values.nombre });
    }
  };

  if (welcomeData.show) {
    return (
      <div className="flex flex-col min-h-screen bg-nutri-light">
        <Navbar />
        <main className="grow flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-card rounded-4xl p-10 md:p-14 text-center shadow-nutri animate-in fade-in zoom-in duration-500">
            <div className="mb-6">
              {preview ? (
                <img src={preview} alt="Perfil" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-nutri-main shadow-lg" />
              ) : (
                <div className="w-20 h-20 bg-nutri-main/10 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🌱</div>
              )}
              <h1 className="text-4xl text-gray-900">
                ¡Bienvenido, <span className="text-nutri-main">{welcomeData.name}</span>!
              </h1>
            </div>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Tu cuenta en **Nutri-AS** ha sido creada con éxito. Ya puedes comenzar a gestionar tu clínica de forma inteligente.
            </p>
            <button 
  onClick={() => router.push("/dashboard")} 
  className="w-full bg-nutri-main text-white hover:bg-nutri-main/90 border-nutri-main border-2 flex items-center justify-center gap-3 text-xl py-5 rounded-2xl transition-all font-bold shadow-md hover:shadow-lg hover:scale-[1.01]"
>
  Aceptar e ir al Panel
</button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-nutri-light">
      <Navbar />
      
      <main className="grow flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-6xl glass-card rounded-4xl shadow-nutri overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[700px]">
          
          {/* COLUMNA IZQUIERDA: Texto Llamativo e Inspiracional */}
          <div className="relative bg-nutri-main p-10 md:p-14 md:col-span-5 text-white flex flex-col justify-center overflow-hidden order-1">
            <Users className="absolute top-10 right-10 text-white/10 w-40 h-40 -rotate-12" />
            <TrendingUp className="absolute bottom-10 left-10 text-white/10 w-32 h-32 rotate-6" />
            
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6">
                <Award className="text-white w-8 h-8" />
              </div>
              
              <h2 className="text-4xl md:text-5xl leading-tight text-white">
                Únete a la élite de la nutrición digital.
              </h2>
              
              <p className="text-nutri-light/90 text-lg md:text-xl leading-relaxed">
                Estás a un paso de formar parte de una comunidad que potencia su práctica clínica con tecnología inteligente diseñada por **Un Desarrollo Mas**.
              </p>
              
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-nutri-orange rounded-full"></div>
                  <span className="font-bold">Gestión eficiente de pacientes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-nutri-orange rounded-full"></div>
                  <span className="font-bold">Cálculos precisos con SMAE 5ta Edición</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-nutri-orange rounded-full"></div>
                  <span className="font-bold">Expediente clínico 100% digital</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario de Registro */}
          <div className="p-8 md:p-12 md:col-span-7 order-2 bg-white/40 backdrop-blur-sm">
            <div className="text-center md:text-left mb-8">
              <h1 className="text-3xl text-gray-900">
                Crea tu cuenta en <span className="text-nutri-main">Nutri-AS</span>
              </h1>
              <p className="text-gray-500 mt-2 font-medium">
                Ingresa tus credenciales profesionales para comenzar.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Foto de Perfil */}
              <div className="flex flex-col items-center md:items-start justify-center mb-6">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-white border-4 border-white shadow-sm flex items-center justify-center">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User size={50} className="text-gray-300" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-nutri-orange p-2 rounded-full text-white cursor-pointer shadow-lg hover:scale-110 transition-transform">
                    <Camera size={18} />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
                <p className="text-xs text-gray-400 mt-3 font-bold">Foto de perfil profesional</p>
              </div>

              {/* Grid de Datos Generales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <input {...register("nombre")} placeholder="Nombre" className="nutri-input" />
                  {errors.nombre && <p className="text-red-500 text-xs ml-1 font-bold">{errors.nombre.message}</p>}
                </div>
                <div className="space-y-1">
                  <input {...register("apellido")} placeholder="Apellido" className="nutri-input" />
                  {errors.apellido && <p className="text-red-500 text-xs ml-1 font-bold">{errors.apellido.message}</p>}
                </div>
              </div>
              
              <div className="space-y-1">
                <input {...register("email")} type="email" placeholder="Correo institucional" className="nutri-input" />
                {errors.email && <p className="text-red-500 text-xs ml-1 font-bold">{errors.email.message}</p>}
              </div>

              <div className="space-y-1">
                <input {...register("password")} type="password" placeholder="Contraseña" className="nutri-input" />
                {errors.password && <p className="text-red-500 text-xs ml-1 font-bold">{errors.password.message}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                    <input {...register("telefono")} placeholder="Teléfono" className="nutri-input" />
                    {errors.telefono && <p className="text-red-500 text-xs ml-1 font-bold">{errors.telefono.message}</p>}
                </div>
                <div className="space-y-1">
                    <input {...register("carrera")} placeholder="Especialidad médica" className="nutri-input" />
                    {errors.carrera && <p className="text-red-500 text-xs ml-1 font-bold">{errors.carrera.message}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Fecha de Nacimiento</label>
                <input {...register("fechaNacimiento")} type="date" className="nutri-input" />
                {/* Agregué el manejo de error para la fecha por si acaso */}
                {errors.fechaNacimiento && <p className="text-red-500 text-xs ml-1 font-bold">{errors.fechaNacimiento.message}</p>}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm text-center font-bold animate-pulse">
                  {error}
                </div>
              )}

              <div className="pt-4">
  {/* ✅ Botón verde (bg-green-600) y texto blanco (text-white) */}
  <button 
    type="submit" 
    className="w-full bg-nutri-main text-white hover:bg-green-700 border-green-600 flex items-center justify-center gap-3 text-xl py-5 group border-2 rounded-2xl transition-all font-bold shadow-md hover:shadow-lg"
  >
    Registrarme ahora
  </button>
</div>
            </form>

             <p className="text-center md:text-left text-gray-500 text-sm mt-8 font-medium">
              ¿Ya eres parte de la comunidad? <a href="/login" className="text-nutri-main font-bold hover:text-nutri-dark transition-colors underline underline-offset-4 decoration-2">Inicia sesión</a>
            </p>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}