import { prisma } from "@/lib/prisma";
import { BlogList } from "@/components/admin/BlogList";

async function getBlogs() {
  return await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      tags: true,
      readTime: true,
      createdAt: true,
      publishedAt: true,
    },
  });
}

export default async function AdminDashboard() {
  const blogs = await getBlogs();
  return <BlogList initialBlogs={blogs} />;
}
