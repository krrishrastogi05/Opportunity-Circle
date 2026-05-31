import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/session";
import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { User } from "@/models/User";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { NewOpportunityEmail } from "@/emails/NewOpportunityEmail";
import { generateUnsubscribeUrl } from "@/lib/unsubscribe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
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

    const opportunity = await Opportunity.findById(opportunityId).lean();
    if (!opportunity) {
      return NextResponse.json(
        { message: "Opportunity not found" },
        { status: 404 }
      );
    }

    const subscribers = await User.find({ alertsEnabled: true })
      .select("email")
      .lean();

    if (subscribers.length === 0) {
      return NextResponse.json({
        message: "No subscribers with alerts enabled",
        sent: 0,
      });
    }

    let sent = 0;
    const batchSize = 50;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      await Promise.allSettled(
        batch.map((user) =>
          resend.emails.send({
            from: FROM_EMAIL,
            to: user.email,
            subject: `New: ${opportunity.title} — OpportunityCircle`,
            react: NewOpportunityEmail({
              title: opportunity.title,
              category: opportunity.category,
              description: opportunity.description,
              applicationUrl: opportunity.applicationUrl,
              closesAt: opportunity.closesAt?.toISOString(),
              unsubscribeUrl: generateUnsubscribeUrl(user.email, "alerts"),
            }),
          })
        )
      );
      sent += batch.length;
    }

    return NextResponse.json({ message: "Alerts sent", sent });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send alerts";
    return NextResponse.json({ message }, { status: 500 });
  }
}
