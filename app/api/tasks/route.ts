import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchServer } from "@/lib/api-server";
import { Task } from "@/schemas/task-schema";

const TaskCreateSchema = z
  .object({
    projectId: z.string().min(1),
    title: z.string().min(1).optional(),
    description: z.string().optional().default(""),
    priority: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    ),
    dueDate: z.string().optional().default(""),
    assigneeIds: z.array(z.string()).default([]),
  })
  .refine((data) => Boolean(data.title), {
    message: "Le titre de la tâche est requis.",
    path: ["title"],
  });

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = TaskCreateSchema.safeParse(body);

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

    const { projectId, title, description, priority, dueDate, assigneeIds } =
      validation.data;
    const payload = {
      title,
      description,
      priority,
      dueDate,
      assigneeIds,
    };

    const response = await fetchServer(`/projects/${projectId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const backendPayload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: backendPayload?.message ?? "Impossible de créer la tâche.",
        },
        { status: response.status },
      );
    }

    const task: Task | null =
      backendPayload?.data?.task ?? backendPayload?.task ?? null;

    return NextResponse.json({
      success: true,
      task,
      data: backendPayload?.data ?? { task },
    });
  } catch (error) {
    console.error("Error creating task", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur lors de la création de la tâche.",
      },
      { status: 500 },
    );
  }
}
