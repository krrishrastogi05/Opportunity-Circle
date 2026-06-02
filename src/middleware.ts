import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/session";

// NextAuth (database sessions) cookie names — http (dev) and __Secure (https/prod)
const SESSION_COOKIES = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

function hasUserSession(req: NextRequest): boolean {
  return SESSION_COOKIES.some((c) => Boolean(req.cookies.get(c)?.value));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin area keeps its own JWT auth.
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  // Everything else matched below requires a signed-in user.
  if (!hasUserSession(req)) {
    const url = new URL("/auth/signin", req.url);
    url.searchParams.set("callbackUrl", pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Admin (own JWT auth, except the login page)
    "/admin",
    "/admin/((?!login$).*)",
    // Product — requires login. Home "/" is intentionally public.
    "/companies/:path*",
    "/opportunities/:path*",
    "/open-source/:path*",
    "/profile/:path*",
    "/saved/:path*",
    "/settings/:path*",
  ],
};
