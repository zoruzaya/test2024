import { useState } from "react";

import { DataTable } from "@spec-team/ui";
import { useQuery } from "@tanstack/react-query";

import { useColumns } from "./useColumns";

import type { PaginationState } from "@tanstack/react-table";

import { supabase } from "@/lib/supabase";

const fetchNotifications = async ({
  from,
  to,
}: {
  from: number;
  to: number;
}) => {
  const result = await supabase
    .from("c_notifications")
    .select(`*`, { count: "exact" })
    .range(from, to);
  if (result.error) {
    throw new Error("Failed to load frequently used notifications");
  }
  return result;
};

const usePagination = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  return {
    pageIndex,
    pageSize,
    setPagination,
  };
};

export const NotificationList = () => {
  const { pageIndex, pageSize, setPagination } = usePagination();
  const from = pageIndex * pageSize;
  const to = from + pageSize;

  const notificationsResult = useQuery({
    queryFn: () => fetchNotifications({ from, to }),
    queryKey: ["c_notifications", { from, to }],
  });

  const columns = useColumns();
  if (notificationsResult.isError) {
    return <div>error</div>;
  }
  if (notificationsResult.isLoading) {
    return <div>loading...</div>;
  }
  return (
    <DataTable
      columns={columns}
      data={notificationsResult.data?.data ?? []}
      pagination={{
        onPageChange: setPagination,
        pageCount: (notificationsResult.data?.count ?? 0) / pageSize,
        pageIndex: 0,
        pageSize: 10,
      }}
    />
  );
};
