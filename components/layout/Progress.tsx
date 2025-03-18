"use client";

import { useSearchParams } from "next/navigation";
// Types
type ProgressProps = {
  stepGroup: keyof typeof stepGroups;
};
// Assets
const stepGroups = {
  "forgot-password": 2,
  "sign-in": 2,
  "sign-up": 3,
};

export const Progress = ({ stepGroup }: ProgressProps) => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  if (!step) {
    return null;
  }

  const steps = stepGroups[stepGroup];
  const currentStep = parseInt(step) > steps ? steps : parseInt(step);

  return (
    <>
      <div
        // Remaining steps
        className="absolute -bottom-[2px] right-0 h-[3px] bg-mid-grey !p-0"
        style={{ width: `${Math.round(((steps - currentStep) / steps) * 100)}%` }}
      />
      <div
        // Completed steps
        className="absolute -bottom-[2px] left-0 h-[3px] bg-tertiary !p-0"
        style={{ width: `${Math.round((currentStep / steps) * 100)}%` }}
      />
    </>
  );
};
