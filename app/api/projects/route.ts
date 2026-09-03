import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchServer, requireApiSession } from "@/lib/api-server";
import { fetchSessionUser, isProjectParticipant } from "@/lib/project-access";
import { Project } from "@/schemas/project-schema";

const ProjectCreateSchema = z
  .object({
    name: z.string().min(1).optional(),
    description: z.string().min(1),
    contributors: z.array(z.email()).default([]),
  })
  .refine((data) => Boolean(data.name), {
    message: "Le nom du projet est requis.",
    path: ["name"],
  });

export async function GET() {
  try {
    const session = await requireApiSession();
    if (session.response) return session.response;

    const response = await fetchServer(`/projects`);
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            payload?.message ?? "Impossible de récupérer la liste des projets.",
        },
        { status: response.status },
      );
    }

    const projects: Project[] =
      payload?.data?.projects ?? payload?.projects ?? [];

    const user = await fetchSessionUser();
    const visibleProjects = user
      ? projects.filter((project) => isProjectParticipant(project, user.id))
      : [];

    return NextResponse.json({
      success: true,
      projects: visibleProjects,
    });
  } catch (error) {
    console.error("Error fetching projects list", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur lors du chargement des projets.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireApiSession();
    if (session.response) return session.response;

    const body = await request.json();

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

    const { name, description, contributors } = validation.data;
    const payload = {
      name,
      description,
      contributors,
    };

    const response = await fetchServer(`/projects`, {
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
          message: backendPayload?.message ?? "Impossible de créer le projet.",
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
    console.error("Error creating project", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur lors de la création du projet.",
      },
      { status: 500 },
    );
  }
}
