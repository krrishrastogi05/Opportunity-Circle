import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/session";
import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const opportunity = await Opportunity.findById(params.id).lean();
    if (!opportunity) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(opportunity);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch opportunity" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const opportunity = await Opportunity.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    ).lean();

    if (!opportunity) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(opportunity);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update opportunity";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const opportunity = await Opportunity.findByIdAndDelete(params.id);
    if (!opportunity) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete opportunity" },
      { status: 500 }
    );
  }
}
