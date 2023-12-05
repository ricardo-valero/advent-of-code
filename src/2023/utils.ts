import * as NodeFs from "node:fs"
import * as NodePath from "node:path"
import * as NodeUrl from "node:url"

export function readFileSyncRelative(
  callerUrl: string,
  relativePath: string
) {
  const callerPath = NodeUrl.fileURLToPath(callerUrl)
  const callerDirectory = NodePath.dirname(callerPath)
  const absoluteFilePath = NodePath.join(callerDirectory, relativePath)
  return NodeFs.readFileSync(absoluteFilePath, "utf-8")
}
