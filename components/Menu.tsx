"use client";

import { type ComponentProps, useEffect } from "react";
import Link from "next/link";
// Components
import { Icon } from "./icons/Icon";
// Types
type MenuProps = {
  anchor: { top: number; right: number } | undefined;
  setAnchor: (anchor: MenuProps["anchor"]) => void;
  items: {
    title: string;
    icon?: ComponentProps<typeof Icon>["icon"];
    url?: string;
    active?: boolean;
    action?: () => void;
  }[];
  isUserMenu?: boolean;
};
// State
import { createState } from "@/app/state";

const selected = createState<string | undefined>(undefined);

export const Menu = ({ anchor, setAnchor, items, isUserMenu }: MenuProps) => {
  useEffect(() => {
    if (!anchor) {
      selected.set(undefined);
    }
    const hideMenu = () => setAnchor(undefined);
    window.addEventListener("click", hideMenu);
    return () => {
      window.removeEventListener("click", hideMenu);
    };
  }, [anchor]);

  return anchor ? (
    <ul
      className="menu"
      style={{
        top: `${anchor.top}px`,
        right: `${anchor.right}px`,
      }}
    >
      {items.map(({ title, icon, url, active, action }) => {
        return (
          <li
            key={title}
            className={`${icon ? `icon-${icon} ` : ""}${active ? "active" : ""}${
              isUserMenu ? " !flex" : ""
            }`}
            onClick={action}
          >
            {icon && <Icon icon={icon} />}
            {url ? active ? <p>{title}</p> : <Link href={url}>{title}</Link> : <p>{title}</p>}
          </li>
        );
      })}
    </ul>
  ) : null;
};
