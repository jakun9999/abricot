/**
 * Représente un commentaire rattaché à une tâche.
 */
export interface Comment {
  /** Identifiant unique du commentaire (optionnel avant création en BDD). */
  id?: string | number;

  /** Texte du commentaire. */
  description: string;

  /** ID de la task à laquelle le commentaire est rattaché. */
  taskId?: string;

  /** Date de création au format ISO (ex: "2026-08-20T10:00:00Z"). */
  createdAt?: string;

  /** Nom complet de l'utilisateur ayant posté le commentaire */
  userFullName: string;
}
