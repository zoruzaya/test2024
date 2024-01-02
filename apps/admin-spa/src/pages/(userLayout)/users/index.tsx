import { PlusIcon } from "@radix-ui/react-icons";
import { Button, DataTable } from "@spec-team/ui";

import { useColumns } from "./_components/columns";

import { supabase } from "@/lib/supabase";
import { useAllSearchParams } from "@/lib/useAllSearchParams";
import { usePaginatedQuery } from "@/lib/usePaginatedQuery";

export const dynamic = "force-dynamic";

const ServerAction = () => {
  const { changeSearchParam } = useAllSearchParams();
  const {
    queryResult: { data: queryResult, isLoading, isError },
    pagination: { page, size, count },
  } = usePaginatedQuery({
    queryFn: async ({ from, to }) => {
      const notificationListResult = await supabase
        .from("users")
        .select("*", { count: "exact" })
        .range(from, to)
        .order("name", { ascending: false });
      return notificationListResult;
    },
    queryKey: ["users"],
  });
  const columns = useColumns();

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>error</div>;
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end ">
        <a href="/users/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            追加
          </Button>
        </a>
      </div>
      <DataTable
        columns={columns}
        data={queryResult?.data ?? []}
        pagination={{
          onPageChange: (paginationState) => {
            changeSearchParam({ page: `${paginationState.pageIndex + 1}` });
          },
          pageCount: Math.ceil(count / size),
          pageIndex: page - 1,
          pageSize: size,
        }}
      />
    </div>
  );
};
export default ServerAction;
