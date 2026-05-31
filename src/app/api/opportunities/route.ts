import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/session";
import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const opportunities = await Opportunity.find({ published: true })
      .sort({ closesAt: 1, createdAt: -1 })
      .lean();
    return NextResponse.json(opportunities);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch opportunities" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();

    if (!body.title || !body.category) {
      return NextResponse.json(
        { message: "Title and category are required" },
        { status: 400 }
      );
    }

    let slug = body.slug || slugify(body.title);
    const existing = await Opportunity.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const opportunity = await Opportunity.create({ ...body, slug });
    return NextResponse.json(opportunity, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create opportunity";
    return NextResponse.json({ message }, { status: 500 });
  }
}
