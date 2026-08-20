"use client";

export interface SelectorOption {
  label: string;
  value: string | number;
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * StdInput variant colors.
   * - `dark` : Orange Dark BG with white text.
   * - `light` : Light orange BG with black text.
   */
  inputId: string;
  mandatory?: true | false;
  inputType: "text" | "password" | "number" | "date" | "selector";
  label: string;
  placeHolder?: string;
  inputWidth?: string;
  // selectorOptions?: SelectorOption | string[];
}

/**
 * Component providing ready to use combo of label + input
 * with either a text/password/number input or date picker or selector
 * @example
 * ```tsx
 * <FormInput aria-label="Input for yyz" label="Password" inputType="password" mandatory=true/>
 * ```
 */
export default function FormInput({
  inputId = "",
  mandatory = false,
  inputType = "text",
  label = "",
  placeHolder = "",
  inputWidth = "w-[280px]",
  // selectorOptions = [],
  className = "",
  ...props
}: FormInputProps) {
  // Generic css classes to include whatever the input type
  const baseLabelCss = "text-body-s text-black";
  const baseInputCss = `flex items-center justify-start h-[53px] ${inputWidth} pl-[17px] bg-white border rounded-[4px] border-gray-200 text-body-xs text-gray-600 placeholder:text-gray-300`;

  return (
    <div className="flex flex-col gap-1.75">
      <label htmlFor={inputId} className={`${baseLabelCss}`}>
        {label}
        {mandatory ? "*" : ""}
      </label>
      <input
        type={inputType}
        placeholder={placeHolder}
        className={`${className} ${baseInputCss}`}
        {...props}
      />
    </div>
  );
}
