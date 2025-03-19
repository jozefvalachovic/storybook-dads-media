import { redirect } from "next/navigation";
// Components
import { Progress } from "@/components/layout/Progress";
import { Email, Inputs } from "./components";
// Types
import type { SearchParams } from "@/types";

const stepGroups = {
  1: Email,
  2: Inputs,
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { step, email } = await searchParams;
  if (!step || Array.isArray(step)) {
    redirect("/");
  }

  const currentStep = parseInt(step);
  const Component = stepGroups[currentStep as keyof typeof stepGroups];
  if (!Component) {
    redirect("/");
  }

  return (
    <>
      <Progress steps={2} />
      <section>
        <Component email={email as string} />
      </section>
    </>
  );
}
