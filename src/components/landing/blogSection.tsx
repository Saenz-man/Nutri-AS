"use client";
import { motion } from "framer-motion";
import { Heart, Share2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    date: "2023", 
    month: "ART.", 
    author: "Romany Gonzalez (UAEH)", 
    likes: "2,568", 
    shares: "412",
    title: "¿Cómo determinar si un yogurt tiene probióticos?",
    excerpt: "Evaluación de productos lácteos comerciales bajo la NOM-181-SCFI-2010 y el impacto de los microorganismos viables en la salud humana.",
    slug: "determinacion-probioticos-yogurt"
  },
  {
    date: "2021", 
    month: "JUN.", 
    author: "Liz Velázquez (UAEM)", 
    likes: "1,842", 
    shares: "325",
    title: "Efecto de la metformina en la microbiota intestinal",
    excerpt: "Análisis sobre cómo el tratamiento farmacológico modula la composición bacteriana y su relación con el síndrome metabólico.",
    slug: "metformina-microbiota-sindrome-metabolico"
  },
  {
    date: "15", 
    month: "ENE.", 
    author: "UnDesarrolloMas", 
    likes: "94", 
    shares: "22",
    title: "Actualización: Motor de cálculos con SMAE 5ta Edición",
    excerpt: "Hemos integrado las tablas oficiales del SMAE para que tus cálculos dietéticos sean 100% precisos y automáticos.",
    slug: "actualizacion-smae-5ta-edicion"
  }
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Últimas <span className="text-nutri-main">Publicaciones</span>
          </h2>
          <div className="mt-4 h-1.5 w-24 bg-nutri-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-[#f8faf9] p-8 rounded-[2.5rem] border border-transparent hover:border-nutri-main/20 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-8">
                {/* Cuadro de Fecha Verde Bosque (Como en tu captura) */}
                <div className="bg-[#1e3a2f] text-white p-4 rounded-2xl text-center min-w-[65px] shadow-lg">
                  <span className="block text-2xl font-bold leading-none">{post.date}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest mt-1 block">{post.month}</span>
                </div>
                {/* Info Autor y Stats en Naranja */}
                <div className="text-right">
                  <span className="text-gray-400 text-sm font-medium">By: <span className="text-gray-900 font-bold">{post.author}</span></span>
                  <div className="flex gap-4 mt-2 justify-end text-[11px] font-black uppercase text-nutri-orange">
                    <span className="flex items-center gap-1"><Heart size={14} fill="currentColor" /> {post.likes} LIKES</span>
                    <span className="flex items-center gap-1"><Share2 size={14} /> {post.shares} SHARE</span>
                  </div>
                </div>
              </div>

              <div className="flex-grow">
                <Link href={`/blog/${post.slug}`} className="block group-hover:text-nutri-main transition-colors">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="text-nutri-main font-bold flex items-center gap-2 group/btn"
                >
                  Leer más <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}