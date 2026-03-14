import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BlogForm } from "@/components/admin/BlogForm";

export const metadata: Metadata = { title: "Edit Post" };

interface EditBlogPageProps {
  params: { id: string };
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const blog = await prisma.blog.findUnique({ where: { id: params.id } });
  if (!blog) notFound();

  const initialData = {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    coverImage: blog.coverImage,
    content: blog.content as object,
    published: blog.published,
    tags: blog.tags,
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to dashboard
        </Link>
        <h1 className="text-2xl font-bold">Edit Post</h1>
      </div>
      <BlogForm initialData={initialData} />
    </div>
  );
}
