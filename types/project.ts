import { ProjectMember } from "@/types/project-member";
import { User } from "@/types/user";

/**
 * Represent a project in the application.
 */
export interface Project {
  /** Project unique ID. */
  id?: string | number;

  /** Project name. */
  name: string;

  /** Project description. */
  description: string;

  /** Project owner unique ID. */
  ownerId: string;

  /** Project owner details as user */
  owner: User;

  /** List of members for the project. */
  members: ProjectMember[];

  /** Project creation date in ISO format (ex: "2026-08-20T07:24:38.904Z"). */
  createdAt?: string;

  /** Project update date in ISO format (ex: "2026-08-20T07:24:38.904Z"). */
  updatedAt?: string;
}
