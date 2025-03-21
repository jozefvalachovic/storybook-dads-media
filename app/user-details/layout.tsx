import { ClientSessionProvider } from "@/components/ClientSessionProvider";
// Types
import type { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <ClientSessionProvider>{children}</ClientSessionProvider>;
}
