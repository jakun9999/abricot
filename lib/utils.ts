/**
 * Extrait les initiales d’un nom (2 lettres max, majuscules).
 *
 * @param name - Nom complet (ex. `"Jean Dupont"`).
 * @returns Initiales (ex. `"JD"`), chaîne vide si `name` est vide.
 *
 * @example
 * getUserInitials("Jean Dupont") // "JD"
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
 * Date ISO → libellé FR avec heure (`aujourd'hui, 11:20`, `23 mars, 11:20`, ou avec l’année).
 *
 * @param isoString - Date ISO 8601.
 * @returns Libellé, ou `""` si la date est invalide (évite `Invalid Date` dans l’UI).
 *
 * @example
 * formatDateRelative("2026-08-20T11:20:00Z")
 */
export const formatDateRelative = (isoString: string): string => {
  const date = new Date(isoString);

  if (!Number.isFinite(date.getTime())) {
    return "";
  }

  const now = new Date();

  const time = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return `aujourd'hui, ${time}`;
  }

  const dayAndMonth = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });

  const isCurrentYear = date.getFullYear() === now.getFullYear();

  if (isCurrentYear) {
    return `${dayAndMonth}, ${time}`;
  }

  return `${dayAndMonth} ${date.getFullYear()}, ${time}`;
};

/**
 * Date ISO → libellé FR sans heure (`aujourd'hui`, `23 mars`, `23 mars 2024`).
 *
 * @param isoString - Date ISO 8601.
 * @returns Libellé, ou `""` si invalide.
 */
export const formatDateShort = (isoString: string): string => {
  const date = new Date(isoString);

  if (!Number.isFinite(date.getTime())) {
    return "";
  }

  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return "aujourd'hui";
  }

  const dayAndMonth = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });

  const isCurrentYear = date.getFullYear() === now.getFullYear();

  if (isCurrentYear) {
    return `${dayAndMonth}`;
  }

  return `${dayAndMonth} ${date.getFullYear()}`;
};
