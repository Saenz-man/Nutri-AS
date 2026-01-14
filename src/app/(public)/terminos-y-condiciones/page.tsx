"use client";
import React from 'react';
import { motion } from "framer-motion";
import { 
  Scale, 
  ShieldCheck, 
  UserCheck, 
  AlertTriangle, 
  Lock, 
  Edit3, 
  Home, 
  ChevronRight,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const clauses = [
    {
      id: "PRIMERA",
      title: "Uso del Sitio",
      icon: UserCheck,
      content: "Para usar nuestro sitio web es indispensable contar con la mayoría de edad requerida legalmente, tener la capacidad de ejercicio y goce de los derechos fundamentales garantizados dentro de la República Mexicana y/o en el país donde sea usado este sitio digital, y así poder ser participante en estos términos de manera vinculante. No puedes utilizar este sitio web y/o recibir servicios si al hacerlo está prohibido en el territorio nacional dónde te encuentres."
    },
    {
      id: "SEGUNDA",
      title: "Propiedad Intelectual",
      icon: ShieldCheck,
      content: "El Servicio y todos los materiales en contenido o transferidos por el mismo, incluidos, entre otros, el software, las imágenes, el texto, los gráficos, videos y fotografías y todos los derechos de propiedad intelectual relacionados con los mismos, son propiedad exclusiva de la propietaria del sitio web, así como el logotipo “Nutrí-AS”. No obstante, a menos que se haya establecido una licencia en estos términos, te comprometes a no vender, licenciar, alquilar, modificar, distribuir, reproducir, transmitir, editar o crear trabajos derivados de ellos. Las marcas comerciales visualizadas de terceros son de índole opcional y recomendación para los pacientes, sin fines de lucro para la plataforma."
    },
    {
      id: "TERCERA",
      title: "Responsabilidad del Usuario Profesional",
      icon: Scale,
      content: "Es totalmente responsabilidad de los Licenciados en Nutrición, auxiliares, pasantes y/o alumnos el control y manejo de los pacientes registrados. En caso de ser pacientes reales, quedan sujetos a lo establecido por el artículo 79 de La Ley General de Salud de la República Mexicana, siendo los profesionales los únicos responsables de los tratamientos, dietas, costos y observaciones clínicas que de sus conocimientos emanen."
    },
    {
      id: "CUARTA",
      title: "Requisitos de los Profesionales",
      icon: FileText,
      content: "Los profesionales deberán contar con cédula profesional, títulos y/o diplomas oficiales expedidos por la SEP o Comités Normativos, siendo éticos y honestos en las consultas. Quedan regidos por lo establecido en los artículos 80 al 88 de La Ley General de Salud de la República Mexicana."
    },
    {
      id: "QUINTA",
      title: "Exclusión de Responsabilidad",
      icon: AlertTriangle,
      content: "En caso de negligencia por parte de los profesionales, la propietaria de este sitio web no será responsable de cubrir daños, perjuicios de salud o pérdidas de ningún tipo. Al aceptar estos términos, manifiestas mantener indemne a la propietaria frente a cualquier reclamo o gasto derivado del uso del sitio."
    },
    {
      id: "SEXTA",
      title: "Protección de Datos y Privacidad",
      icon: Lock,
      content: "La propietaria no asume responsabilidad por errores en el contenido registrado de los pacientes o acceso no autorizado a servidores. La responsabilidad de dicha información recae en los usuarios, bajo los parámetros de los artículos 2 al 15 de La Ley de Protección de los Datos Personales en Posesión de los Particulares."
    },
    {
      id: "SEPTIMA",
      title: "Modificaciones de los Términos",
      icon: Edit3,
      content: "Nos reservamos el derecho de modificar estos términos ocasionalmente. El uso continuado del sitio tras los cambios constituye la aceptación de los nuevos términos y condiciones. Si no estás de acuerdo, debes cesar el acceso al servicio."
    }
  ];

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium mb-12 text-gray-400">
          <Link href="/" className="flex items-center gap-1 hover:text-nutri-main transition-colors">
            <Home size={16} /> Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-nutri-main font-bold">Términos y Condiciones</span>
        </nav>

        {/* Encabezado Legal */}
        <header className="mb-16 border-b border-gray-100 pb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Términos y <span className="text-nutri-main">Condiciones.</span>
          </h1>
          <div className="bg-nutri-light/20 p-8 rounded-[2.5rem] border border-nutri-light/50">
            <p className="text-gray-700 leading-relaxed">
              Este sitio web denominado <strong className="text-nutri-main">“Nutrí-AS”</strong>, es una página diseñada para la agilización de la consulta nutricional, propiedad de la <strong>C. Lizeth Abigail Velazquéz Meléndez</strong>. Operado por profesionales y estudiantes de la nutrición, establece los siguientes términos bajo los cuales se rige el acceso y uso de nuestros servicios digitales.
            </p>
          </div>
        </header>

        {/* Lista de Cláusulas */}
        <div className="space-y-12">
          {clauses.map((clause, index) => (
            <motion.section 
              key={clause.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="hidden md:flex shrink-0 w-14 h-14 bg-gray-50 rounded-2xl items-center justify-center text-nutri-main border border-gray-100 shadow-sm">
                <clause.icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-nutri-orange text-sm font-black tracking-widest">{clause.id}.</span> 
                  {clause.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {clause.content}
                </p>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer de la página */}
        <footer className="mt-20 pt-12 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm">
            Última actualización: Enero 2026. Al usar Nutri-AS, aceptas cumplir con estas normativas legales.
          </p>
        </footer>
      </div>
    </main>
  );
}