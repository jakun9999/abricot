import { Task } from "@/types/task";

/**
 * Représente un projet au sein de l'application.
 */
export interface Project {
  /** Identifiant unique du projet (généré par le serveur si absent). */
  id?: string | number;

  /** Nom du projet. */
  name: string;

  /** Description détaillée des objectifs du projet. */
  description: string;

  /** Liste des tâches associées au projet. */
  tasks: Task[];

  /** Date de création au format ISO (ex: "2026-08-20T10:00:00Z"). */
  createdAt?: string;

  /** Identifiant ou nom du propriétaire du projet. */
  owner: string;

  /** Liste des identifiants des membres ayant accès au projet. */
  members: string[];
}
