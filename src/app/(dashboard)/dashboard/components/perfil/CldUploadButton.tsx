// src/components/perfil/CldUploadButton.tsx
"use client";

import { useRouter } from "next/navigation"; // ✅ Importar para refrescar
import { CldUploadWidget } from "next-cloudinary";
import { actualizarImagenUsuario } from "@/lib/actions/user";
import { toast } from "sonner";

interface Props {
  tipo: "fotoPerfil" | "fotoBanner";
  children: React.ReactNode;
}

export default function CldUploadButton({ tipo, children }: Props) {
  const router = useRouter(); // ✅ Inicializar el router

  const handleSuccess = async (result: any) => {
    const url = result?.info?.secure_url;
    if (url) {
      const res = await actualizarImagenUsuario(tipo, url);
      if (res.success) {
        toast.success("¡Imagen actualizada!");
        // ✅ Refresca los Server Components para mostrar la nueva foto
        router.refresh(); 
      } else {
        toast.error("Error al sincronizar con el servidor");
      }
    }
  };

  return (
    <CldUploadWidget 
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={handleSuccess}
      options={{
        maxFiles: 1,
        cropping: true,
        sources: ['local'],
        croppingAspectRatio: tipo === "fotoPerfil" ? 1 : 3,
        showSkipCropButton: false,
        // ✅ Configuración de idioma para mejor UX
        language: "es",
        styles: {
          palette: {
            window: "#FFFFFF",
            sourceBg: "#F4F4F5",
            windowBorder: "#10b981",
            tabIcon: "#10b981",
            inactiveTabIcon: "#9CA3AF",
            menuIcons: "#10b981",
            link: "#10b981",
            action: "#10b981",
            inProgress: "#10b981",
            complete: "#10b981",
            error: "#EF4444",
            textDark: "#111827",
            textLight: "#FFFFFF"
          }
        }
      }}
    >
      {({ open }) => (
        <div onClick={() => open()} className="cursor-pointer">
          {children}
        </div>
      )}
    </CldUploadWidget>
  );
}