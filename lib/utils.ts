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
export const getUserInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/**
 * Formate une date ISO en libellé lisible (ex: "aujourd'hui, 11:20", "23 mars, 11:20" ou "23 mars 2024, 11:20").
 *
 * @param isoString - Date au format ISO 8601 (ex: "2025-12-30T10:00:00Z").
 * @returns La date formatée en français.
 *
 * @example
 * formatDateRelative("2026-08-20T11:20:00Z") // "aujourd'hui, 11:20"
 * formatDateRelative("2026-03-23T11:20:00Z") // "23 mars, 11:20"
 * formatDateRelative("2024-03-23T11:20:00Z") // "23 mars 2024, 11:20"
 */
export const formatDateRelative = (isoString: string): string => {
  const date = new Date(isoString);

  // Sécurité en cas de chaîne de date invalide
  if (isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  // Extraction de l'heure au format "11:20"
  const time = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Vérification du jour même
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return `aujourd'hui, ${time}`;
  }

  // Formatage du jour et du mois (ex: "23 mars")
  const dayAndMonth = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });

  const isCurrentYear = date.getFullYear() === now.getFullYear();

  // Si même année : "23 mars, 11:20", sinon : "23 mars 2024, 11:20"
  if (isCurrentYear) {
    return `${dayAndMonth}, ${time}`;
  }

  return `${dayAndMonth} ${date.getFullYear()}, ${time}`;
};

/**
 * Formate une date ISO en libellé lisible (ex: "aujourd'hui", "23 mars" ou "23 mars 2024").
 *
 * @param isoString - Date au format ISO 8601 (ex: "2025-12-30T10:00:00Z").
 * @returns La date formatée en français.
 *
 * @example
 * formatDateRelative("2026-08-20T11:20:00Z") // "aujourd'hui"
 * formatDateRelative("2026-03-23T11:20:00Z") // "23 mars"
 * formatDateRelative("2024-03-23T11:20:00Z") // "23 mars 2024"
 */
export const formatDateShort = (isoString: string): string => {
  const date = new Date(isoString);

  // Sécurité en cas de chaîne de date invalide
  if (isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  // Vérification du jour même
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return "aujourd'hui";
  }

  // Formatage du jour et du mois (ex: "23 mars")
  const dayAndMonth = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });

  const isCurrentYear = date.getFullYear() === now.getFullYear();

  // Si même année : "23 mars", sinon : "23 mars 2024"
  if (isCurrentYear) {
    return `${dayAndMonth}`;
  }

  return `${dayAndMonth} ${date.getFullYear()}`;
};
