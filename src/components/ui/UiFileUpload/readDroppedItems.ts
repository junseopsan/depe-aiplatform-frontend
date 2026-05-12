// File System Access entry types (non-standard but widely supported)
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry
type FsEntry = FsFileEntry | FsDirectoryEntry
type FsFileEntry = {
  isFile: true
  isDirectory: false
  name: string
  file: (cb: (file: File) => void) => void
}
type FsDirectoryEntry = {
  isFile: false
  isDirectory: true
  name: string
  createReader: () => FsDirectoryReader
}
type FsDirectoryReader = {
  readEntries: (cb: (entries: FsEntry[]) => void) => void
}

type DroppedEntry = { file: File; relativePath: string }

/**
 * DataTransferItemList에서 파일과 폴더(디렉토리 구조 보존)를 모두 수집한다.
 * 폴더는 `webkitGetAsEntry()` 기반 재귀 순회로 처리한다.
 */
export const readDroppedItems = async (
  items: DataTransferItemList,
): Promise<DroppedEntry[]> => {
  const result: DroppedEntry[] = []
  const promises: Promise<void>[] = []

  for (const item of Array.from(items)) {
    const entry = item.webkitGetAsEntry?.() as FsEntry | null
    if (entry) {
      promises.push(traverseEntry(entry, "", result))
    } else {
      const file = item.getAsFile()
      if (file) result.push({ file, relativePath: file.name })
    }
  }

  await Promise.all(promises)
  return result
}

const traverseEntry = async (
  entry: FsEntry,
  parentPath: string,
  out: DroppedEntry[],
): Promise<void> => {
  if (entry.isFile) {
    const file = await new Promise<File>((resolve) => entry.file(resolve))
    const relativePath = parentPath ? `${parentPath}/${entry.name}` : entry.name
    out.push({ file, relativePath })
    return
  }

  const reader = entry.createReader()
  const children = await readAllEntries(reader)
  const nextParent = parentPath ? `${parentPath}/${entry.name}` : entry.name
  await Promise.all(children.map((child) => traverseEntry(child, nextParent, out)))
}

// readEntries는 한 번에 100개씩만 반환할 수 있어 빈 배열이 나올 때까지 반복 호출 필요
const readAllEntries = (reader: FsDirectoryReader): Promise<FsEntry[]> =>
  new Promise((resolve) => {
    const collected: FsEntry[] = []
    const readBatch = () => {
      reader.readEntries((entries) => {
        if (entries.length === 0) {
          resolve(collected)
          return
        }
        collected.push(...entries)
        readBatch()
      })
    }
    readBatch()
  })
