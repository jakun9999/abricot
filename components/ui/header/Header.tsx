import { AbricotIcon, UserIcon } from "@/components/ui/icons";
import MenuItem from "@/components/ui/menus/MenuItem";

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header parameters.
   * initials: user initials for user badge
   */
  initials: string;
}

/**
 * Chips containing an icon (task, calendar, folder) and the feature name.
 *
 * @example
 * ```tsx
 * <Header initals="ML"/>
 * ```
 */
export default function Header({ initials }: HeaderProps) {
  return (
    <div className="flex items-center justify-between h-23.5 mx-0 w-screen max-w-360 px-25 text-abr-dark-orange">
      <AbricotIcon className="w-36.75 h-[18.72px]" />
      <div className="flex items-center justify-center gap-4 text-body-m">
        <MenuItem color="white" type="dashboard" />
        <MenuItem color="white" type="projects" />
      </div>
      <UserIcon label={initials} color="light" />
    </div>
  );
}
