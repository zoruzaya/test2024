import { ActionCell } from "./ActionCell";

import type { usersRowSchema } from "@spec-team/db/types/schema";
import type { ColumnDef } from "@tanstack/react-table";
import type * as z from "zod";

export const useColumns = () => {
  const columns: ColumnDef<z.infer<typeof usersRowSchema>>[] = [
    {
      accessorKey: "name",
      header: "名前",
    },
    {
      accessorKey: "email",
      header: "メールアドレス",
    },
    {
      accessorKey: "created_at",
      header: "作成日",
    },
    {
      accessorKey: "role",
      cell: ({ row }) => (
        <div>
          {row.original.role === "company_admin" ? "企業管理者" : "ユーザー"}
        </div>
      ),
    },
    {
      cell: ({ row }) => <ActionCell id={row.original.id} />,
      // cell: ({ row }) => (
      //   <div>
      //     <a href={`/users/${row.original.id}/edit`}>編集</a>
      //   </div>
      // ),
      header: "操作",
      id: "actions",
    },
  ];
  return columns;
};
