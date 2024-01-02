/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";

const removeEmptyValues = (
  object: Record<string, string | number | any[] | null | undefined>,
) =>
  Object.fromEntries(
    Object.entries(object).filter(
      ([_, value]) =>
        !(
          !value ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ),
    ),
  );

export const useAllSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allSearchParams: Record<
    string,
    string | number | any[] | null | undefined
  > = {};

  const entries = Object.entries(searchParams);
  entries.forEach(([key, value]) => {
    allSearchParams[key] = value;
  });
  const changeSearchParam = (
    object: Record<string, string | number | null | undefined | any[]>,
  ) => {
    // remove empty values and empty arrays
    const newObject = removeEmptyValues(object);
    const mergeObject = { ...allSearchParams, ...newObject };
    const newURLSearchParams = new URLSearchParams();
    const entries2 = Object.entries(mergeObject);
    entries2.forEach(([key, value]) => {
      newURLSearchParams.set(key, String(value));
    });
    setSearchParams(newURLSearchParams);
  };
  const replaceSearchParam = (
    object: Record<string, string | number | null | undefined | any[]>,
  ) => {
    // remove empty values and empty arrays
    const newObject = removeEmptyValues(object);
    const newURLSearchParams = new URLSearchParams();
    const entries1 = Object.entries(newObject);
    entries1.forEach(([key, value]) => {
      newURLSearchParams.set(key, String(value));
    });

    setSearchParams(newURLSearchParams);
  };
  return {
    changeSearchParam,
    params: allSearchParams,
    replaceSearchParam,
    setSearchParams,
  };
};
