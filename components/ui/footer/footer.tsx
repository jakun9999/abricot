import { AbricotIcon } from "@/components/ui/icons";

/**
 * Header for auth user only
 *
 * @example
 * ```tsx
 * <Header initals="ML"/>
 * ```
 */
export default function Header() {
  return (
    <div className="flex items-center justify-between h-17 mx-0 w-screen max-w-360 px-7.5 text-black">
      <AbricotIcon className="w-25.25 h-[12.86px]" />
      <p className="text-body-m">Abricot 2025</p>
    </div>
  );
}
