"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
// Menu
import { menu } from "../assets";
// Components
import { Icon } from "@/components/icons/Icon";

export const Menu = () => {
  const [confirmLogout, setConfirmLogout] = useState(false);
  function handleSignOut() {
    if (confirmLogout) {
      signOut();
    } else {
      setConfirmLogout(true);
      setTimeout(() => setConfirmLogout(false), 3_000);
    }
  }

  return (
    <div className="min-w-[var(--app-width-min)] flex flex-col gap-2 mt-4">
      {menu.map(({ name, icon, ref }) => {
        return (
          <Link
            key={icon}
            href={ref.startsWith("http") ? ref : `/user-details/${ref}`}
            target={ref.startsWith("http") ? "_blank" : undefined}
            className="btn flex bg-light-grey p-4 rounded-xl"
          >
            <Icon icon={icon} />
            <p className="ml-3">{name}</p>
          </Link>
        );
      })}
      <div
        onClick={handleSignOut}
        className={`btn-blank cursor-pointer !justify-start !p-4 !rounded-xl ${
          confirmLogout ? "!shadow-none !bg-[#6750a41f] !border-black" : "!border-dark-grey"
        }`}
      >
        <Icon icon="log-out" />
        <p className="ml-3">{confirmLogout ? "Leaving so soon?" : "Sign Out"}</p>
        {confirmLogout && <p className="font-semibold ml-1">Confirm</p>}
      </div>
    </div>
  );
};
