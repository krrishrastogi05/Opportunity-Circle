import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const { alertsEnabled, digestEnabled } = body;

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          ...(typeof alertsEnabled === "boolean" && { alertsEnabled }),
          ...(typeof digestEnabled === "boolean" && { digestEnabled }),
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      alertsEnabled: user.alertsEnabled,
      digestEnabled: user.digestEnabled,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update preferences" },
      { status: 500 }
    );
  }
}
