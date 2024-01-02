import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { NotificationDetail } from "../_components/NotificationDetail";

import { supabase } from "@/lib/supabase";

const NotificationDetailPage = () => {
  const { id: notificationIdString } = useParams();

  const notificationId = Number(notificationIdString);
  const {
    data: queryResult,
    isLoading,
    isError,
  } = useQuery({
    enabled: !Number.isNaN(notificationId),
    queryFn: async () =>
      supabase
        .from("c_notifications")
        .select("*")
        .eq("id", notificationId)
        .single(),
    queryKey: ["c_notifications", notificationId],
  });

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError || !queryResult?.data) {
    return <div>error</div>;
  }

  return <NotificationDetail notification={queryResult.data} />;
};
export default NotificationDetailPage;
