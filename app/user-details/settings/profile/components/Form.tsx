"use client";

import Link from "next/link";
import { useState } from "react";
// Components
import { AvatarSelect, Input } from "@/components/form";
// Types
import type { ProfileData } from "../[slug]/page";
type FormProps = {
  profile: ProfileData["profile"];
};

export const Form = ({ profile }: FormProps) => {
  const [name, setName] = useState(profile.name);
  const [dateOfBirth, setDateOfBirth] = useState(profile.dateOfBirth);
  const [avatar, setAvatar] = useState(profile.avatar);
  // Check if the profile has been updated
  const updated =
    name !== profile.name || dateOfBirth !== profile.dateOfBirth || avatar !== profile.avatar;

  return (
    <form className="!w-[var(--app-width-min)] !flex-row flex-wrap !justify-end gap-4 mt-4">
      <AvatarSelect selected={avatar} setSelected={setAvatar} />
      <Input name="name" label="Name" value={name} setValue={setName} />
      <Input
        name="date"
        label="Date of Birth"
        value={dateOfBirth}
        setValue={setDateOfBirth}
        type="date"
      />
      <Link href="/user-details/settings/profiles" className="btn-blank w-[90px] !text-tertiary">
        Cancel
      </Link>
      <button className="btn-tertiary w-[90px]" disabled={!updated}>
        Save
      </button>
    </form>
  );
};
