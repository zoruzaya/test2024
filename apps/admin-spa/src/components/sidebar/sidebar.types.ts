import type { MouseEventHandler } from "react";

export type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  helpUrl?: string | null;
};
export interface SidebarSubMenuItemType {
  Svg: () => JSX.Element;
  id: string;
  title: string;
  link: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface SidebarDataType {
  id: string;
  title: string;
  subMenu: SidebarSubMenuItemType[];
}
