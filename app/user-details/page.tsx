import { auth, profilesGet } from "@/lib";
// Components
import { ProfilesSelect } from "@/components/ProfilesSelect";
import { Menu } from "./components";
// Types
export type UserDetailsData = Awaited<ReturnType<typeof getData>>;

async function getData() {
  const session = await auth();

  const profilesData = await profilesGet(session?.user.userEmail ?? "");
  const profiles =
    profilesData.map((p) => ({
      id: p.profileId,
      avatar: p.profileAvatarSlug,
      name: p.profileName,
    })) ?? [];

  const activeProfileId = session?.user.userActiveProfileId ?? "";

  return {
    profiles,
    activeProfileId,
  };
}

export default async function Page() {
  const { profiles, activeProfileId } = await getData();

  return (
    <section>
      <ProfilesSelect profiles={profiles} activeProfileId={activeProfileId} />
      <Menu />
    </section>
  );
}
