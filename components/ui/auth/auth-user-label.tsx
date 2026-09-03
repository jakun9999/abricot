"use client";

import { useAuth } from "@/context/auth-context";

/**
 * Affiche le nom de l’utilisateur connecté, ou un fallback si le cookie profil
 * est absent / illisible (header encore monté).
 */
export default function AuthUserLabel() {
  const { user } = useAuth();

  return <>{user !== null ? user?.name : "Invalid user name"}</>;
}
