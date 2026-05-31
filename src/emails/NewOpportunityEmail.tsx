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

interface NewOpportunityEmailProps {
  title: string;
  category: string;
  description: string;
  applicationUrl?: string;
  closesAt?: string;
  unsubscribeUrl: string;
}

export function NewOpportunityEmail({
  title,
  category,
  description,
  applicationUrl,
  closesAt,
  unsubscribeUrl,
}: NewOpportunityEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "32px 16px" }}>
          <Text style={{ fontSize: "11px", color: "#6b7280", letterSpacing: "2px", textTransform: "uppercase" as const, marginBottom: "4px" }}>
            New on OpportunityCircle
          </Text>
          <Text style={{ fontSize: "22px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
            {title}
          </Text>
          <Text style={{ fontSize: "12px", color: "#6b7280", backgroundColor: "#f3f4f6", display: "inline-block", padding: "2px 10px", borderRadius: "9999px", marginBottom: "16px" }}>
            {category.replace("_", " ")}
          </Text>
          <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.6" }}>
            {description}
          </Text>

          {closesAt && (
            <Text style={{ fontSize: "13px", color: "#dc2626", fontWeight: "600", marginTop: "12px" }}>
              Deadline: {new Date(closesAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
            </Text>
          )}

          <Section style={{ marginTop: "24px" }}>
            {applicationUrl && (
              <Button
                href={applicationUrl}
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
                Apply Now
              </Button>
            )}
          </Section>

          <Section style={{ marginTop: "16px" }}>
            <Button
              href="https://opportunitycircle.vercel.app/opportunities"
              style={{
                backgroundColor: "transparent",
                color: "#6b7280",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "12px",
                border: "1px solid #e5e7eb",
                textDecoration: "none",
              }}
            >
              View all opportunities
            </Button>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", marginTop: "32px" }} />
          <Text style={{ fontSize: "11px", color: "#9ca3af", lineHeight: "1.5" }}>
            You received this because you enabled opportunity alerts on OpportunityCircle.{" "}
            <Link href={unsubscribeUrl} style={{ color: "#6b7280" }}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
