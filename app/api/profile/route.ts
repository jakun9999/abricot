import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UpdateProfilePayloadSchema } from "@/schemas/update-profile-schema";
import { UserSchema } from "@/schemas/user-schema";
import { encodeUserDataCookie, requireApiSession, SESSION_MAX_AGE_SECONDS } from "@/lib/api-server";

const API_URL = process.env.API_URL_INTERNAL;

/**
 * Mise à jour du profil. Deux appels backend : d’abord name/email, puis mot de
 * passe seulement si `newPassword` est fourni (le backend n’accepte pas un PUT
 * password à vide).
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    if (session.response) return session.response;

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
    const token = session.token;

    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

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
          message: "Profil renvoyé par le serveur invalide",
        },
        { status: 502 },
      );
    }

    const updatedUser = userValidation.data;

    cookieStore.set("user_data", encodeUserDataCookie(updatedUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_MAX_AGE_SECONDS,
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
    });
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
