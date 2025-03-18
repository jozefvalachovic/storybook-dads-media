import { ClientProvider } from "@/components/ClientProvider";
// Styles
import "./globals.css";
// Types
import type { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

// Fonts
import { Lato } from "next/font/google";
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin-ext", "latin"],
  display: "swap",
  variable: "--font-lato",
});

// Metadata
export const metadata = {
  title: "Storybook Dads",
  description: "Storybook Dads",
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
