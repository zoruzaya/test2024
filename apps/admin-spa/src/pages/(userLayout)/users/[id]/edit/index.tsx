import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { UserUpdateForm } from "./_components/UserUpdateForm";

import { supabase } from "@/lib/supabase";

const AppSettingsEdit = () => {
  const { id: userId } = useParams();

  const {
    data: queryResult,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!userId,
    queryFn: async () =>
      supabase
        .from("users")
        .select("*")
        .eq("id", userId ?? "")
        .single(),
    queryKey: ["users", userId],
  });

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError || !queryResult?.data) {
    return <div>error</div>;
  }
  return <UserUpdateForm user={queryResult.data} />;
};

export default AppSettingsEdit;
