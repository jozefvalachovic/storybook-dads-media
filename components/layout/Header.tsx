"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { passwordGuardState } from "@/app/user-details/components/PasswordGuard";
// Components
import { Navigate } from "./Navigate";
import { BreadCrumb } from "./BreadCrumb";
import { Progress } from "./Progress";
import { Icon } from "../icons/Icon";
// Types
import { Session } from "next-auth";
type HeaderProps = {
  session: Session | null;
};

export const Header = ({ session }: HeaderProps) => {
  const pathname = usePathname();
  const lastPathSegment = pathname.split("/").pop();

  const { verified } = passwordGuardState.use((s) => s);
  const isAuthPage = pathname === "/auth/status" || pathname === "/auth/sign-in";
  const isLandingPage = pathname === "/auth";
  const isHomePage = pathname === "/";

  function handleDisableAdmin() {
    if (verified) {
      // Disable Admin (reset password guard state)
      passwordGuardState.set({ attempts: 0, verified: false });
    }
  }

  return isLandingPage ? null : (
    <header data-selected-settings={pathname.startsWith("/user-details/settings") && verified}>
      <Progress stepGroup={lastPathSegment as "sign-in"} />
      <div className="flex justify-between items-center">
        {isHomePage ? (
          <Link prefetch={false} href="/" className="flex items-center">
            <Icon icon="logo-dads" />
            <Icon icon="logo-mums" />
          </Link>
        ) : (
          <>
            <Navigate type={isAuthPage ? "home" : "back"} />
            <BreadCrumb pathname={pathname} />
          </>
        )}
        {session ? (
          <Link
            href="/user-details"
            data-selected={pathname.startsWith("/user-details")}
            data-selected-settings={pathname.startsWith("/user-details/settings") && verified}
            className="flex items-center py-2 pl-2 pr-3 rounded-full border border-[#727970]"
            onClick={handleDisableAdmin}
          >
            <Icon
              icon={`avatar${session.user.activeProfile.profileAvatarSlug}`}
              iconWidth={24}
              iconHeight={24}
            />
            <p className="font-medium text-sm ml-2">{session?.user.userName}</p>
          </Link>
        ) : (
          <div className="flex items-center justify-end">
            <Icon icon="logo-dads" />
            <Icon icon="logo-mums" />
          </div>
        )}
      </div>
    </header>
  );
};
