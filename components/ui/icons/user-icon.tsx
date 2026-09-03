export interface UserIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variante. `dark` = compte actif, `light` = inactif (hover vers dark).
   */
  color: "dark" | "light";
  /** Initiales (tronquées à 2 caractères, mises en majuscules). */
  label: string;
}

/**
 * Avatar circulaire avec initiales. Taille par défaut 65×65 (`h-16.25`), cote Figma header.
 *
 * @example
 * ```tsx
 * <UserIcon color="dark" label="ML" />
 * ```
 */
export default function UserIcon({
  color,
  label,
  className = "h-16.25 w-16.25",
  ...props
}: UserIconProps) {
  const mode =
    color === "dark"
      ? "bg-abr-dark-orange text-white"
      : "bg-abr-light-orange text-black hover:bg-abr-dark-orange hover:text-white transition-colors duration-500";

  const initials = label.trim().toUpperCase().slice(0, 2);

  return (
    <div
      className={`flex items-center justify-center text-caption-l rounded-full ${mode} ${className}`}
      {...props}
    >
      <p>{initials}</p>
    </div>
  );
}
