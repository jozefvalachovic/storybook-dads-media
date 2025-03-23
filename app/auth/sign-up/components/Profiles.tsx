"use client";

import { useState } from "react";
// Componets
import { AvatarSelect, Input } from "@/components/form";
import { Icon } from "@/components/icons/Icon";
// Types
import type { SignUpObject } from "@/lib";

export const Profiles = () => {
  const [profiles, setProfiles] = useState<SignUpObject["profiles"]>([]);

  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleUpdateProfiles() {
    setProfiles((profiles) => [
      ...profiles,
      {
        profileName: name,
        profileDate: dateOfBirth,
        profileAvatar: avatar,
      },
    ]);
    // Reset inputs
    setName("");
    setDateOfBirth("");
    setAvatar("");
  }

  const disabled = !name || !dateOfBirth || !avatar;

  return (
    <div>
      {profiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <h2 className="col-span-full">Profiles</h2>
          {profiles.map((p, index) => (
            <div key={index} className="flex bg-light-grey p-4 rounded-xl">
              <Icon icon={`avatar${p.profileAvatar}`} iconWidth={20} iconHeight={20} />
              <p className="ml-3">{p.profileName}</p>
            </div>
          ))}
        </div>
      )}
      <h2>Add Child</h2>
      <AvatarSelect selected={avatar} setSelected={setAvatar} />
      <input type="hidden" name="profiles" value={JSON.stringify(profiles)} />
      <Input
        name="profile-name"
        label="Child's Full Name"
        value={name}
        setValue={setName}
        required={!profiles.length}
      />
      <Input
        name="profile-date"
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        setValue={setDateOfBirth}
        required={!profiles.length}
      />
      <button
        className="btn-blank !text-tertiary"
        type="button"
        disabled={disabled}
        onClick={handleUpdateProfiles}
      >
        Add Profile
      </button>
      <button className="btn-tertiary" disabled={profiles.length === 0}>
        Continue
      </button>
    </div>
  );
};
