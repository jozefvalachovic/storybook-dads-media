import Link from "next/link";
// Components
import { Icon } from "@/components/icons/Icon";
// Types
import type { SettingsProfilesData } from "../page";
type ProfilesMenuProps = {
  profiles: SettingsProfilesData["profiles"];
};

export const ProfilesMenu = ({ profiles }: ProfilesMenuProps) => {
  return (
    <div className="min-w-[var(--app-width-min)] flex flex-col gap-2 mt-4">
      {profiles.map(({ id, name, avatar }) => {
        const firstName = name.split(" ")[0];

        return (
          <Link
            key={id}
            href={`/user-details/settings/profile/${id}`}
            className="btn flex bg-light-grey p-6 rounded-xl"
          >
            <Icon icon={`avatar${avatar}`} iconWidth={20} iconHeight={20} />
            <p className="ml-3">{firstName}</p>
          </Link>
        );
      })}
    </div>
  );
};
