import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordInput,
  ToastAction,
  useToast,
} from "@spec-team/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { supabase } from "@/lib/supabase";

const FormSchema = z.object({
  password: z.string().min(8, { message: "8文字以上で入力してください" }),
  passwordConfirm: z
    .string()
    .min(8, { message: "8文字以上で入力してください" }),
});

export const UserAuthForm = () => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    if (formData.password !== formData.passwordConfirm) {
      toast({
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        description: "パスワードが一致しません",
        title: "エラー",
        variant: "destructive",
      });
      return;
    }
    try {
      const updateUserResult = await supabase.auth.updateUser({
        password: formData.password,
      });
      const { error } = updateUserResult;

      if (error) {
        toast({
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          description: "リクエストが失敗しました",
          title: "エラー",
          variant: "destructive",
        });
      }

      // navigate("/");
    } catch (error) {
      toast({
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        description: "リクエストが失敗しました",
        title: "エラー",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 text-left">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <PasswordInput
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード確認</FormLabel>
                <FormControl>
                  <PasswordInput
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "更新"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
