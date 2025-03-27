import Link from "next/link";
// Components
import { Icon } from "@/components/icons/Icon";
// Types
import type { SettingsProfilesData } from "../page";
type ProfilesMenuProps = {
  profiles: SettingsProfilesData;
  profilesMax: number;
};

export const ProfilesMenu = ({ profiles, profilesMax }: ProfilesMenuProps) => {
  return (
    <div className="min-w-[var(--app-width-min)] flex flex-col gap-2 mt-4">
      {profiles.map(({ id, name, avatar }) => {
        const firstName = name.split(" ")[0];

        return (
          <Link
            key={id}
            href={`/user-details/settings/profile/${id}`}
            className="btn flex bg-light-grey p-4 rounded-xl"
          >
            <Icon icon={`avatar${avatar}`} iconWidth={20} iconHeight={20} />
            <p className="ml-3">{firstName}</p>
          </Link>
        );
      })}
      {profiles.length > profilesMax ? null : (
        <Link
          href="/user-details/settings/profile/new"
          className="flex items-center justify-center mt-4"
        >
          <Icon icon="plus" iconWidth={16} iconHeight={16} iconColor="var(--color-tertiary)" />
          <p className="!text-tertiary ml-4">Add Profile</p>
        </Link>
      )}
    </div>
  );
};
