"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import FormInput from "@/components/ui/inputs/form-input";
import AbrButton from "@/components/ui/buttons/abr-button";

export default function AccountForm() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("**********");

  return (
    <form className="flex flex-col gap-10.25">
      <div className="flex flex-col gap-6">
        <FormInput
          inputId="name"
          width="max-[1092px]"
          className="w-full"
          placeHolder="Votre nom"
          label="Nom"
          inputType="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          inputId="email"
          width="max-[1092px]"
          className="w-full"
          placeHolder="Votre email"
          label="Email"
          inputType="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          inputId="password"
          width="max-[1092px]"
          className="w-full"
          placeHolder="Votre mot de passe"
          label="Mot de passe"
          inputType="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <AbrButton
        type="submit"
        label="Modifier les informations"
        color="black"
        className="w-60.5"
      />
    </form>
  );
}
