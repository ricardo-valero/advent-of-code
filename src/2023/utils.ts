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

// watch out for this https://stackoverflow.com/questions/9231847/node-js-how-to-detect-an-empty-stdin-stream/53347693#53347693
export function readStandardInput<T>(
  f: (input: string) => T
) {
  if (process.stdin.isTTY) throw new Error("Standard input was not provided")
  const chunks: Array<Buffer> = []
  process.stdin.on("data", (chunk) => chunks.push(chunk))
  process.stdin.on("end", () => f(Buffer.concat(chunks).toString("utf-8")))
}
