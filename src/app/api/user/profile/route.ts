import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { ALL_BRANCHES } from "@/lib/branches";

export const dynamic = "force-dynamic";

// GET — fetch current user profile
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email })
      .select("name email image branch graduationYear gender profileCompleted alertsEnabled digestEnabled")
      .lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// POST — complete or update profile
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { name, branch, graduationYear, gender } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    if (branch && !ALL_BRANCHES.includes(branch)) {
      return NextResponse.json(
        { message: "Invalid branch" },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    if (
      graduationYear &&
      (graduationYear < currentYear - 1 || graduationYear > currentYear + 6)
    ) {
      return NextResponse.json(
        { message: "Invalid graduation year" },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          name: name.trim(),
          ...(branch && { branch }),
          ...(graduationYear && { graduationYear }),
          ...(gender !== undefined && { gender }),
          profileCompleted: true,
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      branch: user.branch,
      graduationYear: user.graduationYear,
      gender: user.gender,
      profileCompleted: user.profileCompleted,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
