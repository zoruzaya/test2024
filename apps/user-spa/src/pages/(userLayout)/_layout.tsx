import "@spec-team/ui/styles/user-colors.css";

import { Outlet } from "react-router-dom";

import { clsx } from "clsx";

import { Navbar } from "@/components/Navbar";

const RootLayout = () => (
  <div className={clsx(["h-screen", "flex", "bg-slate-200", "justify-center"])}>
    <div
      className={clsx([
        "scrollbar",
        "h-screen",
        "max-w-lg",
        "overflow-hidden",
        "bg-white",
        "flex",
        "flex-1",
        "flex-col",
        "overflow-y-scroll",
      ])}
    >
      <Navbar>
        <Outlet />
      </Navbar>
    </div>
  </div>
);
export default RootLayout;
