import { PasswordGuard } from "../components";
import { Tabs } from "./components";
// Types
import type { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

export default async function SettingsLayout({ children }: Props) {
  return (
    <section className="!pt-0">
      <PasswordGuard>
        <Tabs />
        {children}
      </PasswordGuard>
    </section>
  );
}
