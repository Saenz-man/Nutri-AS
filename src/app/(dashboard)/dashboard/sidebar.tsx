"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-red-500 font-bold hover:underline"
    >
      Cerrar Sesión
    </button>
  );
}