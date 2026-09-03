import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserSchema } from "@/schemas/user-schema";
import { LoginSchema } from "@/schemas/login-schema";
import { z } from "zod";

/**
 * Authentifie via le backend, pose `token` (HttpOnly) et `user_data` (lisible
 * en JS pour le header). Deux cookies : le JWT ne doit pas être accessible au
 * JS ; le profil si, pour éviter un round-trip au refresh.
 */
export async function POST(request: Request) {
  try {
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
      console.log(userValidation.error);
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
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    cookieStore.set("user_data", JSON.stringify(result.data.user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
