import { NextRequest, NextResponse } from "next/server";
import { fetchServer } from "@/lib/api-server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; taskId: string }> },
) {
  try {
    const { id, taskId } = await params;
    const body = await request.json();
    const response = await fetchServer(
      `/projects/${id}/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

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
