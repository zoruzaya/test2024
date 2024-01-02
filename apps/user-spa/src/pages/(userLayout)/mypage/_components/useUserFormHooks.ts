import { zodResolver } from "@hookform/resolvers/zod";
import { usersUpdateSchema } from "@spec-team/db/types/schema";
import { toast } from "@spec-team/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import type { usersRowSchema } from "@spec-team/db/types/schema";
import type { FileWithPath } from "@spec-team/ui/components/Dropzone";
import type * as z from "zod";

import { sendErrorMessage } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

export const useUserFormHooks = ({
  user,
}: {
  user: z.infer<typeof usersRowSchema>;
}) => {
  const queryClient = useQueryClient();
  const userUpdateMutation = useMutation({
    mutationFn: async (values: z.infer<typeof usersUpdateSchema>) =>
      supabase.from("users").update(values).eq("id", user.id),
    onSuccess: () => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const onSubmit = async (values: z.infer<typeof usersUpdateSchema>) => {
    const { error } = await userUpdateMutation.mutateAsync({
      name: values.name,
    });
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
      name: user.name,
    },
    resolver: zodResolver(usersUpdateSchema),
  });

  const onDrop = async (acceptedFile: FileWithPath) => {
    void supabase.storage
      .from("users")
      .upload(`public/${acceptedFile.name}`, acceptedFile, {
        cacheControl: "3600",
        upsert: true,
      })
      .then((result) => {
        const { data, error } = result;
        if (error) {
          toast({
            description: "リクエストが失敗しました",
            title: "エラー",
            variant: "destructive",
          });
          return;
        }
        userUpdateMutation
          .mutateAsync({ avatar_url: data.path })
          .then((result1) => {
            const { error: error2 } = result1;
            if (error2) {
              toast({
                description: "リクエストが失敗しました",
                title: "エラー",
                variant: "destructive",
              });
              return;
            }
            toast({
              description: "リクエストが成功しました",
              title: "成功",
            });
          })
          .catch((error1) => {
            sendErrorMessage("useManualEditForm", error1);
            toast({
              description: "リクエストが失敗しました",
              title: "エラー",
              variant: "destructive",
            });
          });
      })
      .catch((error1) => {
        sendErrorMessage("useManualEditForm", error1);
        toast({
          description: "リクエストが失敗しました",
          title: "エラー",
          variant: "destructive",
        });
      });
  };
  return {
    form,
    onDrop,
    onSubmit,
    userUpdateMutation,
  };
};
