/** Represent a success feedback
 *  from the backend API
 */

export interface Success {
  /** Boolean status from the request */
  success: boolean;

  /** Success text message */
  message: string;

  /** Data sent back by backend API request */
  data: { any: object };
}
