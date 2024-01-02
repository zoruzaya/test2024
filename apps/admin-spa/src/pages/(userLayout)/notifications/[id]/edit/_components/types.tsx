import { cNotificationsUpdateSchema } from "@spec-team/db/types/schema";
import z from "zod";

import type { FileWithPath } from "@spec-team/ui/components/Dropzone";

export const companyAdminNotificationInsertSchema =
  cNotificationsUpdateSchema.omit({
    created_at: true,
    id: true,
    role: true,
  });

const zFileSchema = z.custom<FileWithPath>();
const schemaWithFile = z
  .object({
    file: zFileSchema,
  })
  .merge(companyAdminNotificationInsertSchema);
export type NotificationEditFormType = z.infer<typeof schemaWithFile>;
