import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Opportunity } from "@/models/Opportunity";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

// GET — list saved opportunities
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email })
      .select("savedOpportunities")
      .lean();

    if (!user || !user.savedOpportunities?.length) {
      return NextResponse.json([]);
    }

    const opportunities = await Opportunity.find({
      _id: { $in: user.savedOpportunities },
      published: true,
    })
      .select("title slug category organizer applicationUrl closesAt isPPIOffering tags description")
      .sort({ closesAt: 1 })
      .lean();

    return NextResponse.json(JSON.parse(JSON.stringify(opportunities)));
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch saved" },
      { status: 500 }
    );
  }
}

// POST — toggle save/unsave
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { opportunityId } = await req.json();

    if (!opportunityId) {
      return NextResponse.json(
        { message: "opportunityId required" },
        { status: 400 }
      );
    }

    const objectId = new mongoose.Types.ObjectId(opportunityId);
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const alreadySaved = user.savedOpportunities.some(
      (id) => id.toString() === opportunityId
    );

    if (alreadySaved) {
      user.savedOpportunities = user.savedOpportunities.filter(
        (id) => id.toString() !== opportunityId
      );
    } else {
      user.savedOpportunities.push(objectId);
    }

    await user.save();

    return NextResponse.json({
      saved: !alreadySaved,
      savedOpportunities: user.savedOpportunities.map((id) => id.toString()),
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to toggle save" },
      { status: 500 }
    );
  }
}
