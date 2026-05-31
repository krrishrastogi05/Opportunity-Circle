import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function verifyToken(email: string, token: string): boolean {
  const secret = process.env.UNSUBSCRIBE_SECRET || "dev-secret";
  const expected = crypto
    .createHmac("sha256", secret)
    .update(email)
    .digest("hex")
    .slice(0, 16);
  return token === expected;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const type = searchParams.get("type") || "all"; // "alerts" | "digest" | "all"

  if (!email || !token) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  if (!verifyToken(email, token)) {
    return new NextResponse("Invalid unsubscribe link", { status: 403 });
  }

  try {
    await connectDB();
    const update: Record<string, boolean> = {};
    if (type === "alerts" || type === "all") update.alertsEnabled = false;
    if (type === "digest" || type === "all") update.digestEnabled = false;

    await User.findOneAndUpdate({ email }, { $set: update });

    return new NextResponse(
      `<html><body style="font-family:system-ui;text-align:center;padding:60px">
        <h2>Unsubscribed</h2>
        <p>You've been unsubscribed from OpportunitySignal ${type === "all" ? "emails" : type}.</p>
        <p><a href="https://opportunitysignal.vercel.app/settings">Manage preferences</a></p>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
