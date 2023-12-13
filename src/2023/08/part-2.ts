import { readStandardInput } from "../utils"

const sample = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)` as const

function parseData(text: string) {
  const parts = text.split("\n\n")
  return [parseInstructions(parts[0]), parseNodeMaps(parts[1])] as const
}

function parseInstructions(text: string) {
  const parts = text.split("")
  return parts
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

// const instructionMap = {
//   [-1]: "L",
//   [+1]: "R"
// } as const

function program(text: string) {
  const data = parseData(text)

  const instructions = data[0]
  const nodes = data[1]

  const starts = nodes.flatMap((node, i) => node[0].endsWith("A") ? [i] : [])
  const ends = nodes.flatMap((node, i) => node[0].endsWith("Z") ? [i] : [])

  let currs = starts
  let i = 0

  console.log({ start: starts, end: ends })

  while (currs.join(",") !== ends.join(",")) {
    const instruction = instructions[i % instructions.length]
    const move = instruction === "L" ? 0 : instruction === "R" ? 1 : -1
    if (move === -1) throw Error("Invalid move")
    const nexts = currs.map((curr) => nodes[curr][1][move])
    currs = nodes.flatMap((node, i) => nexts.includes(node[0]) ? [i] : [])
    // console.log({ i, next, curr })
    i++
    // if (i > 10) break
  }
  console.log(i)
}

program(sample)
readStandardInput(program)
