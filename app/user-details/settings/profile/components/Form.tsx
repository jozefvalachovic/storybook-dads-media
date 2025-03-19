"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormHandler } from "@/hooks/formHandler";
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

  const { handleSubmit, error } = useFormHandler(async () => {
    const response = await fetch("/api/profile/update", {
      method: "POST",
      body: JSON.stringify({
        profileId: profile.id,
        profileName: name,
        profileDateOfBirth: dateOfBirth,
        profileAvatarSlug: avatar,
      }),
    });

    if (!response.ok || error) {
      console.error("Failed to update user details");
    }
  });

  const disabled =
    name === profile.name && dateOfBirth === profile.dateOfBirth && avatar === profile.avatar;

  return (
    <form
      className="!w-[var(--app-width-min)] !flex-row flex-wrap !justify-end gap-4 mt-4"
      onSubmit={handleSubmit}
    >
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
      <button className="btn-tertiary w-[90px]">Save</button>
    </form>
  );
};
