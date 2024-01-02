import { Separator } from "@spec-team/ui";

import type { cNotificationsRowSchema } from "@spec-team/db/types/schema";
import type z from "zod";

export const NotificationDetail = ({
  notification,
}: {
  notification: z.infer<typeof cNotificationsRowSchema>;
}) => (
  <div>
    <h1 className=" text-3xl">{notification.title}</h1>
    <div>id:{notification.id}</div>

    <Separator />
    <div>内容</div>

    <div className="relative flex w-full flex-[0_0_auto] flex-col items-center gap-[17px] self-stretch px-[20px] py-[12px]">
      <p className="relative mt-[-1.00px] self-stretch text-[16px] font-normal leading-[21.0px] tracking-[0] text-[#333333] [font-family:'Abel-Regular',Helvetica]">
        <span className="text-[16px] font-normal leading-[21.0px] tracking-[0] text-[#333333] [font-family:'Abel-Regular',Helvetica]">
          Author
          <br />
        </span>
        <span className="text-[13px] leading-[17.0px]">Yamada Yamada </span>
      </p>
      <p className="relative self-stretch text-[16px] font-normal leading-[21.0px] tracking-[0] text-[#333333] [font-family:'Abel-Regular',Helvetica]">
        <span className="text-[16px] font-normal leading-[21.0px] tracking-[0] text-[#333333] [font-family:'Abel-Regular',Helvetica]">
          Date published
          <br />
        </span>
        <span className="text-[13px] leading-[17.0px]">22 Aug 2023</span>
      </p>
    </div>
    <div dangerouslySetInnerHTML={{ __html: notification.detail ?? "" }} />
  </div>
);
