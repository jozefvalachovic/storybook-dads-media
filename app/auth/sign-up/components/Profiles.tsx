"use client";

import { useState } from "react";
// Componets
import { AvatarSelect, Input } from "@/components/form";

export const Profiles = () => {
  const [name, setName] = useState("Profile");
  const [dateOfBirth, setDateOfBirth] = useState("2020-01-01");
  const [avatar, setAvatar] = useState("Pig");

  const disabled = !name || !dateOfBirth;

  return (
    <div>
      <h2>Child Profile</h2>
      <AvatarSelect selected={avatar} setSelected={setAvatar} />
      <input type="hidden" name="profile-avatar" value={avatar} />
      <Input name="profile-name" label="Name" value={name} setValue={setName} required />
      <Input
        name="profile-date"
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        setValue={setDateOfBirth}
        required
      />
      <button className="btn-tertiary" disabled={disabled}>
        Continue
      </button>
    </div>
  );
};
