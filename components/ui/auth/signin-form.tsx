"use client";

import FormInput from "@/components/ui/inputs/form-input";
import React from "react";

export default function SigninForm() {
  return (
    <form action="" className="flex flex-col items-center gap-7.25">
      <h1 aria-label="Inscription sur Abricot" className="text-abr-dark-orange">
        Inscription
      </h1>
      <FormInput
        label="Email"
        inputId="email"
        inputType="email"
        className="w-70.5"
        autoComplete="email"
      />
      <FormInput
        label="Mot de passe"
        inputId="password"
        inputType="password"
        className="w-70.5"
        autoComplete="new-password"
      />
      <button className="w-62.25 h-12.5 rounded-[10px] bg-black text-abr-white text-body-m">
        S'inscrire
      </button>
    </form>
  );
}
