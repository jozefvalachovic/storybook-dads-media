import { auth, profilesGet } from "@/lib";
// Components
import { Delete, Form } from "../components";
// Types
import type { RouteParams } from "@/types";
export type ProfileData = Awaited<ReturnType<typeof getData>>;

async function getData(id: string) {
  const session = await auth();

  const profile = {
    id,
    name: "",
    dateOfBirth: "",
    avatar: "",
    active: false,
  };

  const profiles = await profilesGet(session?.user.userEmail ?? "", id);
  if (profiles.length > 0) {
    profile.name = profiles[0].profileName;
    profile.dateOfBirth = profiles[0].profileDateOfBirth.toISOString().split("T")[0];
    profile.avatar = profiles[0].profileAvatarSlug;
    // Check if the profile is active
    profile.active = session?.user.activeProfile.profileId === id;
  }
  return {
    profile,
  };
}

export default async function Page({ params }: RouteParams) {
  const { slug } = await params;

  const { profile } = await getData(slug as string);

  return (
    <>
      <Form profile={profile} />
      {profile.active || profile.name === "" ? null : <Delete />}
    </>
  );
}
