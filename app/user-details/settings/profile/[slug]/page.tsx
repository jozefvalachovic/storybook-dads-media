import { redirect } from "next/navigation";
import { auth, PROFILES_MAX, profilesGet } from "@/lib";
// Components
import { Delete, Form } from "../components";
// Types
import type { RouteParams } from "@/types";
export type ProfileData = Awaited<ReturnType<typeof getData>>;

async function getData(id: string) {
  const session = await auth();

  const profileData = {
    id,
    name: "",
    dateOfBirth: "",
    avatar: "",
    active: false,
  };

  const profiles = await profilesGet(session?.user.userEmail ?? "");

  if (profiles.length > PROFILES_MAX) {
    redirect("/user-details/settings/profiles");
  }

  const profile = profiles.find((p) => p.profileId === id);
  if (profile) {
    profileData.name = profiles[0].profileName;
    profileData.dateOfBirth = profiles[0].profileDateOfBirth.toISOString().split("T")[0];
    profileData.avatar = profiles[0].profileAvatarSlug;
    // Check if the profile is active
    profileData.active = session?.user.activeProfile.profileId === id;
  }
  return profileData;
}

export default async function Page({ params }: RouteParams) {
  const { slug } = await params;

  const profileData = await getData(slug as string);

  return (
    <>
      <Form profileData={profileData} />
      {profileData.active || profileData.name === "" ? null : <Delete />}
    </>
  );
}
