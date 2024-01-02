import { useQuery } from "@tanstack/react-query";

import { UserForm } from "./_components/UserForm";

import { useAuth } from "@/lib/AuthContext/useAuth";
import { supabase } from "@/lib/supabase";

const UserUpdateForm = () => {
  const { user: authUser } = useAuth();

  const userId = authUser?.id ?? "";
  const res = useQuery({
    queryFn: async () =>
      supabase.from("users").select(`*`).eq("id", userId).single(),
    queryKey: ["users", userId],
  });
  const { error, isLoading, data: userResult } = res;
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error ?? userResult?.error ?? !userResult?.data) {
    return (
      <div className="mx-8 flex flex-col">
        <h1 className=" self-center text-3xl">error</h1>
      </div>
    );
  }
  const user = userResult?.data;

  return <UserForm user={user} />;
};
export default UserUpdateForm;
