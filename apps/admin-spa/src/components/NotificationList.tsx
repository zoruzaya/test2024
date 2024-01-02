import { useEffect, useState } from "react";

import { Separator, toast } from "@spec-team/ui";

import { NotificationListItem } from "./NotificationListItem";

import type { cNotificationsRowSchema } from "@spec-team/db/types/schema";
import type { z } from "zod";

import { getPagination } from "@/lib/getPagination";
import { sendErrorMessage } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

const loadNotifications = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const { from, to } = getPagination({
    page,
    size,
  });

  const notificationListResult = await supabase
    .from("c_notifications")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);
  return notificationListResult;
};

export const NotificationList = ({
  page,
  size,
  usePagination,
}: {
  page: number;
  size: number;
  usePagination?: true;
}) => {
  const [notifications, setNotifications] = useState<
    z.infer<typeof cNotificationsRowSchema>[]
  >([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    void loadNotifications({
      page,
      size,
    }).then((result) => {
      try {
        if (result.error) {
          sendErrorMessage(result.error);
          toast({
            description: "お知らせの取得に失敗しました",
            title: "エラー",
          });
        }
        if (result.data) {
          setNotifications(result.data);
        }
        const count = result.count ?? 0;
        setHasMore(page * size < count);
      } catch (error) {
        sendErrorMessage(error);
        toast({
          description: "お知らせの取得に失敗しました",
          title: "エラー",
        });
      }
    });
  }, [page, size]);

  return (
    <div className="my-4 flex flex-col justify-center gap-4 align-middle">
      <h1 className=" text-primary text-center text-2xl font-bold">お知らせ</h1>
      <div className="flex flex-col justify-center align-middle">
        {notifications.map((notification) => (
          <NotificationListItem
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
      {usePagination && hasMore ? (
        <a
          href="/notifications"
          className="text-center text-gray-400 underline"
        >
          More
        </a>
      ) : null}
      <div className="mx-8 flex  flex-1 justify-between ">
        {!usePagination && page > 1 ? (
          <a
            href={`/notifications?page=${page - 1}`}
            className="text-center text-gray-400 underline"
          >
            Prev
          </a>
        ) : null}
        {!usePagination && hasMore ? (
          <a
            href={`/notifications?page=${page + 1}`}
            className="text-center text-gray-400 underline"
          >
            Next
          </a>
        ) : null}
      </div>
      <Separator />
    </div>
  );
};
