import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UpdateProfilePayloadSchema } from "@/schemas/update-profile-schema";
import { UserSchema } from "@/schemas/user";

const API_URL = process.env.API_URL_INTERNAL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = UpdateProfilePayloadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0]?.message ?? "Données invalides",
        },
        { status: 400 },
      );
    }

    const { name, email, currentPassword, newPassword } = validation.data;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Non authentifié" },
        { status: 401 },
      );
    }

    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Étape 1 : mise à jour name / email
    const profileRes = await fetch(`${API_URL}/auth/profile`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({ name, email }),
    });

    if (!profileRes.ok) {
      const profileError = await safeParseJson(profileRes);
      return NextResponse.json(
        {
          success: false,
          message:
            profileError?.message ?? "Échec de la mise à jour du nom/email",
        },
        { status: profileRes.status },
      );
    }

    const profileResult = await profileRes.json();

    const userValidation = UserSchema.safeParse(
      profileResult.data?.user ?? profileResult.user,
    );

    if (!userValidation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Profil renvoyé par l// Étape 2 : mise à jour du mot de passe si demandée serveur invalide",
        },
        { status: 502 },
      );
    }

    const updatedUser = userValidation.data;

    cookieStore.set("user_data", JSON.stringify(updatedUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    if (newPassword) {
      const passwordRes = await fetch(`${API_URL}/auth/password`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!passwordRes.ok) {
        const passwordError = await safeParseJson(passwordRes);
        return NextResponse.json(
          {
            success: false,
            message:
              passwordError?.message ??
              "Le nom et l'email ont été mis à jour, mais le changement de mot de passe a échoué",
            user: updatedUser,
          },
          { status: passwordRes.status },
        );
      }
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
    }); // Étape 2 : mise à jour du mot de passe si demandé
  } catch (error) {
    console.error("Error in /api/profile route:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 },
    );
  }
}

async function safeParseJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
