import React from "react";
import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer/footer";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-container max-w-360 min-h-screen w-full mx-auto flex flex-col items-center">
      <Header initials="ML" />
      <main className="bg-abr-grey-50 w-full">{children}</main>
      <Footer />
    </div>
  );
}
