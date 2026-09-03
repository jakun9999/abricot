import { cookies } from "next/headers";

const API_URL = process.env.API_URL_INTERNAL;

/**
 * `fetch` authentifié pour les Server Components. Ajoute le Bearer du cookie
 * `token`. L’URL pointe vers `API_URL_INTERNAL` (réseau Docker / serveur), pas
 * vers l’hôte public du navigateur.
 *
 * @param endpoint - Chemin backend (ex. `"/projects"`).
 * @param options - Options `fetch` (méthode, body…). Les headers sont fusionnés.
 * @returns Réponse brute. Un 401 n’est pas redirigé ici (pas de `redirect` dans un helper partagé).
 */
export async function fetchServer(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_URL}${endpoint}`, { ...options, headers });
}
