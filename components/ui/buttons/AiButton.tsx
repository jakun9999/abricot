"use client";

import StarIcon from "@/components/ui/icons/StarIcon";

export interface AiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant colors.
   * - `dark` : Orange BG with white icon.
   * - `light` : Light orange BG with dark orange icon.
   */
  color: "dark" | "light";
}

/**
 * Circular IA action button (40x40px) containing a star icon.
 *
 * @example
 * ```tsx
 * <AiButton aria-label="Generate with AI" color="dark" onClick="{handleAiAction}"/>
 * ```
 */
export default function AiButton({
  color,
  className = "",
  ...props
}: AiButtonProps) {
  const mode =
    color === "dark"
      ? "bg-abr-dark-orange text-white hover:bg-abr-main-orange"
      : "bg-abr-light-orange text-abr-dark-orange hover:bg-abr-main-orange/50";

  return (
    <button
      {...props}
      className={`flex items-center justify-center h-10 w-10 rounded-full transition-colors ${mode} ${className}`}
    >
      <StarIcon className="size-3.5" />
    </button>
  );
}
