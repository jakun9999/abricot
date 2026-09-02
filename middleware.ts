import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // We check next route if it's a protected route
  const protectedPrefixes = ["/dashboard", "/projects", "/account"];
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/signin" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configured protected route handled by next JS
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/account/:path*",
    "/login",
    "/signin",
  ],
};
