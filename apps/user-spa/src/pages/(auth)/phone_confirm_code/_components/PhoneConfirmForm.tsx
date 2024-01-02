import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  ToastAction,
  useToast,
} from "@spec-team/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth } from "@/lib/AuthContext/useAuth";

const FormSchema = z.object({
  phone: z.string().min(8, { message: "電話番号を入力してください" }),
  token: z.string().min(6, { message: "入力してください" }),
});
function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
export const PhoneConfirmForm = () => {
  const query = useQuery();
  const phone = query.get("phone") ?? "";
  const navigate = useNavigate();
  const { verifySms } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      phone,
      token: "",
    },
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      if (!verifySms) return;
      // const response = await supabase.auth.signInWithPassword(formData);
      const response = await verifySms(formData);
      console.log("🚀 ~ response:", response);
      if (response.error) {
        toast({
          title: "サーバーへ接続できませんでした",
          variant: "destructive",
        });
      }

      navigate("/");
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
        <div className=" flex flex-col space-y-8 ">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem className=" flex flex-col">
                <FormLabel className=" self-start">コード</FormLabel>
                <FormControl>
                  <Input
                    placeholder="xxxxxx"
                    type="string"
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

          <Button type="submit" disabled={isLoading} className=" h-8 rounded">
            {isLoading ? "Loading..." : "送信"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
