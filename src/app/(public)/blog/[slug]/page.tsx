import BlogClient from "./BlogClient";
import { blogContent } from "./blogData";
import { notFound } from "next/navigation";

// 1. Generar los parámetros estáticos (Indispensable para output: export)
export async function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({
    slug: slug,
  }));
}

// 2. Componente de Servidor principal
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!blogContent[slug]) {
    notFound();
  }

  return <BlogClient slug={slug} data={blogContent[slug]} />;
}