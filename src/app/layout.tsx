import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/session-provider"; // 💡 Importado y...

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nutri-AS - Gestión Nutricional Profesional",
  description: "Software integral para nutriólogos desarrollado por UnDesarrolloMas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* ✅ AHORA SÍ: Envolvemos toda la aplicación */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}