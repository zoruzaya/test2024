import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  PasswordInput,
  ToastAction,
  useToast,
} from "@spec-team/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth } from "@/lib/AuthContext/useAuth";

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "メールアドレスの形式で入力してください" }),
  password: z.string().min(8, { message: "8文字以上で入力してください" }),
});

export const UserAuthForm = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      // const response = await supabase.auth.signInWithPassword(formData);
      const response = await login(formData);
      if (response.error) {
        toast({
          title: "サーバーへ接続できませんでした",
          variant: "destructive",
        });
      }

      // navigate("/");
    } catch (error) {
      toast({
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        description: "リクエストが失敗しました",
        title: "エラー2",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex flex-col space-y-4 ">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="メール"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder="パスワード"
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
            {isLoading ? "Loading..." : "ログイン"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
