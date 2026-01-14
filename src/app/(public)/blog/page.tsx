"use client";
import { motion } from "framer-motion";
import { Heart, Share2, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    date: "2023",
    month: "ART.",
    author: "Romany Gonzalez (UAEH)",
    likes: 2568,
    shares: 412,
    title: "¿Cómo determinar si un yogurt tiene probióticos?",
    excerpt: "Evaluación técnica de productos lácteos comerciales bajo la NOM-181-SCFI-2010 y sus beneficios para la salud humana.",
    slug: "determinacion-probioticos-yogurt"
  },
  {
    id: 2,
    date: "2021",
    month: "JUN.",
    author: "Liz Velázquez (UAEM)",
    likes: 1842,
    shares: 325,
    title: "Efecto de la metformina en la microbiota intestinal",
    excerpt: "Análisis sobre cómo el tratamiento farmacológico modula la composición bacteriana y su relación con el síndrome metabólico.",
    slug: "metformina-microbiota-sindrome-metabolico"
  },
  {
    id: 3,
    date: "2024",
    month: "ENE.",
    author: "UnDesarrolloMas",
    likes: 94,
    shares: 22,
    title: "Actualización: Motor de cálculos con SMAE 5ta Edición",
    excerpt: "Hemos integrado las tablas oficiales del SMAE para que tus cálculos dietéticos sean 100% precisos y automáticos.",
    slug: "actualizacion-smae-5ta-edicion"
  }
];

export default function BlogGridPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado dinámico */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              Blog de <span className="text-nutri-main">Nutri-AS.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 font-medium">
              Investigación científica y tecnología para el nutriólogo moderno.
            </p>
          </div>

          <div className="relative w-full lg:w-96">
            <input 
              type="text" 
              placeholder="Buscar artículo..." 
              className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 pr-14 text-gray-700 outline-none transition-all shadow-sm"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
          </div>
        </div>

        {/* El Grid que nos pediste */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="flex flex-col h-full">
              <motion.div 
                whileHover={{ y: -10 }}
                className="group bg-gray-50/50 p-10 rounded-[3rem] border border-transparent hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer"
              >
                <div className="flex justify-between items-start mb-10">
                  {/* Cuadro de Fecha Verde Bosque */}
                  <div className="bg-[#1e3a2f] text-white px-5 py-4 rounded-2xl text-center min-w-[75px] shadow-lg">
                    <span className="block text-3xl font-bold leading-none">{post.date}</span>
                    <span className="text-xs font-bold tracking-widest mt-1 block uppercase">{post.month}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 font-medium">By: <span className="text-gray-900 font-bold">{post.author}</span></p>
                    <div className="flex items-center justify-end gap-4 mt-3 text-[11px] font-black uppercase text-nutri-orange">
                      <span className="flex items-center gap-1.5"><Heart size={14} fill="currentColor" /> {post.likes} LIKES</span>
                      <span className="flex items-center gap-1.5"><Share2 size={14} /> {post.shares} SHARE</span>
                    </div>
                  </div>
                </div>

                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-nutri-main transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <span className="inline-flex items-center gap-2 text-nutri-main font-bold">
                    Leer más <ArrowUpRight size={18} />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}