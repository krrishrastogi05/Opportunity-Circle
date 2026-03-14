import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDateShort } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

async function getLatestPosts() {
  try {
    return await prisma.blog.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        tags: true,
        readTime: true,
        publishedAt: true,
      },
    });
  } catch {
    return [];
  }
}

export async function BlogTeaser() {
  const posts = await getLatestPosts();

  if (posts.length === 0) return null;

  return (
    <section className="py-8 px-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Badge variant="secondary" className="mb-2">Fresh Drops 🎯</Badge>
          <h2 className="text-2xl font-bold">Spillin&apos; thoughts on tech, life,<br />and the decentralized future</h2>
        </div>
        <Link
          href="/blogs"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
        >
          All posts <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="space-y-1">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.slug}`}
            className="flex items-start justify-between gap-4 py-4 border-b border-border hover:bg-accent/30 transition-colors rounded-lg px-2 -mx-2 group"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm group-hover:text-foreground transition-colors line-clamp-1">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {post.excerpt}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 text-right">
              {post.readTime && (
                <span className="text-xs text-muted-foreground">{post.readTime} min read</span>
              )}
              {post.publishedAt && (
                <p className="text-xs text-muted-foreground/60">
                  {formatDateShort(post.publishedAt)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
