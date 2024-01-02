/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";

export const useAllSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allSearchParams: Record<string, string> = {};

  const entries = Object.entries(searchParams);
  entries.forEach(([key, value]) => {
    allSearchParams[key] = value;
  });
  const changeSearchParam = (object: Record<string, string>) => {
    setSearchParams({ ...allSearchParams, ...object });
  };
  return {
    changeSearchParam,
    params: allSearchParams,
    setSearchParams,
  };
};
