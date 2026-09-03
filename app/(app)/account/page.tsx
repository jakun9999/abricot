import { Metadata } from "next";
import AuthUserLabel from "@/components/ui/auth/auth-user-label";
import AccountForm from "@/components/ui/auth/account-form";

export const metadata: Metadata = {
  title: "Gestion du compte",
  description: "Page de gestion de votre compte Abricot",
};

export default function Page() {
  return (
    <div className="bg-abr-grey-50 min-h-screen px-4 lg:pl-25 lg:pr-31.25">
      <div className="flex flex-col mt-14.25 mb-45.25 w-full max-w-303.75 min-h-141.75 border border-abr-grey-200 rounded-[10px] bg-abr-white px-4 md:px-8 lg:px-14.75 py-10 gap-10.25">
        <div className="flex flex-col gap-2">
          <h1 className="sr-only">Mon compte</h1>
          <h5 className="text-abr-grey-800" aria-hidden="true">
            Mon compte
          </h5>
          <p className="text-abr-grey-600 text-body-m">
            <AuthUserLabel />
          </p>
        </div>
        <AccountForm />
      </div>
    </div>
  );
}
