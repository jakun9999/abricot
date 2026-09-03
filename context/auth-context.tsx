"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/schemas/user-schema";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  /** `false` tant que le cookie `user_data` n’a pas été lu (évite un flash 404 / header). */
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth client. Le JWT est en cookie HttpOnly (`token`) ; le profil est dans
 * `user_data` (lisible en JS) pour hydrater le header sans appel API.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const userDataCookie = getCookie("user_data");
    if (userDataCookie) {
      try {
        setUser(JSON.parse(decodeURIComponent(userDataCookie)));
      } catch (e) {
        console.error("Error while reading user_data cookie", e);
      }
    }
    setIsReady(true);
  }, []);

  /** Efface les cookies de session via `POST /api/logout`, puis redirige vers `/login`. */
  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
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
