import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RichTextEditor,
} from "@spec-team/ui";
import { useForm } from "react-hook-form";

import {
  companyAdminNotificationInsertSchema
} from "./types";
import { useOnSubmit } from "./useOnSubmit";

import type {
  NotificationEditFormType} from "./types";
import type { cNotificationsRowSchema } from "@spec-team/db/types/schema";
import type z from "zod";

export const NotificationEditForm = ({
  notification,
}: {
  notification: z.infer<typeof cNotificationsRowSchema>;
}) => {
  const form = useForm<NotificationEditFormType>({
    defaultValues: notification,

    resolver: zodResolver(companyAdminNotificationInsertSchema),
  });
  const onSubmit = useOnSubmit({
    notificationId: notification.id,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input
                  placeholder="タイトル"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>タイトル</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>詳細</FormLabel>
              <FormControl>
                <RichTextEditor
                  {...field}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  defaultValue="<p>asdfawerq</p><p>qwerq</p><p><br></p>"
                />
              </FormControl>
              <FormDescription>詳細</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">保存</Button>
      </form>
    </Form>
  );
};
