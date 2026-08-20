export interface LabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Label variant colors.
   * - `green` : Light Green BG with Success green text.
   * - `red` : Error Red Light BG with Error Red text.
   * - `blue` : Info Blue Light BG with Info Blue text.
   * - `warningOrangeLight` : Warning orange light BG with warning orange text.
   * - `lightOrange` : Light orange BG with dark orange text.
   * - `grey` : Gray 200 BG with gray 600 text.
   */
  color:
    "green" | "red" | "blue" | "warningOrangeLight" | "lightOrange" | "grey";
  text?: string;
}

/**
 * Label containing text and a background color.
 *
 * @example
 * ```tsx
 * <Label aria-label="My label" color="green" "/>
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
      {text && <span className="text-body-s">{text}</span>}
    </span>
  );
}
