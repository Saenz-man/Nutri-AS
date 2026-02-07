"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema, type UpdateUserInput } from "@/schemas/user.schema";
import { updateUserService } from "@/lib/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PerfilFormProps {
  user: {
    id: string;
    nombre: string;
    apellido: string;
    telefono: string;
    carrera: string;
    fechaNacimiento: Date | string; // ✅ Actualizado a fechaNacimiento
    fotoPerfil?: string | null;
  };
}

export default function PerfilForm({ user }: PerfilFormProps) {
  const router = useRouter();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      telefono: user.telefono || "",
      carrera: user.carrera || "",
    }
  });

  const onSubmit = async (data: UpdateUserInput) => {
    try {
      const result = await updateUserService(user.id, data);
      
      if (result.success) {
        toast.success("Perfil actualizado con éxito");
        router.refresh();
      } else {
        toast.error(result.error || "Ocurrió un error al actualizar");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor");
    }
  };

  // ✅ Formatear fecha para mostrar (DD de Mes de YYYY)
  const formatearFecha = (fecha: Date | string) => {
    try {
      const date = new Date(fecha);
      if (isNaN(date.getTime())) return "Fecha no válida";
      return date.toLocaleDateString('es-MX', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return "Fecha no disponible";
    }
  };

  // ✅ Calcular edad automáticamente
  const calcularEdad = (fecha: Date | string) => {
    try {
      const date = new Date(fecha);
      if (isNaN(date.getTime())) return 0;
      
      const hoy = new Date();
      let edad = hoy.getFullYear() - date.getFullYear();
      const m = hoy.getMonth() - date.getMonth();
      
      if (m < 0 || (m === 0 && hoy.getDate() < date.getDate())) {
        edad--;
      }
      return edad;
    } catch {
      return 0;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Nombre */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Nombre(s)</label>
          <input 
            {...register("nombre")}
            placeholder="Tu nombre"
            className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-nutri-main focus:ring-4 focus:ring-nutri-main/5 outline-none transition-all"
          />
          {errors.nombre && <p className="text-xs text-red-500 font-medium ml-1">{errors.nombre.message}</p>}
        </div>

        {/* Apellido */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Apellidos</label>
          <input 
            {...register("apellido")}
            placeholder="Tus apellidos"
            className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-nutri-main focus:ring-4 focus:ring-nutri-main/5 outline-none transition-all"
          />
          {errors.apellido && <p className="text-xs text-red-500 font-medium ml-1">{errors.apellido.message}</p>}
        </div>

        {/* Carrera / Especialidad */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Carrera o Especialidad</label>
          <input 
            {...register("carrera")}
            placeholder="Ej. Nutrición Clínica"
            className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-nutri-main focus:ring-4 focus:ring-nutri-main/5 outline-none transition-all"
          />
          {errors.carrera && <p className="text-xs text-red-500 font-medium ml-1">{errors.carrera.message}</p>}
        </div>

        {/* Teléfono */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Teléfono de Contacto</label>
          <input 
            {...register("telefono")}
            placeholder="10 dígitos"
            className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-nutri-main focus:ring-4 focus:ring-nutri-main/5 outline-none transition-all"
          />
          {errors.telefono && <p className="text-xs text-red-500 font-medium ml-1">{errors.telefono.message}</p>}
        </div>

        {/* Fecha de Nacimiento y Edad (Solo Lectura) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Fecha de Nacimiento</label>
          <div className="p-4 rounded-2xl border border-gray-100 bg-gray-100 text-gray-700 font-medium flex justify-between items-center">
            <span>
              {user.fechaNacimiento ? formatearFecha(user.fechaNacimiento) : "No especificada"}
            </span>
            {user.fechaNacimiento && (
              <span className="bg-white px-3 py-1 rounded-lg text-xs font-bold text-nutri-main border border-gray-200 shadow-sm">
                {calcularEdad(user.fechaNacimiento)} años
              </span>
            )}
          </div>
          <p className="text-[10px] text-gray-400 ml-1 italic">
            * Dato calculado automáticamente. Contacta a soporte para correcciones.
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-50">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-nutri-main text-white px-10 py-4 rounded-2xl font-bold hover:bg-nutri-teal active:scale-95 transition-all shadow-md shadow-nutri-main/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Actualizando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}