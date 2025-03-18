import { auth, profilesGet } from "@/lib";
// Components
import { SignIn } from "../components";
import { ProfilesSelect } from "@/components/ProfilesSelect";
// Types
export type SignInData = Awaited<ReturnType<typeof getData>>;

async function getData() {
  const session = await auth();

  const profilesData = await profilesGet(session?.user.userEmail ?? "");
  const profiles =
    profilesData.map((p) => ({
      id: p.profileId,
      avatar: p.profileAvatarSlug,
      name: p.profileName,
    })) ?? [];

  return {
    profiles,
    activeProfileId: "",
    redirectOnUpdate: "/",
    className: "grid grid-cols-2 gap-5",
  };
}

export default async function Page() {
  const data = await getData();

  return (
    <section>
      {data.profiles.length > 1 ? (
        <div className="m-auto">
          <h2 className="mb-6">Who's Listening?</h2>
          <ProfilesSelect {...data} />
        </div>
      ) : (
        <SignIn />
      )}
    </section>
  );
}
