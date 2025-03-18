"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = ["Account", "Profiles", "Prisoner"];

export const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="min-w-[var(--app-width-min)] overflow-hidden flex bg-mid-grey rounded-bl-xl rounded-br-xl">
      {tabs.map((t) => {
        const segment = t.toLowerCase();
        // Handle Profiles tab to match /profile/:id and /profiles routes
        const isSelected = pathname.includes(segment === "profiles" ? "profile" : segment);

        return (
          <Link
            key={t}
            href={`/user-details/settings/${segment}`}
            className={`select-none w-full flex items-center justify-center pt-4 ${
              isSelected ? "" : "cursor-pointer"
            }`}
          >
            <p
              className={`font-semibold text-[15px] border-b-2 ${
                isSelected
                  ? "!text-tertiary border-tertiary"
                  : "border-transparent hover:border-dark-grey"
              } transition-colors pb-4`}
            >
              {t}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
