import Image from "next/image";
import React from "react";
import { AbricotIcon } from "../icons";
import Link from "next/link";

interface AuthWrapperProps {
  children: React.ReactNode;
  backgroundImage: string;
  login: boolean;
}

export default function AuthWrapper({
  children,
  backgroundImage,
  login,
}: AuthWrapperProps) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Form column */}
      <div className="flex w-full flex-col justify-between max-h-256 items-center py-[111.92] lg:w-[40%]">
        <AbricotIcon
          className="w-[252.57px] h-[32.17px] text-abr-dark-orange"
          aria-label="Logo Abricot"
          role="img"
        />
        {children}
        {login ? (
          <p className="flex item-center text-body-s">
            Pas encore de compte ?
            <Link
              href="/signin"
              className="ml-2.5 text-abr-dark-orange underline"
            >
              Créer un compte
            </Link>
          </p>
        ) : (
          <p className="flex item-center text-body-s">
            Déjà inscrit ?
            <Link
              href="/login"
              className="ml-2.5 text-abr-dark-orange underline"
            >
              Se connecter
            </Link>
          </p>
        )}
      </div>
      {/* Image container for dynamic background */}
      <div className="relative hidden lg:block lg:w-[60%]">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 0vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
