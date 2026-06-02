import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "admin_token";

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    // Fail closed in production: never sign/verify with a public fallback,
    // otherwise anyone could forge an admin cookie. The dev fallback is only
    // for local development.
    if (process.env.NODE_ENV === "production") {
      throw new Error("SESSION_SECRET is not set");
    }
    return new TextEncoder().encode("dev-only-fallback-not-for-production");
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ isAdmin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(getSecret());
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.isAdmin === true;
  } catch {
    return false;
  }
}
