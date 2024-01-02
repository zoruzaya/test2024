import type { TreeDataType } from "./types";

export const updateTreeData = ({
  treeData,
  key,
  data,
}: {
  treeData: TreeDataType;
  key: string;
  data: TreeDataType;
}): TreeDataType =>
  treeData?.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children: data,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData({
          data,
          key,
          treeData: node.children,
        }),
      };
    }
    return node;
  });
