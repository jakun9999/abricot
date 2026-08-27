import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserSchema } from "@/schemas/user";
import { LoginSchema } from "@/schemas/login-schema";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // We transfer auth data to the backend
    // but with a validation of what is sent to our
    // nextjs API /api/login
    const authDataValidation = LoginSchema.safeParse(body);

    if (!authDataValidation.success) {
      // We reject incoming body as it doens't fit zod loginSchema
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

    // As for data sent to our API, we also check data coming
    // from backend API to ensure we receive only good data
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

    // We set the HttpOnly cookie for the token
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    // And a separate cookie to store user profile but also
    // with a check of data schema with zod UserSchema

    cookieStore.set("user_data", JSON.stringify(result.data.user), {
      httpOnly: false, // Usable locally by the client once authenticated
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    // We return to the client (browser) the user profil info
    // the cookie will be sent also by nextjs server part.
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
