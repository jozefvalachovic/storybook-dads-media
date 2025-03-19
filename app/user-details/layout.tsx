import { SessionProvider } from "@/components/SessionProvider";
// Types
import type { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
