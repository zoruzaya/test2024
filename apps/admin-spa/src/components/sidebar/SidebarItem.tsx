import { NavLink } from "react-router-dom";

import type { SidebarDataType, SidebarSubMenuItemType } from "./sidebar.types";

import { cn } from "@/lib/utils";

export const SidebarItem = ({ subMenu, title }: SidebarDataType) => (
  <div>
    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{title}</h2>
    <div className="space-y-1">
      {subMenu.map(
        ({
          Svg,
          id,
          title: subMenuTitle,
          link,
          onClick,
        }: SidebarSubMenuItemType) => (
          <NavLink
            key={id}
            to={link}
            onClick={onClick}
            className={({ isActive, isPending }) =>
              cn([
                "text-primary",
                "flex",
                "w-full",
                "flex-row",
                "items-center",
                "justify-start",
                "px-6 py-2",
                "rounded-lg",
                "text-sm",
                "hover:bg-accent hover:text-accent-foreground",
                isPending ? "pending" : "",
                isActive ? "bg-accent text-accent-foreground " : "",
              ])
            }
          >
            <Svg />
            {subMenuTitle}
          </NavLink>
        ),
      )}
    </div>
  </div>
);
