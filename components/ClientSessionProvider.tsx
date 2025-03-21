"use client";

import { SessionProvider } from "next-auth/react";
// Components
import { Header, Footer } from "./layout";

type Props = {
  children?: React.ReactNode;
};

export const ClientSessionProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  );
};
