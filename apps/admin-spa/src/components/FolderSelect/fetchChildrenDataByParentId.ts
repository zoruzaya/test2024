import type { TreeDataType } from "./types";
import type { manualFoldersRowSchema } from "@spec-team/db/types/schema";
import type z from "zod";

import {
  TREE_VIEW_FOLDER_PREFIX,
  TREE_VIEW_MANUAL_PREFIX,
  TREE_VIEW_PREFIX_SEPARATOR,
} from "@/lib/const";
import { sendErrorMessage } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

export const fetchChildrenDataByParentId = async ({
  parentId,
  foldersOnly,
}: {
  // null means root
  parentId: z.infer<typeof manualFoldersRowSchema>["id"] | null;
  foldersOnly?: boolean;
}) => {
  let childFolders: TreeDataType = [];
  const supabaseRequest = supabase.from("manual_folders").select("*");
  if (parentId === null) {
    void supabaseRequest.is("parent_id", null);
  } else {
    void supabaseRequest.eq("parent_id", parentId);
  }
  const childFoldersResponse = await supabaseRequest.order("display_order", {
    ascending: true,
  });
  if (childFoldersResponse.error) {
    sendErrorMessage("fetchTreeData", childFoldersResponse.error);
    childFolders = [];
  } else {
    childFolders = childFoldersResponse.data.map((folder) => ({
      isLeaf: false,
      key: `${TREE_VIEW_FOLDER_PREFIX}${TREE_VIEW_PREFIX_SEPARATOR}${folder.id}`,
      title: folder.name,
    }));
  }
  if (foldersOnly) {
    return childFolders;
  }

  let childManuals: TreeDataType = [];
  const supabaseChildFoldersRequest = supabase.from("manuals").select("*");
  if (parentId === null) {
    void supabaseChildFoldersRequest.is("parent_id", null);
  } else {
    void supabaseChildFoldersRequest.eq("parent_id", parentId);
  }
  const childManualResponse = await supabaseChildFoldersRequest;

  if (childManualResponse.error) {
    sendErrorMessage("fetchTreeData", childManualResponse.error);
    return [];
  }
  childManuals = childManualResponse.data.map((manual) => ({
    isLeaf: true,
    key: `${TREE_VIEW_MANUAL_PREFIX}${TREE_VIEW_PREFIX_SEPARATOR}${manual.id}`,
    title: manual.title,
  }));

  return [...childFolders, ...childManuals];
};
