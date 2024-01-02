import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  ToastAction,
  useToast,
} from "@spec-team/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { supabase } from "@/lib/supabase";

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "メールアドレスの形式で入力してください" }),
});
export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const origin = window?.location.origin ? window.location.origin : "";
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const redirectTo = `${origin}/update-password`;
      const passwordResetEmailResponse =
        await supabase.auth.resetPasswordForEmail(data.email, {
          redirectTo,
        });
      if (passwordResetEmailResponse.error) {
        if (passwordResetEmailResponse.error.status === 429) {
          toast({
            description: "Too many requests. Try again later.",
            title: "Error",
            variant: "destructive",
          });
          return;
        }
        toast({
          description: passwordResetEmailResponse.error.message,
          title: "エラー",
          variant: "destructive",
        });
      }
      navigate("/forgot-password/email-sent");
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
        <div className="flex flex-col space-y-4">
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "送信"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
