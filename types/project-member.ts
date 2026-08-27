import { User } from "@/schemas/user";

/**
 * Each project member are attached to a single
 * project.
 */
export interface ProjectMember {
  /** ProjectMember unique ID. */
  id?: string;

  /** Assigned role for the member inside the project */
  role: "OWNER" | "ADMIN" | "CONTRIBUTOR";

  /** Attached user for this project member */
  user: User;

  /** When the project member joined a the project ISO format :
   * 2026-08-20T07:24:38.904Z */
  joinedAt: string;
}
