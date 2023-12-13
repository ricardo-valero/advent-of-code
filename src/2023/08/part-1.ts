import { readStandardInput } from "../utils"

const samples = [
  `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
  `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`
] as const

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

  const start = nodes.findIndex((node) => node[0] === "AAA")
  const end = nodes.findIndex((node) => node[0] === "ZZZ")

  let curr = start
  let i = 0

  while (curr !== end) {
    const instruction = instructions[i % instructions.length]
    const move = instruction === "L" ? 0 : instruction === "R" ? 1 : -1
    if (move === -1) throw Error("Invalid move")
    const next = nodes[curr][1][move]
    curr = nodes.findIndex((node) => node[0] === next)
    i++
    // console.log({ i, next, curr })
    // if (i > 10) break
  }

  console.log(i)
}

program(samples[0])
program(samples[1])
readStandardInput(program)
