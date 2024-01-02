import { SidebarItem } from "./SidebarItem";
import { useSidebarData } from "./sidebar.data";

import type { SidebarProps } from "./sidebar.types";

import { cn } from "@/lib/utils";

export const Sidebar = (props: SidebarProps) => {
  const { className, helpUrl } = props;
  const sidebarData = useSidebarData({
    helpUrl,
  });
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {sidebarData.map((data) => (
          <SidebarItem
            key={data.id}
            id={data.id}
            subMenu={data.subMenu}
            title={data.title}
          />
        ))}
      </div>
    </div>
  );
};
