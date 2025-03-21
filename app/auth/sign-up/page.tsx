import { redirect } from "next/navigation";
import { handleSignUp } from "../actions";
import { prisonsGet } from "@/lib/db/handlers";
// Components
import { Progress } from "@/components/layout/Progress";
import { Credentials, Prisoner, Profiles } from "./components";
// Types
import type { SearchParams } from "@/types";

const stepGroups = {
  1: Credentials,
  2: Profiles,
  3: Prisoner,
};

async function getData() {
  const prisonsData = await prisonsGet();
  const prisonsList = prisonsData.map((prison) => ({ value: prison.prisonName }));

  return { prisonsList };
}

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

  const { prisonsList } = await getData();

  return (
    <>
      <Progress steps={3} />
      <section>
        <form action={handleSignUp}>
          <input type="hidden" name="current-step" value={currentStep} />
          <Component prisons={prisonsList} />
        </form>
      </section>
    </>
  );
}
