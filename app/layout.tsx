import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Abricot",
    template: "%s - Abricot",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Force le rendu dynamique : le nonce CSP change à chaque requête.
  await headers();
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
