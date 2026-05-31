import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { User } from "@/models/User";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { WeeklyDigestEmail } from "@/emails/WeeklyDigestEmail";
import { generateUnsubscribeUrl } from "@/lib/unsubscribe";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Verify cron secret for Vercel Cron
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    // Fetch opportunities created or with deadlines in the next 2 weeks
    const now = new Date();
    const twoWeeksFromNow = new Date(now.getTime() + 14 * 86_400_000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 86_400_000);

    const opportunities = await Opportunity.find({
      published: true,
      $or: [
        { createdAt: { $gte: oneWeekAgo } },
        { closesAt: { $gte: now, $lte: twoWeeksFromNow } },
        { opensAt: { $gte: now, $lte: twoWeeksFromNow } },
      ],
    })
      .sort({ closesAt: 1 })
      .lean();

    if (opportunities.length === 0) {
      return NextResponse.json({ message: "No opportunities for digest", sent: 0 });
    }

    const subscribers = await User.find({ digestEnabled: true })
      .select("email")
      .lean();

    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No digest subscribers", sent: 0 });
    }

    const summaries = opportunities.map((o) => ({
      title: o.title,
      category: o.category,
      closesAt: o.closesAt?.toISOString(),
      applicationUrl: o.applicationUrl,
    }));

    let sent = 0;
    const batchSize = 50;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      await Promise.allSettled(
        batch.map((user) =>
          resend.emails.send({
            from: FROM_EMAIL,
            to: user.email,
            subject: `Weekly Digest: ${opportunities.length} opportunities — OpportunityCircle`,
            react: WeeklyDigestEmail({
              opportunities: summaries,
              unsubscribeUrl: generateUnsubscribeUrl(user.email, "digest"),
            }),
          })
        )
      );
      sent += batch.length;
    }

    return NextResponse.json({ message: "Digest sent", sent });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send digest";
    return NextResponse.json({ message }, { status: 500 });
  }
}
