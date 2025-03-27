import { auth, PROFILES_MAX, profilesGet } from "@/lib";
// Components
import { ProfilesMenu } from "./components";
// Types
export type SettingsProfilesData = Awaited<ReturnType<typeof getData>>;

async function getData() {
  const session = await auth();

  const profiles = await profilesGet(session?.user.userEmail ?? "");
  const data =
    profiles.map((p) => ({
      id: p.profileId,
      name: p.profileName,
      avatar: p.profileAvatarSlug,
    })) ?? [];

  return data;
}

export default async function Page() {
  const data = await getData();

  const profilesMax = PROFILES_MAX;

  return <ProfilesMenu profiles={data} profilesMax={profilesMax} />;
}
