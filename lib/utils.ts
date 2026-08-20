/**
 * Extrait les initiales d'un nom complet (2 lettres max en majuscules).
 *
 * @param name - Le nom complet de l'utilisateur (ex: "Jean Dupont").
 * @return Les initiales en majuscules (ex: "JD").
 *
 * @example
 * getUserInitials("Jean Dupont") // "JD"
 * getUserInitials("  john   doe ") // "JD"
 * getUserInitials("Alice") // "A"
 */
const getUserInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default getUserInitials;
