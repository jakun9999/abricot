export interface LabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Couleur sémantique (jetons Figma, contrastes non ajustés volontairement).
   * - `green` : terminé.
   * - `red` : à faire.
   * - `blue` : info.
   * - `warningOrangeLight` : en cours.
   * - `lightOrange` : mise en avant marque.
   * - `grey` : neutre / compteur.
   */
  color:
    | "green"
    | "red"
    | "blue"
    | "warningOrangeLight"
    | "lightOrange"
    | "grey";
  /** Texte affiché dans la pastille. */
  text?: string;
}

/**
 * Pastille de statut (tâche, compteur kanban). Le texte passe de `body-xs` à
 * `body-s` à partir de `lg` : en-dessous, « À faire » débordait de la pastille.
 *
 * @example
 * ```tsx
 * <Label color="red" text="À faire" />
 * ```
 */
export default function Label({
  color,
  text,
  className = "",
  ...props
}: LabelProps) {
  let mode = "text-abr-success-green bg-abr-success-green-light";
  switch (color) {
    case "red":
      mode = "text-abr-error-red bg-abr-error-red-light";
      break;
    case "blue":
      mode = "text-abr-info-blue bg-abr-info-blue-light";
      break;
    case "warningOrangeLight":
      mode = "text-abr-warning-orange bg-abr-warning-orange-light";
      break;
    case "lightOrange":
      mode = "text-abr-dark-orange bg-abr-light-orange";
      break;
    case "grey":
      mode = "text-abr-grey-600 bg-abr-grey-200";
      break;
  }

  return (
    <span
      {...props}
      className={`flex items-center justify-center h-6.25 px-4 rounded-[50px] ${mode} ${className}`}
    >
      {text && (
        <span className="text-body-xs lg:text-body-s whitespace-nowrap">
          {text}
        </span>
      )}
    </span>
  );
}
