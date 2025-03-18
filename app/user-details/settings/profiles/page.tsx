import { auth, profilesGet } from "@/lib";
// Components
import { ProfilesMenu } from "./components";
// Types
export type SettingsProfilesData = Awaited<ReturnType<typeof getData>>;

async function getData() {
  const session = await auth();

  const profilesData = await profilesGet(session?.user.userEmail ?? "");
  const profiles =
    profilesData.map((p) => ({
      id: p.profileId,
      name: p.profileName,
      avatar: p.profileAvatarSlug,
    })) ?? [];

  return {
    profiles,
  };
}

export default async function Page() {
  const { profiles } = await getData();

  return <ProfilesMenu profiles={profiles} />;
}
