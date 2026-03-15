import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "admin_token";

function getSecret(): Uint8Array {
  return new TextEncoder().encode(
    process.env.SESSION_SECRET ?? "dev-fallback-secret-please-change-in-prod!!"
  );
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
