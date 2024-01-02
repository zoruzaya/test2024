import "@spec-team/ui/styles/user-colors.css";

import { Outlet } from "react-router-dom";

import { Toaster } from "@spec-team/ui";
import { useQuery } from "@tanstack/react-query";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/sidebar";
import { supabase } from "@/lib/supabase";

const RootLayout = () => {
  const companyId = 1; // TODO: get from auth context
  const res = useQuery({
    queryFn: async () =>
      supabase.from("companies").select(`*`).eq("id", companyId).single(),
    queryKey: ["companies", 1],
  });
  const { error, isLoading, data: settingResult } = res;
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error ?? settingResult?.error ?? !settingResult?.data) {
    return (
      <div className="mx-8 flex flex-col">
        <h1 className=" self-center text-3xl">error</h1>
      </div>
    );
  }
  return (
    <div className="block h-screen w-[1024px] flex-col overflow-scroll bg-white">
      <Navbar companyName={settingResult.data.name} />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid grid-cols-5">
            <Sidebar className="block" helpUrl={settingResult.data.help_url} />
            <div className="col-span-4 border-l">
              <div className="h-full px-8 py-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
export default RootLayout;
