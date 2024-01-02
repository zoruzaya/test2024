/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SupabaseImage,
  Toaster,
} from "@spec-team/ui";
import { clsx } from "clsx";
import { Menu } from "lucide-react";

import { useAuth } from "@/lib/AuthContext/useAuth";
import { supabase } from "@/lib/supabase";

export const NavBarSheet = ({ container }: any) => {
  const { signOut, user } = useAuth();

  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between border-b border-gray-700 px-8 py-4 ">
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-md p-2 outline-none focus:border focus:border-gray-400"
            // onClick={() => setState(!state)}
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <div className="text-2xl font-bold text-gray-400">
          <a href="/">Home</a>
        </div>

        <a href="/mypage">
          <h1 className="text-2xl font-bold text-white">
            <SupabaseImage
              className="h-8 w-8 rounded-full"
              supabase={supabase}
              bucketName="users"
              path={(user as any)?.profile?.avatar_url} // eslint-disable-line @typescript-eslint/no-unsafe-member-access
            />
          </h1>
        </a>
      </div>
      <SheetContent
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        container={container}
        side="left"
        className=" align-start flex max-w-lg justify-start text-white"
      >
        <SheetHeader>
          <SheetTitle>株式会社MEME</SheetTitle>
          <SheetDescription className=" align-start flex flex-1 flex-col items-start justify-between ">
            <div>
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:text-gray-200"
              >
                HOME
              </NavLink>
              <NavLink
                to="/notifications"
                onClick={() => setOpen(false)}
                className="block px-4 py-2  hover:text-gray-200"
              >
                お知らせ
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/mypage"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:text-gray-200"
              >
                マイページ
              </NavLink>
              <button
                type="button"
                onClick={signOut}
                className="block px-4 py-2 hover:text-gray-200"
              >
                Logout
              </button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export const Navbar = ({ children }: any) => {
  const [container, setContainer] = useState(null);
  return (
    <div
      ref={setContainer as any}
      // id="rootDiv"
      className={clsx([
        "max-w-lg",
        // "bg-white",
        "flex",
        "flex-col",
      ])}
    >
      <NavBarSheet container={container} />
      {children}
      <Toaster />
    </div>
  );
};
