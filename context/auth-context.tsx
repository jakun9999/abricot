"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import { User, UserSchema } from "@/schemas/user-schema";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  /** `false` tant que le cookie `user_data` n’a pas été lu (évite un flash 404 / header). */
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const subscribe = () => () => {};

function getClientReady() {
  return true;
}

function getServerReady() {
  return false;
}

function readUserDataCookie(): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; user_data=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

let cookieSnapshotRaw: string | undefined | null = null;
let cookieSnapshotUser: User | null = null;

function getCookieUserSnapshot(): User | null {
  const raw = readUserDataCookie();
  if (raw === cookieSnapshotRaw) {
    return cookieSnapshotUser;
  }
  cookieSnapshotRaw = raw;
  if (!raw) {
    cookieSnapshotUser = null;
    return null;
  }
  try {
    const parsed = UserSchema.safeParse(JSON.parse(decodeURIComponent(raw)));
    cookieSnapshotUser = parsed.success ? parsed.data : null;
  } catch {
    cookieSnapshotUser = null;
  }
  return cookieSnapshotUser;
}

function getServerUserSnapshot(): User | null {
  return null;
}

/**
 * Auth client. Le JWT est en cookie HttpOnly (`token`) ; le profil est dans
 * `user_data` (lisible en JS) pour hydrater le header sans appel API.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const cookieUser = useSyncExternalStore(
    subscribe,
    getCookieUserSnapshot,
    getServerUserSnapshot,
  );
  const isReady = useSyncExternalStore(
    subscribe,
    getClientReady,
    getServerReady,
  );
  const [overrideUser, setOverrideUser] = useState<User | null | undefined>(
    undefined,
  );
  const user = overrideUser === undefined ? cookieUser : overrideUser;

  const setUser = useCallback((next: User | null) => {
    setOverrideUser(next);
  }, []);

  /** Efface les cookies de session via `POST /api/logout`, puis redirige vers `/login`. */
  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setOverrideUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Accès au contexte auth. À n’utiliser que sous {@link AuthProvider}.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in a AuthProvider");
  }
  return context;
}
