"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { passwordGuardState } from "@/app/user-details/components/PasswordGuard";
// Components
import { Navigate } from "./Navigate";
import { BreadCrumb } from "./BreadCrumb";
import { Icon } from "../icons/Icon";

export const Header = () => {
  const pathname = usePathname();

  const { verified } = passwordGuardState.use((s) => s);
  const isHomePage = pathname === "/home";

  function handleDisableAdmin() {
    if (verified) {
      // Disable Admin (reset password guard state)
      passwordGuardState.set({ attempts: 0, verified: false });
    }
  }

  const { data: sessionData } = useSession();
  if (!sessionData) {
    return <header></header>;
  }

  return (
    <header data-selected-settings={pathname.startsWith("/user-details/settings") && verified}>
      <div className="flex justify-between items-center">
        {isHomePage ? (
          <Link prefetch={false} href="/home" className="flex items-center">
            <Icon icon="logo-dads" />
            <Icon icon="logo-mums" />
          </Link>
        ) : (
          <>
            <Navigate type="back" />
            <BreadCrumb pathname={pathname} />
          </>
        )}
        <Link
          href="/user-details"
          data-selected={pathname.startsWith("/user-details")}
          data-selected-settings={pathname.startsWith("/user-details/settings") && verified}
          className="flex items-center py-2 pl-2 pr-3 rounded-full border border-[#727970]"
          onClick={handleDisableAdmin}
        >
          <Icon
            icon={`avatar${sessionData.user.activeProfile.profileAvatarSlug}`}
            iconWidth={24}
            iconHeight={24}
          />
          <p className="font-medium text-sm ml-2">{sessionData.user.userName}</p>
        </Link>
      </div>
    </header>
  );
};
