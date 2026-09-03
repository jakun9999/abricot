import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchServer, requireApiSession } from "@/lib/api-server";
import { loadAccessibleProject, projectAccessDenied } from "@/lib/project-access";
import { Comment } from "@/schemas/comment-schema";

interface RouteProps {
  params: Promise<{
    id: string;
    taskId: string;
  }>;
}

const CommentCreateSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Le contenu du commentaire est requis.")
    .max(2000, "Le commentaire est trop long."),
});

export async function POST(request: Request, { params }: RouteProps) {
  try {
    const session = await requireApiSession();
    if (session.response) return session.response;

    const { id, taskId } = await params;
    const access = await loadAccessibleProject(id);
    if (!access.ok) return projectAccessDenied(access);

    const body = await request.json();

    const validation = CommentCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0]?.message ??
            "Données du commentaire invalides.",
        },
        { status: 400 },
      );
    }

    const { content } = validation.data;

    const response = await fetchServer(
      `/projects/${id}/tasks/${taskId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      },
    );

    const backendPayload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            backendPayload?.message ?? "Impossible d'ajouter le commentaire.",
        },
        { status: response.status },
      );
    }

    const comment: Comment | null =
      backendPayload?.data?.comment ?? backendPayload?.comment ?? null;

    return NextResponse.json({
      success: true,
      comment,
      data: backendPayload?.data ?? { comment },
    });
  } catch (error) {
    console.error("Error creating comment", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur lors de l'ajout du commentaire.",
      },
      { status: 500 },
    );
  }
}
