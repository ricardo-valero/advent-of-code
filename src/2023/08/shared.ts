export function parseData(text: string) {
  const parts = text.split("\n\n")
  return [parts[0], parseNodeMaps(parts[1])] as const
}

function parseNodeMaps(text: string) {
  const parts = text.split("\n")
  return parts.map(parseKeyValues)
}

function parseKeyValues(text: string) {
  const parts = text.split("=")
  const key = parts[0].trim()
  const match = parts[1].match(/(\w+), (\w+)/)
  const values = match ? [match[1], match[2]] as const : [] as const
  return [key, values] as const
}
