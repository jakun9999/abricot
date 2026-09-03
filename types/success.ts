/**
 * Enveloppe de succès du backend (`data` typé trop lâche : chaque route
 * recaste ensuite via Zod).
 */
export interface Success {
  success: boolean;
  message: string;
  data: { any: object };
}
