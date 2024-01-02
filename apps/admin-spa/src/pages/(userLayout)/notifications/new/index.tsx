import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { cNotificationsInsertSchema } from "@spec-team/db/types/schema";
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
  toast,
} from "@spec-team/ui";
import { useForm } from "react-hook-form";

import type z from "zod";
// import { notificationsInsertSchema } from "@spec-team/db/types/schema";

import { supabase } from "@/lib/supabase";

type FormValues = z.infer<typeof cNotificationsInsertSchema>;
export const NotificationCreateForm = () => {
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
    const result = await supabase.from("c_notifications").insert(values);
    if (result.error) {
      toast({
        description: "リクエストが失敗しました",
        title: "エラー",
        variant: "destructive",
      });
      return;
    }
    toast({
      description: "",
      title: "成功",
      variant: "default",
    });

    navigate("/notifications");
  };
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(cNotificationsInsertSchema),
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
                  placeholder="詳細"
                  // style={{ height: 300 }}
                  {...field}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  // onChange={setEditorState}
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

export default NotificationCreateForm;
