export interface UserIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * UserIcon variant colors.
   * - `dark` : Orange Dark BG with white text.
   * - `light` : Light orange BG with black text.
   */
  color: "dark" | "light";
  label: string;
}

/**
 * Circular user icon (40x40px) containing the user's initials.
 * @example
 * ```tsx
 * <UserIcon aria-label="User initials" color="dark" label="AB"/>
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

  // We make sure that initials are trimmed, uppercased, and limited to 2 characters.
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
