/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  RcTree,
} from "@spec-team/ui";
import { File, Folder } from "lucide-react";

import { useFolderSelectorHooks } from "./useFolderSelectorHooks";

import type { ControllerRenderProps } from "react-hook-form";

import {
  TREE_VIEW_FOLDER_PREFIX,
  TREE_VIEW_MANUAL_PREFIX,
  TREE_VIEW_PREFIX_SEPARATOR,
} from "@/lib/const";
import { cn } from "@/lib/utils";

const Tree = RcTree.default;

const Icon = ({ isLeaf }: { isLeaf?: boolean }) => {
  if (isLeaf) {
    return <File className={cn(["text-primary  h-10 w-10"])} />;
  }
  return (
    <Folder className={cn(["text-primary/50  h-10 w-10", "fill-primary/50"])} />
  );
};

export const FolderSelector = ({
  field,
}: {
  field: ControllerRenderProps<any, string>;
}) => {
  const {
    treeData,
    onExpand,
    selectedFolder,
    setSelectedFolder,
    open,
    setOpen,
  } = useFolderSelectorHooks({ field });
  const title = selectedFolder?.title ?? "フォルダーを選ぶ"; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(["text-primary rounded underline"])}>
        {title}
      </DialogTrigger>
      <DialogContent className=" min-h-[300px]">
        <DialogHeader>
          <DialogTitle>親フォルダーを選んでください</DialogTitle>
          <DialogDescription>
            <Tree
              showLine
              treeData={treeData}
              onExpand={onExpand}
              icon={Icon}
              onSelect={(_, { node }) => {
                if (typeof node.key !== "string") {
                  // this should not happen. we set the key as string in fetchChildrenDataByParentId function
                  return;
                }
                const [type, id] = node.key.split(TREE_VIEW_PREFIX_SEPARATOR);
                if (type === TREE_VIEW_FOLDER_PREFIX) {
                  field.onChange(Number(id));
                  setSelectedFolder(node);
                  setOpen(false);
                  return;
                }
                if (type === TREE_VIEW_MANUAL_PREFIX) {
                  // move to manual detail
                  // navigate(`/manuals/${id}`);
                }
              }}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
