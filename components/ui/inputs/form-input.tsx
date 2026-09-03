"use client";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** `id` HTML, relié au `<label htmlFor>`. Doit être unique dans la page. */
  inputId: string;
  /** Affiche un astérisque visuel et `aria-required`. */
  mandatory?: boolean;
  /** Type HTML de l’input. `selector` et `date` sont hérités ; préférer les composants dédiés. */
  inputType: "text" | "password" | "email" | "number" | "date" | "selector";
  /** Libellé visible au-dessus du champ. */
  label: string;
  /** Placeholder (contraste volontairement faible : maquette). */
  placeHolder?: string;
  /** Classe Tailwind de largeur du champ (défaut `w-[280px]`). */
  inputWidth?: string;
}

/**
 * Couple label + champ texte. `className` s’applique à l’`<input>`, pas au wrapper.
 *
 * @example
 * ```tsx
 * <FormInput
 *   inputId="email"
 *   label="Email"
 *   inputType="email"
 *   mandatory
 *   autoComplete="email"
 * />
 * ```
 */
export default function FormInput({
  inputId = "",
  mandatory = false,
  inputType = "text",
  label = "",
  placeHolder = "",
  inputWidth = "w-[280px]",
  value,
  onChange,
  className = "",
  ...props
}: FormInputProps) {
  const baseLabelCss = "text-body-s text-black";
  const baseInputCss = `flex items-center justify-start h-[53px] ${inputWidth} max-w-full
    px-[17px] bg-white border rounded-[4px] border-abr-grey-200 text-body-s 
    text-abr-grey-600 placeholder:text-abr-grey-300 focus:outline-abr-dark-orange 
    focus:outline focus:outline-offset-0 focus:outline focus:outline-solid`;

  return (
    <div className="flex flex-col gap-1.75 max-w-full">
      <label htmlFor={inputId} className={`${baseLabelCss}`}>
        {label}
        {mandatory ? (
          <>
            <span aria-hidden="true">*</span>
            <span className="sr-only"> (obligatoire)</span>
          </>
        ) : null}
      </label>
      <input
        id={inputId}
        type={inputType}
        placeholder={placeHolder}
        className={`${className} ${baseInputCss}`}
        value={value}
        onChange={onChange}
        {...props}
        aria-required={mandatory || undefined}
      />
    </div>
  );
}
