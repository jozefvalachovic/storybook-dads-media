import Link from "next/link";
// Components
import { Icon } from "@/components/icons/Icon";
// Types
import type { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <main className="h-full flex-col !justify-start">
      <header>
        <div>
          <Link href="/" className="!w-fit cursor-pointer flex gap-4">
            <Icon icon="arrow-left" />
          </Link>
        </div>
      </header>
      {children}
    </main>
  );
}
