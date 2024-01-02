import { Separator, toast } from "@spec-team/ui";
import { useQuery } from "@tanstack/react-query";

import { NotificationListItem } from "@/components/NotificationListItem";
import { Title } from "@/components/Title";
import { supabase } from "@/lib/supabase";

const loadNotifications = async () => {
  const notificationListResult = await supabase
    .from("c_notifications")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(0, 2);
  return notificationListResult;
};

export const NotificationList = () => {
  const {
    isLoading,
    isError,
    data: notificationsResult,
  } = useQuery({
    queryFn: async () => {
      const result = await loadNotifications();
      if (result.error) {
        throw result.error; // eslint-disable-line @typescript-eslint/no-throw-literal
      }
      return result;
    },
    queryKey: ["top_notifications"],
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    toast({
      description: "お知らせの取得に失敗しました",
      title: "エラー",
    });
    return <div>error</div>;
  }

  return (
    <div className="my-4 flex flex-col justify-center gap-4 align-middle">
      <Title text="お知らせ" />
      <div className="flex flex-col justify-center align-middle">
        {notificationsResult?.data.map((notification) => (
          <NotificationListItem notification={notification} />
        ))}
      </div>
      <a href="/notifications" className="text-center text-gray-400 underline">
        More
      </a>

      <Separator className=" border-1" />
    </div>
  );
};
