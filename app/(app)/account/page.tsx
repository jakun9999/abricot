import { Metadata } from "next";
import FormInput from "@/components/ui/inputs/form-input";
import AbrButton from "@/components/ui/buttons/abr-button";

export const metadata: Metadata = {
  title: "Gestion du compte",
  description: "Page de gestion de votre compte Abricot",
};

export default function Page() {
  return (
    <div className="bg-abr-grey-50 min-h-screen pl-25 pr-31.25">
      <div className="flex flex-col mt-14.25 mb-45.25 w-full max-w-303.75 min-h-161 border border-abr-grey-200 rounded-[10px] bg-abr-white px-14.75 py-10 gap-10.25">
        <div className="flex flex-col gap-2">
          <h5 className="text-abr-grey-800">Mon compte</h5>
          <p className="text-abr-grey-600 text-body-m">Amélie DUPONT</p>
        </div>
        <div className="flex flex-col gap-6">
          <FormInput
            inputId="first-name"
            width="max-[1092px]"
            className="w-full"
            placeHolder="Votre nom"
            label="Nom"
            inputType="text"
          />
          <FormInput
            inputId="last-name"
            width="max-[1092px]"
            className="w-full"
            placeHolder="Votre prénom"
            label="Prénom"
            inputType="text"
          />
          <FormInput
            inputId="email"
            width="max-[1092px]"
            className="w-full"
            placeHolder="Votre email"
            label="Email"
            inputType="email"
          />
          <FormInput
            inputId="password"
            width="max-[1092px]"
            className="w-full"
            placeHolder="Votre mot de passe"
            label="Mot de passe"
            inputType="password"
          />
        </div>
        <AbrButton
          label="Modifier les informations"
          color="black"
          className="w-60.5"
        />
      </div>
    </div>
  );
}
