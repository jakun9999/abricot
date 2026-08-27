"use client";

import { useAuth } from "@/context/auth-context";

export default function AuthUserLabel() {
  const { user } = useAuth();

  return <>{user !== null ? user?.name : "Invalid user name"}</>;
}
