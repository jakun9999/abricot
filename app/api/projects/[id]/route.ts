import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchServer } from "@/lib/api-server";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

const ProjectCreateSchema = z
  .object({
    name: z.string().min(2),
    description: z.string().min(2),
  })
  .refine((data) => Boolean(data.name), {
    message: "Le nom du projet est requis.",
    path: ["name"],
  });

export async function POST(request: Request, { params }: RouteProps) {
  try {
    const body = await request.json();
    const { id } = await params;
    console.log(body);
    console.log(id);

    const validation = ProjectCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0]?.message ??
            "Données du projet invalides.",
        },
        { status: 400 },
      );
    }

    const { name, description } = validation.data;
    const payload = {
      name,
      description,
    };

    const response = await fetchServer(`/projects/${id}`, {
      method: "PUT",
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
          message:
            backendPayload?.message ?? "Impossible de mettre à jour le projet.",
        },
        { status: response.status },
      );
    }

    const project =
      backendPayload?.data?.project ?? backendPayload?.project ?? null;

    return NextResponse.json({
      success: true,
      project,
      data: backendPayload?.data ?? { project },
    });
  } catch (error) {
    console.error("Error updating project", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur lors de la mise à jour du projet.",
      },
      { status: 500 },
    );
  }
}
