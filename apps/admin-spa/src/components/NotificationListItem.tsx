import type { cNotificationsRowSchema } from "@spec-team/db/types/schema";
import type { z } from "zod";

export const NotificationListItem = ({
  notification,
}: {
  notification: z.infer<typeof cNotificationsRowSchema>;
}) => {
  const handleClick = () => {
    // router.push(`/notifications/${notification.id}`);
  };

  return (
    <div
      key={notification.id}
      className="mx-8 flex flex-row justify-between"
      onClick={handleClick}
    >
      <div className="font-bold">{notification.title}</div>
      <div>2023/11/01</div>
    </div>
  );
};
