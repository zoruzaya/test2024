/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { fetchChildrenDataByParentId } from "./fetchChildrenDataByParentId";
import { updateTreeData } from "./updateTreeData";

import type { OnExpandType, TreeDataType } from "./types";
import type { ControllerRenderProps } from "react-hook-form";

import {
  ROOT_FOLDER_ID,
  TREE_VIEW_FOLDER_PREFIX,
  TREE_VIEW_PREFIX_SEPARATOR,
} from "@/lib/const";
import { sendLogMessage } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

export const useFolderSelectorHooks = ({
  field,
}: {
  field: ControllerRenderProps<any, string>;
}) => {
  const [open, setOpen] = useState(false);
  const [treeData, setTreeData] = useState<TreeDataType>([]);
  const [selectedFolder, setSelectedFolder] = useState<any | null>(null); // eslint-disable-line @typescript-eslint/no-redundant-type-constituents

  useEffect(() => {
    void fetchChildrenDataByParentId({
      foldersOnly: true,
      parentId: null,
    }).then((data) => {
      setTreeData(data);
    });
  }, []);

  const parentId = field.value ?? null;
  useEffect(
    () => {
      if (parentId === ROOT_FOLDER_ID) {
        return;
      }
      if (!parentId) {
        void supabase
          .from("manual_folders")
          .select("*")
          .eq("id", ROOT_FOLDER_ID)
          .then(({ data, error }) => {
            if (error) {
              console.error("error", error);
              return;
            }
            const [folder] = data;
            if (!folder) {
              return;
            }
            field.onChange(Number(ROOT_FOLDER_ID));
            setSelectedFolder({
              key: `${TREE_VIEW_FOLDER_PREFIX}${TREE_VIEW_PREFIX_SEPARATOR}${folder.id}`,
              title: folder.name,
            });
          });

        return;
      }
      // set selected folder at first render
      void supabase
        .from("manual_folders")
        .select("*")
        .eq("id", parentId)
        .then(({ data, error }) => {
          if (error) {
            console.error("error", error);
            return;
          }
          const [folder] = data;
          if (!folder) {
            return;
          }
          setSelectedFolder({
            key: `${TREE_VIEW_FOLDER_PREFIX}${TREE_VIEW_PREFIX_SEPARATOR}${folder.id}`,
            title: folder.name,
          });
        });
    },
    [
      // do not use parentId as dependency. it will cause infinite loop. it is intended to be on first render
    ],
  );
  const onExpand: OnExpandType = (
    expandedKeys,
    { expanded, node, nativeEvent },
  ) => {
    if (!expanded) {
      // user is just closing the folder. we don't have to add or remove tree data
      return;
    }
    const { key } = node;
    if (typeof key !== "string") {
      // this should not happen. we set the key as string in fetchChildrenDataByParentId function
      return;
    }
    const keyParts = key.split(TREE_VIEW_PREFIX_SEPARATOR);
    const type = keyParts[0];
    const id = keyParts[1];
    if (type === TREE_VIEW_FOLDER_PREFIX) {
      fetchChildrenDataByParentId({
        foldersOnly: true,
        parentId: Number(id),
      })
        .then((data) => {
          setTreeData((prevTreeData) => {
            if (!prevTreeData) {
              // basically this should not happen. if there is no prevTreeData, we should not be able to expand the folder
              return [];
            }
            return updateTreeData({
              data,
              key,
              treeData: prevTreeData,
            });
          });
        })
        .catch(() => {});
    }
    sendLogMessage("onExpand", expandedKeys, { expanded, nativeEvent, node });
  };
  return {
    onExpand,
    open,
    selectedFolder,
    setOpen,
    setSelectedFolder,
    treeData,
  };
};
