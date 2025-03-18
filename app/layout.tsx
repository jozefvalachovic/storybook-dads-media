import { ClientProvider } from "@/components/ClientProvider";
// Styles
import "./globals.css";
// Types
import type { ReactNode } from "react";
import type { Viewport } from "next";
type Props = {
  children: ReactNode;
};

import { Lato } from "next/font/google";
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin-ext", "latin"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata = {
  title: "Storybook Dads",
  description: "Storybook Dads",
};

export const viewport: Viewport = {
  themeColor: "#15803d",
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
