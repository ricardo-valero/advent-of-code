import { readStandardInput } from "../utils"

function factorial(n: number): number {
  return (n === 0 || n === 1)
    ? 1
    : n * factorial(n - 1)
}

function combination(n: number, k: number) {
  return (k === 0 || k === n)
    ? 1
    : factorial(n) / (factorial(k) * factorial(n - k))
}

function manhattanDistance(p1: [number, number], p2: [number, number]) {
  return Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1])
}

function euclideanDistance(p1: [number, number], p2: [number, number]) {
  return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2))
}

function generatePairs(
  coords: Array<[number, number]>
): Array<[[number, number], [number, number]]> {
  return coords.flatMap((coord, i) => coords.slice(i + 1).map((nextCoord) => [coord, nextCoord]))
}

const sample = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

const transpose = <T>(matrix: Array<Array<T>>) => matrix[0].map((col, i) => matrix.map((row) => row[i]))

const findIndices = <T>(array: Array<T>, predicate: (value: T) => boolean) =>
  array
    .map((value, index) => predicate(value) ? index : undefined)
    .filter((index): index is number => index !== undefined)

function transformData(text: string) {
  const lines = text.split("\n")
  const grid = lines.map((line) => Array.from(line))

  const hLines = lines
  const vLines = transpose(grid).map((col) => col.join(""))

  const hs = hLines.map((line) => findIndices(Array.from(line), (v) => v === "#"))
  const vs = vLines.map((line) => findIndices(Array.from(line), (v) => v === "#"))

  const emptyHs = findIndices(hs, (v) => v.length === 0)
  const emptyVs = findIndices(vs, (v) => v.length === 0)

  const result = hs.flatMap((xs, i) => xs.map((x) => [i, x]))

  const expInd = 1_000_000 - 1 // TODO: should be a variable
  const expanded = Array<[number, number]>()
  for (let i = 0; i < result.length; i++) {
    const element = result[i]
    const expH = emptyHs.filter((x) => x < element[0]).length * expInd
    const expV = emptyVs.filter((x) => x < element[1]).length * expInd
    expanded.push([element[0] + expH, element[1] + expV])
  }
  return expanded
}

function program(input: string) {
  const coords = transformData(input)
  const pairs = generatePairs(coords)
  const distances = pairs.map((coords) => manhattanDistance(...coords))
  const sum = distances.reduce((prev, curr) => prev + curr, 0)
  return sum
}

console.log(program(sample))
readStandardInput((input) => console.log(program(input)))
