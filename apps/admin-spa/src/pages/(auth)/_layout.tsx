import { Outlet } from "react-router-dom";

import { Toaster } from "@spec-team/ui";
import { clsx } from "clsx";

const RootLayout = () => (
  <div className={clsx(["h-screen", "flex", "justify-center"])}>
    <div className={clsx(["h-screen", "max-w-md", "flex", "flex-1"])}>
      <Outlet />
    </div>
    <Toaster />
  </div>
);
export default RootLayout;
