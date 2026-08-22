import AuthWrapper from "@/components/ui/auth/auth-wrapper";
import LoginForm from "@/components/ui/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Page de connexion du site de gestion de projet Abricot",
};
export default function Home() {
  return (
    <main>
      <AuthWrapper backgroundImage="/login-hd.jpg" login={true}>
        <LoginForm />
      </AuthWrapper>
    </main>
  );
}
