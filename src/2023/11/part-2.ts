import { readStandardInput } from "../utils"
import { generateExpandedCoords, generatePairs, manhattanDistance, parseData, sample } from "./shared"

function program(input: string) {
  const data = parseData(input)
  const coords = generateExpandedCoords(data, 1_000_000)
  const pairs = generatePairs(coords)
  const distances = pairs.map((coords) => manhattanDistance(...coords))
  const sum = distances.reduce((prev, curr) => prev + curr, 0)
  return sum
}

console.log(program(sample))
readStandardInput((input) => console.log(program(input)))
