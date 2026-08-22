import AuthWrapper from "@/components/ui/auth/auth-wrapper";
import SigninForm from "@/components/ui/auth/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Page d'inscription du site de gestion de projet Abricot",
};

export default function Home() {
  return (
    <main>
      <AuthWrapper backgroundImage="/signin-hd.jpg" login={false}>
        <SigninForm />
      </AuthWrapper>
    </main>
  );
}
