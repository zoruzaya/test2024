import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@spec-team/ui";

import { NotificationList } from "./_components/NotificationList";

export const dynamic = "force-dynamic";

const Notifications = () => (
  <div className="flex flex-col gap-8">
    <div className="flex justify-end ">
      <a href="/notifications/new">
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          追加
        </Button>
      </a>
    </div>
    <NotificationList />
  </div>
);
export default Notifications;
