"use client";

import Image from "next/image";

/**
 * Croix de fermeture des modales. Zone cliquable min 24×24 (WCAG 2.5.8) sans
 * agrandir l’icône Figma (14 px).
 */
export default function ModalCloseButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Fermer"
      className="self-end flex items-center justify-center min-h-6 min-w-6 p-1 cursor-pointer text-abr-grey-600"
    >
      <Image src="/close.svg" alt="" width={14.33} height={14.33} aria-hidden="true" />
    </button>
  );
}
