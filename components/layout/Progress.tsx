"use client";

import { useSearchParams } from "next/navigation";
// Types
type ProgressProps = {
  steps: number;
};

export const Progress = ({ steps }: ProgressProps) => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  if (!step) {
    return null;
  }

  const currentStep = parseInt(step) > steps ? steps : parseInt(step);

  const top = "calc(var(--app-header-height) - 2px)";

  return (
    <>
      <div
        // Remaining steps
        className="z-10 absolute right-0 h-[3px] bg-mid-grey !p-0"
        style={{ width: `${Math.round(((steps - currentStep) / steps) * 100)}%`, top }}
      />
      <div
        // Completed steps
        className="z-10 absolute left-0 h-[3px] bg-tertiary !p-0"
        style={{ width: `${Math.round((currentStep / steps) * 100)}%`, top }}
      />
    </>
  );
};
