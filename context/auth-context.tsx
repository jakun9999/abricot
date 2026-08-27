"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/schemas/user";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // When refreshing abricot or when connecting for the first time
  // we check if the local cookie with user profil exists
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
  }, []);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in a AuthProvider");
  }
  return context;
}
