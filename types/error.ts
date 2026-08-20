/** Represent an error coming from an exchange
 *  with backend API
 */

export interface Error {
  /** Boolean status for the error */
  success: boolean;

  /** Texte message for the error */
  message: string;

  /** Error code */
  error: string;

  /** Additionnal messages */
  details: [{ field: string; message: string }];
}
