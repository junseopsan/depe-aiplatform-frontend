import type { FileTreeNode, UploadedFile } from "@/components/ui/UiFileUpload/types"

type FolderNode = Extract<FileTreeNode, { kind: "folder" }>

export const buildFileTree = (files: UploadedFile[]): FileTreeNode[] => {
  const root: FolderNode = { kind: "folder", name: "", path: "", children: [] }

  for (const file of files) {
    const segments = file.relativePath.split("/").filter(Boolean)
    if (segments.length === 0) continue

    let cursor: FolderNode = root
    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1
      const segmentPath = segments.slice(0, index + 1).join("/")

      if (isLast) {
        cursor.children.push({
          kind: "file",
          name: segment,
          path: segmentPath,
          file,
        })
        return
      }

      let next = cursor.children.find(
        (child): child is FolderNode =>
          child.kind === "folder" && child.name === segment,
      )
      if (!next) {
        next = { kind: "folder", name: segment, path: segmentPath, children: [] }
        cursor.children.push(next)
      }
      cursor = next
    })
  }

  sortTree(root.children)
  return root.children
}

const sortTree = (nodes: FileTreeNode[]) => {
  nodes.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "folder" ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  for (const node of nodes) {
    if (node.kind === "folder") sortTree(node.children)
  }
}
