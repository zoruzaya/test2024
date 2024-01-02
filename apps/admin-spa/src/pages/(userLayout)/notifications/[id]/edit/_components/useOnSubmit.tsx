import { useNavigate } from "react-router-dom";

import { toast } from "@spec-team/ui";

import type { NotificationEditFormType } from "./types";

import { supabase } from "@/lib/supabase";

export const useOnSubmit = ({ notificationId }: { notificationId: number }) => {
  const navigate = useNavigate();
  const onSubmit = async (values: NotificationEditFormType) => {
    const result = await supabase
      .from("c_notifications")
      .update(values)
      .eq("id", notificationId);
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
    navigate("/notifications");
  };
  return onSubmit;
};
