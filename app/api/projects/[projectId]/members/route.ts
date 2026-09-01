import { NextResponse } from "next/server";
import { fetchServer } from "@/lib/api-server";
import { Project } from "@/schemas/project-schema";
import { ProjectMember } from "@/schemas/project-member-schema";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    const { projectId } = await params;

    const response = await fetchServer(`/projects/${projectId}`);
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            payload?.message ??
            "Impossible de récupérer les membres du projet.",
        },
        { status: response.status },
      );
    }

    const project: Project | null =
      payload?.data?.project ?? payload?.project ?? null;
    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Projet introuvable.",
        },
        { status: 404 },
      );
    }

    const members = [
      ...(project.owner
        ? [{ id: project.owner.id, role: "OWNER", user: project.owner }]
        : []),
      ...(project.members ?? []).map((member: ProjectMember) => ({
        id: member?.id ?? member?.user?.id,
        role: member?.role ?? "CONTRIBUTOR",
        user: member?.user,
      })),
    ].filter((member) => member?.user?.id);

    const deduplicatedMembers = members.filter(
      (member, index, list) =>
        list.findIndex((item) => item.user.id === member.user.id) === index,
    );

    return NextResponse.json({
      success: true,
      members: deduplicatedMembers,
    });
  } catch (error) {
    console.error("Error fetching project members:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur lors du chargement des membres.",
      },
      { status: 500 },
    );
  }
}
