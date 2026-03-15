import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { formatDate } from "@/lib/utils";
import { TagBadge } from "@/components/blogs/TagBadge";
import { UnlistedBlogView } from "@/components/blogs/UnlistedBlogView";
import { Clock } from "lucide-react";

const BlogRenderer = dynamic(
  () => import("@/components/blogs/BlogRenderer").then((m) => m.BlogRenderer),
  { ssr: false, loading: () => <div className="h-64 animate-pulse bg-muted rounded-xl" /> }
);

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: params.slug },
      select: { title: true, excerpt: true, visibility: true },
    });
    if (!blog || blog.visibility === "PRIVATE") return { title: "Post not found" };
    return { title: blog.title, description: blog.excerpt ?? undefined };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let blog;
  try {
    blog = await prisma.blog.findUnique({ where: { slug: params.slug } });
  } catch {
    notFound();
  }

  if (!blog || blog.visibility === "PRIVATE") notFound();

  // UNLISTED — handled client-side with PIN gate
  if (blog.visibility === "UNLISTED") {
    return <UnlistedBlogView slug={params.slug} />;
  }

  // PUBLIC
  return (
    <article className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <header className="mb-10">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {blog.tags.map((tag) => <TagBadge key={tag} tag={tag} />)}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-4">
          {blog.title}
        </h1>
        {blog.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {blog.excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {blog.publishedAt && <span>{formatDate(blog.publishedAt)}</span>}
          {blog.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {blog.readTime} min read
            </span>
          )}
        </div>
      </header>

      {blog.coverImage && (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-border mb-10 bg-muted">
          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" priority />
        </div>
      )}

      <BlogRenderer content={blog.content as object} />
    </article>
  );
}
