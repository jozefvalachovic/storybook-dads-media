"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
// Navigation
import { navigation } from "./assets";
// Components
import { Icon } from "../icons/Icon";

export const Footer = () => {
  const pathname = usePathname();

  return (
    <footer>
      <div className="max-w-fit flex justify-between gap-4">
        {navigation.map(({ name, ref }) => {
          const isCurrent = pathname === ref;

          return (
            <div key={name} className="flex flex-col md:flex-row items-center">
              <Link
                href={ref}
                target={ref.startsWith("http") ? "_blank" : undefined}
                className="py-2 px-6 md:pr-4 md:pl-4 rounded-full"
                data-selected={isCurrent}
              >
                <Icon icon={name} />
              </Link>
              <Link
                href={ref}
                target={ref.startsWith("http") ? "_blank" : undefined}
                className="text-sm md:mr-8"
              >
                {name}
              </Link>
            </div>
          );
        })}
      </div>
    </footer>
  );
};
