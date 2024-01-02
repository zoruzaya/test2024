/* eslint-disable max-lines-per-function */
import {
  Button,
  Dropzone,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SupabaseImage,
} from "@spec-team/ui";

import { useUserFormHooks } from "./useUserFormHooks";

import type { usersRowSchema } from "@spec-team/db/types/schema";
import type * as z from "zod";

import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { supabase } from "@/lib/supabase";

export const UserForm = ({
  user,
}: {
  user: z.infer<typeof usersRowSchema>;
}) => {
  const { form, onSubmit, onDrop, userUpdateMutation } = useUserFormHooks({
    user,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">
        <div className="mx-4 flex flex-col space-y-8">
          <div className="flex flex-col items-start">
            <div className="relative">
              <SupabaseImage
                // className="h-[24px] w-[24px]"
                className="h-[100px] w-[100px] rounded-full"
                supabase={supabase}
                bucketName="manuals"
                path={user.avatar_url}
              />
              <div className="border-primary bg-primary/80 absolute right-0 top-0 flex h-8 w-8 justify-center rounded-full p-0">
                <DeleteConfirmation
                  onOk={async () =>
                    userUpdateMutation.mutateAsync({
                      avatar_url: null,
                    })
                  }
                  buttonClassName="text-white"
                />
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>氏名</FormLabel>
                <FormControl>
                  <Input
                    placeholder="氏名"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>職務</FormLabel>
                <FormControl>
                  <Input
                    placeholder="職務"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>生年月日</FormLabel>
                <FormControl>
                  <Input
                    placeholder="生年月日"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>場所</FormLabel>
                <FormControl>
                  <Input
                    placeholder="場所"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SNS リンク</FormLabel>
                <FormControl>
                  <Input
                    placeholder="SNS リンク"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>その他URL（ポートフォリオなど）</FormLabel>
                <FormControl>
                  <Input
                    placeholder="その他URL（ポートフォリオなど）"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mx-4 self-center rounded bg-red-500 px-24"
          >
            プロフィールを作成する
          </Button>
        </div>
      </form>
    </Form>
  );
};
