"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner"; // Aprovechamos para activar las notificaciones

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      {/* El Toaster permite que las alertas de 'éxito' se vean físicamente */}
      <Toaster position="top-right" richColors closeButton />
    </SessionProvider>
  );
}