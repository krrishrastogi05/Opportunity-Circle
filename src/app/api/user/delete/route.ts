import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { clientPromise } from "@/lib/mongodb-client";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Find the user
    const user = await db
      .collection("users")
      .findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    // Delete in parallel: user, accounts, sessions
    await Promise.all([
      db.collection("users").deleteOne({ _id: userId }),
      db
        .collection("accounts")
        .deleteMany({ userId: userId instanceof ObjectId ? userId : new ObjectId(userId) }),
      db
        .collection("sessions")
        .deleteMany({ userId: userId instanceof ObjectId ? userId : new ObjectId(userId) }),
    ]);

    return NextResponse.json({ message: "Account deleted" });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to delete account";
    return NextResponse.json({ message }, { status: 500 });
  }
}
