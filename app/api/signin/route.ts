import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserSchema } from "@/schemas/user-schema";
import { SigninSchema } from "@/schemas/signin-schema";
import { z } from "zod";

/** Inscription : pose les mêmes cookies que `POST /api/login`. */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authDataValidation = SigninSchema.safeParse(body);

    if (!authDataValidation.success) {
      return NextResponse.json(
        {
          message:
            authDataValidation.error.issues[0]?.message ??
            "Données d'inscription invalides",
          errors: z.treeifyError(authDataValidation.error),
        },
        { status: 400 },
      );
    }

    const { email, password } = authDataValidation.data;
    const API_URL = process.env.API_URL_INTERNAL;
    const backendResponse = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name: email.split("@")[0],
      }),
    });

    const result = await backendResponse.json().catch(() => null);

    if (!backendResponse.ok || !result?.success) {
      return NextResponse.json(
        {
          message:
            result?.message ||
            result?.data?.errors?.[0]?.message ||
            "Impossible de créer le compte",
        },
        { status: backendResponse.status },
      );
    }

    const rawUser = result.data?.user ?? result.user;
    const userValidation = UserSchema.safeParse({
      ...rawUser,
      name: rawUser?.name ?? email.split("@")[0],
    });

    if (!userValidation.success) {
      return NextResponse.json(
        { message: "User profil structure sent by backend are invalid" },
        { status: 502 },
      );
    }

    const safeUser = userValidation.data;
    const token = result.data?.token ?? result.token;

    if (!token) {
      return NextResponse.json(
        { message: "Compte créé, mais le token est manquant" },
        { status: 502 },
      );
    }

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    cookieStore.set("user_data", JSON.stringify(safeUser), {
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
