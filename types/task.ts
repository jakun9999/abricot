import { Comment } from "@/types/comment";

/**
 * Représente une tâche individuelle au sein d'un projet.
 */
export interface Task {
  /** Identifiant unique de la tâche (optionnel avant création en BDD). */
  id?: string | number;

  /** User ID who created the tasks */
  userId?: string;

  /** Users who are assigned to the task */
  assignedUsersId?: string[];

  /** Libellé ou titre de la tâche. */
  name: string;

  /** Description détaillée des actions à réaliser. */
  description?: string;

  /** Nom du projet auquel la tâche est rattachée. */
  projectName?: string;

  /** Date d'échéance ou de création au format ISO (ex: "2026-08-20"). */
  date: string;

  /** Nombre de commentaires associés à la tâche. */
  comments?: Comment[];

  /** État d'avancement actuel de la tâche. */
  status: "pending" | "inprogress" | "done";
}
