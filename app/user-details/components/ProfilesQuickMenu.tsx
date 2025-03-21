"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
// Components
import { AvatarCard } from "@/components/form";
import { Icon } from "@/components/icons/Icon";
// Types
import { UserDetailsData } from "../page";
type ProfilesQuickMenuProps = {
  profiles: UserDetailsData["profiles"];
  activeProfileId: UserDetailsData["activeProfileId"];
};

export const ProfilesQuickMenu = ({ profiles, activeProfileId }: ProfilesQuickMenuProps) => {
  const [active, setActive] = useState(activeProfileId);

  const { update } = useSession();
  async function handleUpdate(profile: UserDetailsData["profiles"][0]) {
    const { id, name, avatar, dateOfBirth } = profile;

    setActive(id);

    const response = await fetch("/api/user/update", {
      method: "POST",
      body: JSON.stringify({ activeProfileId: id }),
    });

    if (response.ok) {
      update({
        activeProfileId: id,
        activeProfile: {
          profileId: id,
          profileName: name,
          profileAvatarSlug: avatar,
          profileDateOfBirth: dateOfBirth,
        },
      });
    } else {
      setActive(activeProfileId);
    }
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      {profiles.map((p) => (
        <AvatarCard
          key={p.id}
          id={p.id}
          avatar={p.avatar}
          selected={p.id === active}
          onClick={() => handleUpdate(p)}
        />
      ))}
      <Link
        href="/user-details/settings/profile/new"
        className="btn aspect-square flex items-center justify-center rounded-2xl border border-mid-grey"
      >
        <Icon icon="plus" iconWidth={24} iconHeight={24} />
      </Link>
    </div>
  );
};
