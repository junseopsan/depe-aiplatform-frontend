export type UploadedFile = {
  id: string
  file: File
  /** 폴더 업로드 시 webkitRelativePath, 파일 업로드 시 파일명 */
  relativePath: string
}

export type FileTreeNode =
  | {
      kind: "folder"
      name: string
      path: string
      children: FileTreeNode[]
    }
  | {
      kind: "file"
      name: string
      path: string
      file: UploadedFile
    }
