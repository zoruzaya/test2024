import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { usersInsertSchema } from "@spec-team/db/types/schema";
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
  toast,
} from "@spec-team/ui";
import { useForm } from "react-hook-form";

import type * as z from "zod";

import { supabase } from "@/lib/supabase";

const companyAdminUserInsertSchema = usersInsertSchema.omit({
  created_at: true,
  id: true,
  role: true,
});
export const UserCreateForm = () => {
  const navigate = useNavigate();

  const onSubmit = async (
    values: z.infer<typeof companyAdminUserInsertSchema>,
  ) => {
    const result = await supabase.functions.invoke("adminAddUser", {
      body: values,
    });
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
    navigate("/users");
  };
  const form = useForm<z.infer<typeof companyAdminUserInsertSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(companyAdminUserInsertSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>表示名</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                入力したアドレスへ招待メールを送ります
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">保存</Button>
      </form>
    </Form>
  );
};

export default UserCreateForm;
