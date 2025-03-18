"use client";

import Link from "next/link";
import { useState } from "react";
// Components
import { Icon } from "./icons/Icon";
import { AvatarCard } from "./AvatarCard";
// Types
import { UserDetailsData } from "../app/user-details/page";
type ProfilesSelectProps = {
  profiles: UserDetailsData["profiles"];
  activeProfileId: UserDetailsData["activeProfileId"];
  redirectOnUpdate?: string;
  className?: string;
};

export const ProfilesSelect = ({
  profiles,
  activeProfileId,
  redirectOnUpdate,
  className = "grid grid-cols-4 gap-5",
}: ProfilesSelectProps) => {
  const [active, setActive] = useState(activeProfileId);

  async function handleUpdate(id: string) {
    setActive(id);

    const response = await fetch("/api/user/update", {
      method: "POST",
      body: JSON.stringify({ activeProfileId: id }),
    });

    if (response.ok) {
      if (redirectOnUpdate) {
        // Use window.location.href to force a full page reload
        window.location.href = redirectOnUpdate;
      }
    } else {
      setActive(activeProfileId);
    }
  }

  return (
    <div className={className}>
      {profiles.map((p) => (
        <AvatarCard
          key={p.id}
          {...p}
          selected={p.id === active}
          onClick={() => handleUpdate(p.id)}
          redirectOnUpdate={!!redirectOnUpdate}
        />
      ))}
      {!redirectOnUpdate && (
        <Link
          href="/user-details/settings/profile/new"
          className="btn aspect-square flex items-center justify-center rounded-2xl border border-mid-grey"
        >
          <Icon icon="plus" iconWidth={24} iconHeight={24} />
        </Link>
      )}
    </div>
  );
};
