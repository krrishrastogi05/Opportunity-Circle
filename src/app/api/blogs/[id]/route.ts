import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { calcReadTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

function generatePin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// PUT /api/blogs/[id] — admin only: update post
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token)))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      tags,
      visibility,
      category,
    } = body;

    const existing = await prisma.blog.findUnique({ where: { id: params.id } });
    if (!existing)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    const vis: string = visibility ?? existing.visibility;
    const cat: string = category ?? existing.category;
    const isPublic = vis === "PUBLIC";

    // Generate new PIN if switching to UNLISTED and no pin yet
    const pin = vis === "UNLISTED" ? (existing.pin ?? generatePin()) : null;

    const wasPublic = existing.visibility === "PUBLIC";
    const publishedAt =
      !wasPublic && isPublic ? new Date() : existing.publishedAt;

    const updateData: Record<string, unknown> = {
      visibility: vis,
      category: cat,
      pin,
      published: isPublic,
      publishedAt,
    };

    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (content !== undefined) {
      updateData.content = content;
      updateData.readTime = calcReadTime(content);
    }
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (tags !== undefined) updateData.tags = tags;

    const updated = await prisma.blog.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] — admin only
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const token2 = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token2 || !(await verifyAdminToken(token2)))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await prisma.blog.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}
