import { zodResolver } from "@hookform/resolvers/zod";
import { companiesUpdateSchema } from "@spec-team/db/types/schema";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import type * as z from "zod";

import { supabase } from "@/lib/supabase";

const SettingsPage = () => {
  const queryClient = useQueryClient();
  const companyId = 1; // TODO: get from auth context
  const res = useQuery({
    queryFn: async () =>
      supabase.from("companies").select(`*`).eq("id", companyId).single(),
    queryKey: ["companies", 1],
  });

  const { error, isLoading, data: settingResult } = res;
  const form = useForm({
    defaultValues: settingResult?.data ?? {},
    resolver: zodResolver(companiesUpdateSchema),
  });
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof companiesUpdateSchema>) =>
      supabase.from("companies").update(values).eq("id", companyId),
    onSuccess: () => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
  const onSubmit = async (values: z.infer<typeof companiesUpdateSchema>) => {
    const manualUpdateResult = await mutation.mutateAsync(values);
    if (manualUpdateResult.error) {
      toast({
        description: "リクエストが失敗しました",
        title: "エラー",
        variant: "destructive",
      });
    }
  };
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error ?? settingResult?.error ?? !settingResult?.data) {
    return (
      <div className="mx-8 flex flex-col">
        <h1 className=" self-center text-3xl">error</h1>
      </div>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>企業名</FormLabel>
              <FormControl>
                <Input
                  placeholder="企業名"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>企業名</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="help_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>へリプリンク</FormLabel>
              <FormControl>
                <Input
                  placeholder="/help"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                /help または https://example.com の形式で入力してください
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

export default SettingsPage;
