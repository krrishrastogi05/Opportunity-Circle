import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BlogTabs } from "@/components/blogs/BlogTabs";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Thoughts on tech, life, and the decentralized future.",
};

async function getBlogs() {
  try {
    return await prisma.blog.findMany({
      where: { visibility: "PUBLIC" },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        tags: true,
        category: true,
        readTime: true,
        publishedAt: true,
      },
    });
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const technical = blogs.filter((b) => b.category === "TECHNICAL");
  const general   = blogs.filter((b) => b.category === "GENERAL");

  return (
    <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Droppin&apos; some thoughts</h1>
        <p className="text-muted-foreground text-[15px] max-w-lg">
          Deep-divin&apos; into tech, crypto, and the wild ride that is life.
          Check out my latest drops — hope they vibe with you!
        </p>
      </div>

      <BlogTabs technical={technical} general={general} />
    </div>
  );
}
