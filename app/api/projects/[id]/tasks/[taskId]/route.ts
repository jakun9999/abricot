import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fetchServer, requireApiSession } from "@/lib/api-server";
import { loadAccessibleProject, projectAccessDenied } from "@/lib/project-access";

const TaskUpdateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default(""),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "CANCELLED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  dueDate: z.string(),
  assigneeIds: z.array(z.string()).default([]),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; taskId: string }> },
) {
  try {
    const session = await requireApiSession();
    if (session.response) return session.response;

    const { id, taskId } = await params;
    const access = await loadAccessibleProject(id);
    if (!access.ok) return projectAccessDenied(access);

    const body = await request.json();
    const validation = TaskUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0]?.message ??
            "Données de la tâche invalides.",
        },
        { status: 400 },
      );
    }

    const response = await fetchServer(`/projects/${id}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation.data),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          message: payload?.message ?? "Impossible de mettre à jour la tâche.",
        },
        { status: response.status },
      );
    }

    return NextResponse.json(payload ?? {}, { status: response.status });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la mise à jour de la tâche." },
      { status: 500 },
    );
  }
}
