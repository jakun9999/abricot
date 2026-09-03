import { NextResponse } from "next/server";
import { requireApiSession } from "@/lib/api-server";
import { loadAccessibleProject, projectAccessDenied } from "@/lib/project-access";
import { ProjectMember } from "@/schemas/project-member-schema";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireApiSession();
    if (session.response) return session.response;

    const { id } = await params;
    const access = await loadAccessibleProject(id);
    if (!access.ok) return projectAccessDenied(access);

    const project = access.project;

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
