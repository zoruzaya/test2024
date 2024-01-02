import { Separator } from "@spec-team/ui";

import { NotificationListItem } from "@/components/NotificationListItem";
import { Title } from "@/components/Title";
import { supabase } from "@/lib/supabase";
import { useAllSearchParams } from "@/lib/useAllSearchParams";
import { usePaginatedQuery } from "@/lib/usePaginatedQuery";

const NotificationList = () => {
  const { changeSearchParam } = useAllSearchParams();
  const {
    queryResult: { data: notificationResult, isLoading, isError },
    pagination: { page, hasPrevious, hasNext },
  } = usePaginatedQuery({
    queryFn: async ({ from, to }) => {
      const notificationListResult = await supabase
        .from("c_notifications")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);
      return notificationListResult;
    },
    queryKey: ["notifications"],
  });

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>error</div>;
  }

  return (
    <div className="my-4 flex flex-col justify-center gap-4 align-middle">
      <Title text="お知らせ" />
      <div className="flex flex-col justify-center align-middle">
        {notificationResult?.data?.map((notification) => (
          <NotificationListItem
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>

      <div className="mx-8 flex  flex-1 justify-between ">
        {hasPrevious ? (
          <button
            type="button"
            onClick={() => {
              changeSearchParam({ page: `${page - 1}` });
            }}
            className="text-center text-gray-400 underline"
          >
            Prev
          </button>
        ) : null}
        {hasNext ? (
          <button
            type="button"
            className="text-center text-gray-400 underline"
            onClick={() => {
              changeSearchParam({ page: `${page + 1}` });
            }}
          >
            Next
          </button>
        ) : null}
      </div>
      <Separator />
    </div>
  );
};
export default NotificationList;
