import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google"; // Combinación de fuentes para jerarquía
import "./globals.css";
import { Providers } from "@/components/providers/session-provider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader"; // Barra de carga Pro

// Fuente para el cuerpo
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

// Fuente para títulos (más elegante/profesional)
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ['700', '900'],
  display: 'swap',
});

// 🌐 SEO & Metadatos Avanzados
export const metadata: Metadata = {
  title: {
    default: "Nutri-AS - Gestión Nutricional Profesional",
    template: "%s | Nutri-AS"
  },
  description: "Software integral para nutriólogos: cálculos inteligentes, expedientes digitales y seguimiento evolutivo.",
  keywords: ["nutrición", "software médico", "expediente clínico", "nutriólogos", "SMAE"],
  authors: [{ name: "UnDesarrolloMas" }],
  creator: "UnDesarrolloMas",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://nutrias.com.mx",
    title: "Nutri-AS - La evolución de tu consulta",
    description: "Lleva tu práctica clínica al siguiente nivel con tecnología de vanguardia.",
    siteName: "Nutri-AS",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981", // El verde característico de NUTRIAS
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} ${inter.className} antialiased selection:bg-nutri-main/20 selection:text-nutri-main`}>
        
        {/* 🏎️ Barra de carga inteligente (Estilo SaaS Pro) */}
        <NextTopLoader 
          color="#10b981" 
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
        />

        <Providers>
          {children}
        </Providers>

        {/* 🔔 Gestor de Notificaciones Global (Ya lo usas en NuevoPaciente) */}
        <Toaster 
          position="top-right" 
          richColors 
          closeButton 
          expand={false}
          toastOptions={{
            style: { borderRadius: '1rem' }
          }}
        />
      </body>
    </html>
  );
}