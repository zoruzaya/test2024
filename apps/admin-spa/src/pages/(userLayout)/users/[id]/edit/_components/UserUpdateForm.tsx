import { zodResolver } from "@hookform/resolvers/zod";
import { usersUpdateSchema } from "@spec-team/db/types/schema";
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
  SupabaseImage,
  toast,
} from "@spec-team/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import type { usersRowSchema } from "@spec-team/db/types/schema";
import type * as z from "zod";

import { supabase } from "@/lib/supabase";

export const UserUpdateForm = ({
  user,
}: {
  user: z.infer<typeof usersRowSchema>;
}) => {
  // const [_currentUser, setCurrentUser] = useState<User | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     const currentUserResult = await supabase.auth.getUser();
  //     if (currentUserResult.error) {
  //       return;
  //     }
  //     setCurrentUser(currentUserResult.data.user);
  //   })().catch(() => ({ error: true }));
  // }, []);
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: async (values: z.infer<typeof usersUpdateSchema>) =>
      supabase.from("users").update(values).eq("id", user.id).select("*"),
    onSuccess: () => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit = async (values: z.infer<typeof usersUpdateSchema>) => {
    const result = await updateUserMutation.mutateAsync(values);
    const { error } = result;
    if (error) {
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
  };
  const form = useForm<z.infer<typeof usersUpdateSchema>>({
    defaultValues: {
      ...user,
    },
    resolver: zodResolver(usersUpdateSchema),
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
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input disabled placeholder="email" value={user.email ?? ""} />
          </FormControl>
          <FormDescription>メールアドレスは変更できません</FormDescription>
          <FormMessage />
        </FormItem>
        <div className="flex flex-col items-start">
          <div>プロフィール画像</div>
          <SupabaseImage
            className="h-[100px] w-[100px] rounded-full"
            supabase={supabase}
            bucketName="manuals"
            path={user.avatar_url ?? ""}
          />
        </div>
        <Button type="submit">保存</Button>
      </form>
    </Form>
  );
};
