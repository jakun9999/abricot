import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isSessionJwtUsable } from "@/lib/jwt";

const API_URL = process.env.API_URL_INTERNAL;

/**
 * Durée des cookies de session (`token`, `user_data`) : **24 heures**.
 * Timeout absolu classique d’une session web (pas un « remember me » 7 jours).
 */
export const SESSION_MAX_AGE_SECONDS = 24 * 60 * 60;

/** Valeur cookie `user_data` : JSON encodé (noms / e-mails hors ASCII). */
export function encodeUserDataCookie(user: unknown): string {
  return encodeURIComponent(JSON.stringify(user));
}

/**
 * JWT de session (`cookie` `token`). `undefined` si absent, mal formé ou expiré.
 */
export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token || !(await isSessionJwtUsable(token))) {
    return undefined;
  }
  return token;
}

/** Réponse JSON 401 partagée par les routes BFF. */
export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, message: "Non authentifié" },
    { status: 401 },
  );
}

/**
 * Garde BFF : cookie `token` obligatoire. À appeler en tête de route
 * (login / signup / logout exclus).
 */
export async function requireApiSession(): Promise<
  { token: string; response: null } | { token: null; response: NextResponse }
> {
  const token = await getSessionToken();
  if (!token) {
    return { token: null, response: unauthorizedResponse() };
  }
  return { token, response: null };
}

/**
 * `fetch` authentifié pour les Server Components et le BFF. Sans cookie
 * `token` utilisable (absent, bidon ou expiré), renvoie un 401 **sans**
 * appeler le backend.
 *
 * @param endpoint - Chemin backend (ex. `"/projects"`).
 * @param options - Options `fetch` (méthode, body…). Les headers sont fusionnés.
 */
export async function fetchServer(endpoint: string, options: RequestInit = {}) {
  const token = await getSessionToken();

  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: "Non authentifié" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);

  return fetch(`${API_URL}${endpoint}`, { ...options, headers });
}
