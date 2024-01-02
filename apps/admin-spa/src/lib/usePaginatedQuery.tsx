/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";

import type { QueryKey} from "@tanstack/react-query";

import { paginationToDbRange } from "@/lib/paginationToDbRange";
import { usePaginationRouter } from "@/lib/usePaginationRouter";

interface UsePaginatedQueryProps<T, K> {
  initialPage?: number;
  size?: number;
  queryFn: (args: { from: number; to: number }) => T | Promise<T>;
  queryKey: K;
}

export const usePaginatedQuery = <T, K extends QueryKey>({
  queryFn,
  queryKey: queryKeyProp,
}: UsePaginatedQueryProps<T, K>) => {
  const { page, size } = usePaginationRouter();
  const { from, to } = paginationToDbRange({
    page,
    size,
  });

  const queryKey = [...queryKeyProp, page, size];
  const queryResult = useQuery({
    queryFn: () => queryFn({ from, to }),
    queryKey,
  });
  const total = (queryResult.data as any)?.count ?? 0; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  return {
    pagination: {
      count: total,
      hasNext: total > page * size,
      hasPrevious: page > 1,
      page,
      size,
    },
    queryKey,
    queryResult,
  };
};
