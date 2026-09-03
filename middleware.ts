import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Garde les pages métier derrière le cookie `token`, et renvoie un utilisateur
 * déjà connecté hors de `/login` et `/signin`. Les 404 hors matcher restent
 * publiques (la page 404 décide elle-même d’afficher le chrome).
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

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

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/account/:path*",
    "/login",
    "/signin",
  ],
};
