import crypto from "crypto";

export function generateUnsubscribeUrl(
  email: string,
  type: "alerts" | "digest" | "all" = "all"
): string {
  const secret = process.env.UNSUBSCRIBE_SECRET || "dev-secret";
  const token = crypto
    .createHmac("sha256", secret)
    .update(email)
    .digest("hex")
    .slice(0, 16);

  const base =
    process.env.NEXTAUTH_URL || "https://opportunitysignal.vercel.app";
  return `${base}/api/email/unsubscribe?email=${encodeURIComponent(email)}&token=${token}&type=${type}`;
}
