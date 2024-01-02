import { Pencil2Icon, ReaderIcon } from "@radix-ui/react-icons";
import { Button } from "@spec-team/ui";
import dayjs from "dayjs";

import type { cNotificationsRowSchema } from "@spec-team/db/types/schema";
import type { ColumnDef } from "@tanstack/react-table";
import type * as z from "zod";

import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { supabase } from "@/lib/supabase";

const generateDeleteNotification =
  ({ notificationId }: { notificationId: number }) =>
  async () =>
    supabase.from("c_notifications").delete().eq("id", notificationId);

export const useColumns = () => {
  const columns: ColumnDef<z.infer<typeof cNotificationsRowSchema>>[] = [
    {
      accessorKey: "title",
      header: "タイトル",
      size: 150,
    },
    {
      accessorKey: "detail",
      cell: (props) => (
        <div
          className=" line-clamp-3 "
          dangerouslySetInnerHTML={{
            __html: props.row.original.detail ?? "",
          }}
        />
      ),
      header: "詳細",
    },
    {
      accessorKey: "created_at",
      cell: ({ row }) => (
        <div>{dayjs(row.original.created_at).format("YYYY-MM-DD")}</div>
      ),
      header: "作成日",
      size: 120,
    },

    {
      cell: ({ row }) => {
        const onOk = generateDeleteNotification({
          notificationId: row.original.id,
        });
        return (
          <div className="flex flex-row">
            {/* <a href={`/notifications/${row.original.id}/edit`}>編集</a> */}
            <Button variant="link" size="icon">
              <a href={`/notifications/${row.original.id}`}>
                <ReaderIcon className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="link" size="icon">
              <a href={`/notifications/${row.original.id}/edit`}>
                <Pencil2Icon className="h-4 w-4" />
              </a>
            </Button>
            <DeleteConfirmation onOk={onOk} />
          </div>
        );
      },
      header: "操作",
      id: "actions",
      size: 100,
    },
  ];
  return columns;
};
