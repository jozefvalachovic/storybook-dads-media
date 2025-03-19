import { redirect } from "next/navigation";
import { auth, profilesGet } from "@/lib";
// Components
import { Profile, SignIn } from "./components";
import { Progress } from "@/components/layout/Progress";
// Types
import type { SearchParams } from "@/types";
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
    redirectOnUpdate: "/home",
    className: "grid grid-cols-2 gap-5",
  };
}

const stepGroups = {
  1: SignIn,
  2: Profile,
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { step } = await searchParams;
  if (!step || Array.isArray(step)) {
    redirect("/");
  }

  const currentStep = parseInt(step);
  const Component = stepGroups[currentStep as keyof typeof stepGroups];
  if (!Component) {
    redirect("/");
  }

  const data = await getData();
  if (step === "1" && data.profiles.length > 0) {
    redirect("/auth/sign-in?step=2");
  }

  return (
    <>
      <Progress steps={2} />
      <section>
        <Component {...data} />
      </section>
    </>
  );
}
