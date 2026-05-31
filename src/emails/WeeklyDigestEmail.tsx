import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Link,
} from "@react-email/components";

interface OpportunitySummary {
  title: string;
  category: string;
  closesAt?: string;
  applicationUrl?: string;
}

interface WeeklyDigestEmailProps {
  opportunities: OpportunitySummary[];
  unsubscribeUrl: string;
}

export function WeeklyDigestEmail({
  opportunities,
  unsubscribeUrl,
}: WeeklyDigestEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "32px 16px" }}>
          <Text style={{ fontSize: "11px", color: "#6b7280", letterSpacing: "2px", textTransform: "uppercase" as const }}>
            Weekly Digest
          </Text>
          <Text style={{ fontSize: "22px", fontWeight: "bold", color: "#111827", marginBottom: "16px" }}>
            This Week on OpportunitySignal
          </Text>
          <Text style={{ fontSize: "14px", color: "#374151", marginBottom: "24px" }}>
            {opportunities.length} new or upcoming opportunities this week:
          </Text>

          {opportunities.map((opp, i) => (
            <Section
              key={i}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "8px",
              }}
            >
              <Text style={{ fontSize: "15px", fontWeight: "600", color: "#111827", margin: "0 0 4px" }}>
                {opp.title}
              </Text>
              <Text style={{ fontSize: "11px", color: "#6b7280", margin: "0 0 8px" }}>
                {opp.category.replace("_", " ")}
                {opp.closesAt &&
                  ` · Closes ${new Date(opp.closesAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}`}
              </Text>
              {opp.applicationUrl && (
                <Link href={opp.applicationUrl} style={{ fontSize: "12px", color: "#2563eb" }}>
                  Apply →
                </Link>
              )}
            </Section>
          ))}

          <Section style={{ marginTop: "24px" }}>
            <Button
              href="https://opportunitysignal.vercel.app/opportunities"
              style={{
                backgroundColor: "#111827",
                color: "#ffffff",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Browse all opportunities
            </Button>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", marginTop: "32px" }} />
          <Text style={{ fontSize: "11px", color: "#9ca3af", lineHeight: "1.5" }}>
            You received this weekly digest from OpportunitySignal.{" "}
            <Link href={unsubscribeUrl} style={{ color: "#6b7280" }}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
