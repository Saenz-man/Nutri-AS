import { ForgotPasswordForm } from "@/app/(auth)/forgot-password/ForgotPasswordForm";
import Image from "next/image";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-[500px]">
        {/* Logo de NUTRIAS */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-2xl">
            <span className="text-2xl font-black text-green-600 tracking-tighter italic">NUTRIAS</span>
          </div>
        </div>
        
        <ForgotPasswordForm />
      </div>
    </div>
  );
}