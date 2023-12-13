import { readStandardInput } from "../utils"
import { parseData } from "./shared"

const sample = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)` as const

// Function to calculate the greatest common divisor (GCD)
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

// Function to calculate the lowest common multiple (LCM)
function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b)
}

const instructionMap = ["L", "R"] as const

// TODO: this works but it is slow
function program(text: string) {
  const data = parseData(text)

  const instructions = data[0]
  const nodes = data[1]

  const starts = nodes.flatMap((node, i) => node[0].endsWith("A") ? [i] : [])
  const ends = nodes.flatMap((node, i) => node[0].endsWith("Z") ? [i] : [])
  const limit = instructions.length * nodes.length
  const counts = []
  for (const start of starts) {
    for (const end of ends) {
      let curr = start
      let count = 0
      while (curr !== end) {
        const instruction = instructionMap.indexOf(
          instructions[count % instructions.length] as typeof instructionMap[number]
        )
        if (instruction === -1) throw Error("Invalid move")
        const next = nodes[curr][1][instruction]
        curr = nodes.findIndex((node) => node[0] === next)
        count++
        if (count > limit) {
          count = Infinity
          break
        }
      }
      if (count !== Infinity) counts.push(count)
    }
  }
  const result = counts.reduce(lcm)
  console.log(result)
  return result
}

program(sample)
readStandardInput(program)
