import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserSchema } from "@/schemas/user-schema";
import { LoginSchema } from "@/schemas/login-schema";
import { z } from "zod";
import { encodeUserDataCookie, SESSION_MAX_AGE_SECONDS } from "@/lib/api-server";
import {
  RATE_LIMITS,
  enforceRateLimit,
  getClientIp,
} from "@/lib/rate-limit";

/**
 * Authentifie via le backend, pose `token` (HttpOnly) et `user_data` (lisible
 * en JS pour le header). Deux cookies : le JWT ne doit pas être accessible au
 * JS ; le profil si, pour éviter un round-trip au refresh.
 */
export async function POST(request: Request) {
  try {
    const limited = enforceRateLimit(
      `login:${getClientIp(request)}`,
      RATE_LIMITS.login,
      "tentatives de connexion",
    );
    if (limited) return limited;

    const body = await request.json();

    const authDataValidation = LoginSchema.safeParse(body);

    if (!authDataValidation.success) {
      return NextResponse.json(
        {
          message: "Données d'identification incorrectes",
          errors: z.treeifyError(authDataValidation.error),
        },
        { status: 400 },
      );
    }

    const { email, password } = authDataValidation.data;
    const API_URL = process.env.API_URL_INTERNAL;
    const backendResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await backendResponse.json();

    if (!backendResponse.ok || !result.success) {
      return NextResponse.json(
        { message: result.message || "Erreur d'authentification" },
        { status: backendResponse.status },
      );
    }

    const userValidation = UserSchema.safeParse(result.data.user);

    if (!userValidation.success) {
      console.error("Login: profil utilisateur backend invalide");
      return NextResponse.json(
        { message: "User profil structure sent by backend are invalid" },
        { status: 502 },
      );
    }

    const safeUser = userValidation.data;

    const token = result.data.token;

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
    });

    cookieStore.set("user_data", encodeUserDataCookie(safeUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: safeUser,
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
