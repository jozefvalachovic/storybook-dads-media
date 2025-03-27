"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormHandler } from "@/hooks/formHandler";
// Components
import { AvatarSelect, Input } from "@/components/form";
// Types
import type { ProfileData } from "../[slug]/page";
type FormProps = {
  profileData: ProfileData;
};

export const Form = ({ profileData }: FormProps) => {
  const [name, setName] = useState(profileData.name);
  const [dateOfBirth, setDateOfBirth] = useState(profileData.dateOfBirth);
  const [avatar, setAvatar] = useState(profileData.avatar);

  const { handleSubmit, error } = useFormHandler(async () => {
    const response = await fetch("/api/profile/update", {
      method: "POST",
      body: JSON.stringify({
        profileId: profileData.id,
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
    name === profileData.name &&
    dateOfBirth === profileData.dateOfBirth &&
    avatar === profileData.avatar;

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
      <button className="btn-tertiary w-[90px]" disabled={disabled}>
        Save
      </button>
    </form>
  );
};
