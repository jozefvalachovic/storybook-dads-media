"use client";

import { useSearchParams } from "next/navigation";
// Types
type ProgressProps = {
  steps: number;
  current?: number;
};

export const Progress = ({ steps, current }: ProgressProps) => {
  let currentStep = current;

  if (!current) {
    const searchParams = useSearchParams();
    const step = searchParams.get("step");
    if (!step) {
      return null;
    }

    currentStep = parseInt(step) > steps ? steps : parseInt(step);
  }

  if (!currentStep) {
    return null;
  }

  const top = "calc(var(--app-header-height) - 2px)";

  return (
    <>
      <div
        // Remaining steps
        className="z-10 absolute right-0 h-[3px] transition-all duration-200 bg-mid-grey !p-0"
        style={{ width: `${Math.round(((steps - currentStep) / steps) * 100)}%`, top }}
      />
      <div
        // Completed steps
        className="z-10 absolute left-0 h-[3px] transition-all duration-200 bg-tertiary !p-0"
        style={{ width: `${Math.round((currentStep / steps) * 100)}%`, top }}
      />
    </>
  );
};
