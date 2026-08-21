"use client";

import FormInput from "@/components/ui/inputs/form-input";
import React from "react";

export default function LoginForm() {
  return (
    <form action="" className="flex flex-col items-center gap-7.25">
      <h1
        aria-label="Connexion à votre espace Abricot"
        className="text-abr-dark-orange"
      >
        Connexion
      </h1>
      <FormInput
        label="Email"
        inputId="email"
        inputType="email"
        className="w-70.5"
      />
      <FormInput
        label="Mot de passe"
        inputId="password"
        inputType="password"
        className="w-70.5"
      />
      <button className="w-62.25 h-12.5 rounded-[10px] bg-black text-abr-white text-body-m">
        Se connecter
      </button>
    </form>
  );
}
