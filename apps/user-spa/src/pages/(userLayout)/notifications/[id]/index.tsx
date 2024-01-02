import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { Title } from "@/components/Title";
import { supabase } from "@/lib/supabase";

const AppSettingsEdit = () => {
  const { id: notificationId } = useParams();
  const res = useQuery({
    queryFn: async () =>
      supabase
        .from("c_notifications")
        .select("*")
        .eq("id", parseInt(notificationId ?? "0", 10))
        .single(),
    queryKey: ["notification", notificationId],
  });
  const { error, data: notificationResult } = res;
  if (error ?? notificationResult?.error) {
    return (
      <div className="mx-8 flex flex-col">
        <h1 className=" self-center text-3xl">error</h1>
      </div>
    );
  }
  const notification = notificationResult?.data;
  return (
    <div className="mx-8 my-12 flex flex-col gap-6">
      <Title className=" self-start" text={notification?.title ?? "お知らせ"} />
      <div className="text-sm">
        {dayjs(notification?.created_at).format("YYYY/MM/DD")}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: notification?.detail ?? "" }}
        className=" leading-loose"
      />
    </div>
  );
};
export default AppSettingsEdit;
