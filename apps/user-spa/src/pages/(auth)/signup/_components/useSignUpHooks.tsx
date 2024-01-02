import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction, useToast } from "@spec-team/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth } from "@/lib/AuthContext/useAuth";

export const FormSchema = z
  .object({
    email: z
      .string()
      .email({ message: "メールアドレスの形式で入力してください" }),
    password: z.string().min(8, { message: "8文字以上で入力してください" }),
    rePassword: z.string().min(8, { message: "8文字以上で入力してください" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "パスワードが一致しません",
    path: ["rePassword"],
  });

export const useSignUpHooks = () => {
  const { signup } = useAuth();
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
      const response = await signup(formData);
      if (response.error) {
        toast({
          title: "サーバーへ接続できませんでした",
          variant: "destructive",
        });
      }

      // router.replace("/");
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
  return { form, isLoading, onSubmit };
};
