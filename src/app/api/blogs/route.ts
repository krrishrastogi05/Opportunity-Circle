import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { slugify, calcReadTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

function generatePin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// GET /api/blogs — public: only PUBLIC visibility posts
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
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
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

// POST /api/blogs — admin only: create new post
export async function POST(req: NextRequest) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, content, excerpt, coverImage, tags, visibility, category } =
      body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 },
      );
    }

    const vis: string = visibility ?? "PRIVATE";
    const cat: string = category ?? "TECHNICAL";

    // Handle slug collision
    let slug: string = body.slug || slugify(title);
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const readTime = calcReadTime(content);
    const pin = vis === "UNLISTED" ? generatePin() : null;
    const isPublic = vis === "PUBLIC";

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        tags: tags || [],
        visibility: vis,
        category: cat,
        pin,
        published: isPublic,
        readTime,
        publishedAt: isPublic ? new Date() : null,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create blog";
    return NextResponse.json({ message }, { status: 500 });
  }
}
