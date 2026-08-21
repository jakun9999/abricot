import AuthWrapper from "@/components/ui/auth/auth-wrapper";
import LoginForm from "@/components/ui/auth/login-form";

export default function Home() {
  return (
    <main>
      <AuthWrapper backgroundImage="/login-hd.jpg" login={true}>
        <LoginForm />
      </AuthWrapper>
    </main>
  );
}
