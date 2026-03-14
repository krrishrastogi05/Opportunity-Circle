import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/blogs/unlisted?slug=XXX&pin=YYYY
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const pin = searchParams.get("pin");

  if (!slug || !pin) {
    return NextResponse.json(
      { message: "slug and pin are required" },
      { status: 400 },
    );
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog || blog.visibility !== "UNLISTED") {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (blog.pin !== pin) {
      return NextResponse.json({ message: "Invalid PIN" }, { status: 403 });
    }

    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
