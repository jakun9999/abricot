/**
 * Represent a user in the application.
 */

export interface User {
  /** User unique ID */
  id?: string;

  /** user email */
  email: string;

  /** Full name for the user */
  name: string;

  /** Account creation date with ISO format :
   * 2026-08-20T07:24:38.904Z */
  createdAt?: string;

  /** Last account modification date with ISO format :
   * 2026-08-20T07:24:38.904Z */
  updatedAt?: string;
}
