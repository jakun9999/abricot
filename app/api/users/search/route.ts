import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchServer } from "@/lib/api-server";
import { User, UserSchema } from "@/schemas/user-schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get("query") ?? "").trim();

    if (!query) {
      return NextResponse.json({
        success: true,
        users: [],
      });
    }

    const response = await fetchServer(
      `/users/search?query=${encodeURIComponent(query)}`,
    );
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            payload?.message ?? "Impossible de rechercher les utilisateurs.",
        },
        { status: response.status },
      );
    }

    const users = payload?.data?.users ?? payload?.users ?? [];
    users.map((user: User) => {
      console.log("user", user);
    });
    const parsedUsers = z.array(UserSchema).safeParse(users);

    if (!parsedUsers.success) {
      return NextResponse.json(
        {
          success: false,
          message: "La structure des utilisateurs reçue est invalide.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      users: parsedUsers.data,
    });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur lors de la recherche d'utilisateurs.",
      },
      { status: 500 },
    );
  }
}
