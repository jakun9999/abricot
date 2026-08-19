"use client";

export interface AbrButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * AbrButton variant colors
   * - `black` : default button mode.
   * - `outline` : White BG and dark orange text and border.
   *
   */
  color: "black" | "outline";
  label: string;
}

/**
 * Button component for Abricot UI.
 * @example
 * ```tsx
 * <AbrButton aria-label="Back" color="dark" label="Button"/>
 * ```
 */
export default function AbrButton({
  label = "",
  className = "",
  color,
  ...props
}: AbrButtonProps) {
  const mode =
    color === "black"
      ? "bg-gray-800 text-white focus:bg-gray-950 disabled:bg-gray-200 disabled:text-gray-400"
      : "bg-white text-abr-dark-orange border border-abr-dark-orange";
  return (
    <button
      className={`flex items-center justify-center h-12.5 text-body-m rounded-[10px] ${mode} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
