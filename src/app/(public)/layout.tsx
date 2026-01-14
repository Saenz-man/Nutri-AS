import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer"; // 1. Importar

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20"> 
        {children}
      </main>
      <Footer /> {/* 2. Añadir aquí */}
    </div>
  );
}