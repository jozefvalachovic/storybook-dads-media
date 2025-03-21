import { auth, profilesGet } from "@/lib";
// Components
import { ProfilesQuickMenu } from "./components/ProfilesQuickMenu";
import { Menu } from "./components";
// Types
export type UserDetailsData = Awaited<ReturnType<typeof getData>>;

async function getData() {
  const session = await auth();

  const profilesData = await profilesGet(session?.user.userEmail ?? "");
  const profiles =
    profilesData.map((p) => ({
      id: p.profileId,
      name: p.profileName,
      avatar: p.profileAvatarSlug,
      dateOfBirth: p.profileDateOfBirth.toISOString(),
    })) ?? [];

  const activeProfileId = session?.user.activeProfile.profileId ?? "";

  return {
    profiles,
    activeProfileId,
  };
}

export default async function Page() {
  const { profiles, activeProfileId } = await getData();

  return (
    <section>
      <ProfilesQuickMenu profiles={profiles} activeProfileId={activeProfileId} />
      <Menu />
    </section>
  );
}
