"use client";

import { useRef, useState } from "react";
import { handleSignIn } from "../actions";
// Components
import { Progress } from "@/components/layout/Progress";
import { Credentials, ProfileCard } from "./components";
// Types
import type { Profile } from "@/lib";
export type ProfilesProps = {
  profiles: Profile[];
  activeProfileId: string;
};

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Profiles state
  const [profiles, setProfiles] = useState<ProfilesProps>({ profiles: [], activeProfileId: "" });

  const formRef = useRef<HTMLFormElement>(null);

  function handleSelectProfile(profileId: string) {
    const form = formRef.current;

    if (form) {
      form.setAttribute("data-submit", "true");

      const formData = new FormData(form);
      formData.append("email", email);
      formData.append("password", password);

      formData.append("active-profile-id", profileId);

      handleSignIn(formData);
    }
  }

  return (
    <>
      <Progress steps={2} current={profiles.profiles.length > 0 ? 2 : 1} />
      <section>
        <form ref={formRef}>
          <Credentials
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            profiles={profiles}
            setProfiles={setProfiles}
          />
          {profiles.profiles.length > 0 && (
            <div className="!w-fit">
              <h2 className="mb-2">Who's Listening?</h2>
              <div className="grid grid-cols-2 gap-5">
                {profiles.profiles.map(({ profileId, profileAvatarSlug, profileName }) => (
                  <ProfileCard
                    key={profileId}
                    id={profileId}
                    name={profileName}
                    avatar={profileAvatarSlug}
                    selected={profileId === profiles.activeProfileId}
                    onClick={() => handleSelectProfile(profileId)}
                  />
                ))}
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
