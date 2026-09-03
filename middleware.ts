import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isSessionJwtUsable } from "@/lib/jwt";
import { enforceCsrf } from "@/lib/csrf";
import { nextWithCsp, withCspHeader } from "@/lib/csp";

const expiredCookie = {
  path: "/",
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 0,
};

function clearSessionCookies(response: NextResponse) {
  response.cookies.set("token", "", { ...expiredCookie, httpOnly: true });
  response.cookies.set("user_data", "", { ...expiredCookie, httpOnly: false });
}

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  clearSessionCookies(response);
  return withCspHeader(response);
}

/**
 * - `/api` : CSRF same-origin (JSON 403, jamais de redirect HTML).
 * - Pages métier : JWT utilisable (forme + `exp`, HMAC si `JWT_SECRET`).
 * - CSP nonce sur chaque réponse HTML (Next injecte le nonce aux scripts).
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api")) {
    const csrf = enforceCsrf(request);
    if (csrf) return withCspHeader(csrf);
    return nextWithCsp(request);
  }

  const token = request.cookies.get("token")?.value;
  const hasUsableSession = Boolean(token && (await isSessionJwtUsable(token)));

  const protectedPrefixes = ["/dashboard", "/projects", "/account"];
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtectedRoute && !hasUsableSession) {
    return redirectToLogin(request);
  }

  if ((pathname === "/login" || pathname === "/signin") && hasUsableSession) {
    return withCspHeader(
      NextResponse.redirect(new URL("/dashboard", request.url)),
    );
  }

  if (
    (pathname === "/login" || pathname === "/signin") &&
    token &&
    !hasUsableSession
  ) {
    const response = nextWithCsp(request);
    clearSessionCookies(response);
    return response;
  }

  return nextWithCsp(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
