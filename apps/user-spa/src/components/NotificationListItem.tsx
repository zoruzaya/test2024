import dayjs from "dayjs";

import type { cNotificationsRowSchema } from "@spec-team/db/types/schema";
import type { z } from "zod";

export const NotificationListItem = ({
  notification,
}: {
  notification: z.infer<typeof cNotificationsRowSchema>;
}) => (
  <a
    key={notification.id}
    className="mx-8 flex min-h-[40px] flex-row justify-between text-lg"
    href={`/notifications/${notification.id}`}
  >
    <div className="font-bold">{notification.title}</div>
    <div className="text-xs text-gray-600">
      {dayjs(notification.created_at).format("YYYY/MM/DD")}
    </div>
  </a>
);
