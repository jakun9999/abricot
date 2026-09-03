import { NextResponse } from "next/server";
import { fetchServer } from "@/lib/api-server";
import { Project } from "@/schemas/project-schema";
import { User, UserSchema } from "@/schemas/user-schema";

/**
 * Identité session : `GET /auth/profile` (le backend décode le JWT).
 * On ne lit **pas** le cookie `user_data` (falsifiable en JS).
 */
export async function fetchSessionUser(): Promise<User | null> {
  const response = await fetchServer("/auth/profile");
  if (!response.ok) {
    return null;
  }

  const payload = await response.json().catch(() => null);
  const parsed = UserSchema.safeParse(
    payload?.data?.user ?? payload?.user ?? payload?.data,
  );

  return parsed.success ? parsed.data : null;
}

/** Propriétaire ou membre listé sur le projet. */
export function isProjectParticipant(project: Project, userId: string): boolean {
  if (project.ownerId === userId || project.owner?.id === userId) {
    return true;
  }

  return (project.members ?? []).some((member) => member.user?.id === userId);
}

/** `OWNER` / `ADMIN` : modification des métadonnées du projet. */
export function canManageProject(project: Project, userId: string): boolean {
  if (project.ownerId === userId || project.owner?.id === userId) {
    return true;
  }

  return (project.members ?? []).some(
    (member) =>
      member.user?.id === userId &&
      (member.role === "OWNER" || member.role === "ADMIN"),
  );
}

export type ProjectAccess =
  | { ok: true; project: Project; user: User }
  | { ok: false; status: number; message: string };

/**
 * Charge le projet et refuse l’accès si l’utilisateur du JWT n’y figure pas
 * (filet si le backend a un IDOR).
 */
export async function loadAccessibleProject(
  projectId: string,
): Promise<ProjectAccess> {
  const user = await fetchSessionUser();
  if (!user) {
    return { ok: false, status: 401, message: "Non authentifié" };
  }

  const response = await fetchServer(`/projects/${projectId}`);
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: payload?.message ?? "Impossible de charger le projet.",
    };
  }

  const project: Project | null =
    payload?.data?.project ?? payload?.project ?? null;

  if (!project) {
    return { ok: false, status: 404, message: "Projet introuvable." };
  }

  if (!isProjectParticipant(project, user.id)) {
    return {
      ok: false,
      status: 403,
      message: "Vous n’avez pas accès à ce projet.",
    };
  }

  return { ok: true, project, user };
}

export function projectAccessDenied(access: Extract<ProjectAccess, { ok: false }>) {
  return NextResponse.json(
    { success: false, message: access.message },
    { status: access.status },
  );
}
