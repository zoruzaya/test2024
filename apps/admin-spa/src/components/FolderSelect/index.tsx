/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@spec-team/ui";

import { FolderSelector } from "./FolderSelector";

import type { Control } from "react-hook-form";

export const FolderSelect = ({
  control,
  name,
}: {
  control: Control<any>;
  name: string;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col items-start ">
        <FormLabel>親フォルダー</FormLabel>
        <FormControl>
          <FolderSelector field={field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
