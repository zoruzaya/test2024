/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  toast,
} from "@spec-team/ui";

import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export const DeleteConfirmation = ({
  onOk,
}: {
  onOk: () => Promise<void | PostgrestSingleResponse<null>>;
}) => (
  <AlertDialog>
    <AlertDialogTrigger>
      <TrashIcon className="text-primary h-4 w-4 text-red-600" />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>確認</AlertDialogTitle>
        <AlertDialogDescription>
          データがサーバーから削除されます。
          こちらのアクションは戻すことができません。 よろしいですか？
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>いいえ</AlertDialogCancel>
        <AlertDialogAction
          onClick={async () => {
            const result = await onOk();
            if (result?.error) {
              if (result?.error.code === "23503") {
                toast({
                  description: "データは使用されているため削除できません",
                  title: "エラー",
                  variant: "destructive",
                });
                return;
              }
              toast({
                description: "削除に失敗しました",
                title: "エラー",
                variant: "destructive",
              });
            } else {
              toast({
                description: "削除しました",
                title: "成功",
              });
            }
          }}
        >
          はい
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
