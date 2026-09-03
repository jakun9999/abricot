/**
 * Corps d’erreur renvoyé par le backend OpenClassrooms (`dev-react-P10`).
 * `success` est toujours `false` côté API d’erreur, mais le champ existe.
 */
export interface Error {
  success: boolean;
  /** Message affichable. */
  message: string;
  /** Code machine (ex. nom d’exception). */
  error: string;
  /** Détails par champ (validation). */
  details: [{ field: string; message: string }];
}
