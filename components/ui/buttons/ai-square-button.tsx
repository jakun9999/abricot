"use client";

import { StarIcon } from "@/components/ui/icons/star-icon";

export interface AiSquareButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant colors.
   * - `dark` : Orange BG with white icon.
   * - `light` : Light orange BG with dark orange icon.
   */
  color: "dark" | "light";
  label: string;
}

/**
 * Button component for Abricot UI.
 * @example
 * ```tsx
 * <AiSquareButton aria-label="Générer avec IA" color="dark" label="IA"/>
 * ```
 */
export default function AiSquareButton({
  label = "",
  className = "",
  color,
  ...props
}: AiSquareButtonProps) {
  const mode =
    color === "dark"
      ? "bg-abr-dark-orange text-white hover:bg-abr-main-orange"
      : "bg-abr-light-orange text-abr-dark-orange hover:bg-abr-main-orange/50";
  return (
    <button
      className={`flex items-center justify-center h-12.5 text-body-m hover:cursor-pointer rounded-[10px] gap-2.5 ${mode} ${className}`}
      {...props}
    >
      <StarIcon className="size-5.25" />
      <span className="text-body-m">{label}</span>
    </button>
  );
}
