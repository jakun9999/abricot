/**
 * Encadre du texte **non fiable** pour le LLM.
 * Les chevrons sont retirés pour empêcher de fermer le bloc et d’injecter
 * des « instructions » qui passeraient pour du système.
 */
export function untrustedLlmBlock(name: string, value: string, max = 4000): string {
  const safe = value.replace(/[<>]/g, " ").slice(0, max);
  return `<<<${name}\n${safe}\n${name}>>>`;
}

/** Nettoie une chaîne générée (contrôle + longueur) avant l’UI. */
export function sanitizeLlmText(value: string, max: number): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}
