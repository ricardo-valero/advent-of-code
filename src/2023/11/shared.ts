export const sample = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

const transpose = <T>(matrix: Array<Array<T>>) => matrix[0].map((_, i) => matrix.map((row) => row[i]))

export function parseData(text: string) {
  const lines = text.split("\n")
  const grid = lines.map((line) => Array.from(line))

  const hLines = lines
  const vLines = transpose(grid).map((col) => col.join(""))
  return [hLines, vLines] as const
}

const findIndices = <T>(array: Array<T>, predicate: (value: T) => boolean) =>
  array.map((value, index) => predicate(value) ? index : undefined)
    .filter((index): index is number => index !== undefined)

// the first part was solved without a factor, but in reality it's just a factor of 2
export function generateExpandedCoords(data: readonly [Array<string>, Array<string>], factor = 2) {
  const hs = data[0].map((line) => findIndices(Array.from(line), (v) => v === "#"))
  const vs = data[1].map((line) => findIndices(Array.from(line), (v) => v === "#"))
  const emptyHs = findIndices(hs, (v) => v.length === 0)
  const emptyVs = findIndices(vs, (v) => v.length === 0)
  const result = hs.flatMap((xs, i) => xs.map((x) => [i, x]))
  const expanded = Array<[number, number]>()
  for (let i = 0; i < result.length; i++) {
    const element = result[i]
    const expH = emptyHs.filter((x) => x < element[0]).length * (factor - 1)
    const expV = emptyVs.filter((x) => x < element[1]).length * (factor - 1)
    expanded.push([element[0] + expH, element[1] + expV])
  }
  return expanded
}

export function generatePairs(
  coords: Array<[number, number]>
): Array<[[number, number], [number, number]]> {
  return coords.flatMap((coord, i) => coords.slice(i + 1).map((nextCoord) => [coord, nextCoord]))
}

export function manhattanDistance(p1: [number, number], p2: [number, number]) {
  return Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1])
}
