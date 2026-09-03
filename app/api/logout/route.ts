import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const expiredCookie = {
  path: "/",
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 0,
};

/**
 * Déconnexion : efface `token` (HttpOnly) et `user_data`. N’invalide pas le JWT
 * côté backend (pas d’endpoint de révocation). Idempotent si déjà déconnecté.
 */
export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("token", "", { ...expiredCookie, httpOnly: true });
  cookieStore.set("user_data", "", { ...expiredCookie, httpOnly: false });

  return NextResponse.json({ success: true });
}
