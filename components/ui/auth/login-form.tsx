"use client";

import FormInput from "@/components/ui/inputs/form-input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

/** Formulaire de connexion. Succès → cookie posé par `/api/login`, puis `/dashboard`. */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Identifiants incorrects");
      }

      setUser(result.user);
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Identifiants incorrects");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-7.25"
    >
      <h1 className="text-abr-dark-orange">Connexion</h1>
      <FormInput
        label="Email"
        inputId="email"
        inputType="email"
        className="w-70.5 max-w-full"
        autoComplete="email"
        required
        aria-invalid={error ? true : undefined}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        label="Mot de passe"
        inputId="password"
        inputType="password"
        className="w-70.5 max-w-full"
        autoComplete="current-password"
        required
        aria-invalid={error ? true : undefined}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-62.25 max-w-full h-12.5 rounded-[10px] bg-black text-abr-white text-body-m"
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
      <p className={`${error ? "" : "hidden "}text-body-s text-abr-error-red`} role="alert">
        {error}
      </p>
    </form>
  );
}
