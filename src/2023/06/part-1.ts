import { readStandardInput } from "../utils"

const sample = `Time:      7  15   30
Distance:  9  40  200`

/*
0,0 (7-0)*0
1,6 (7-1)*1
2,10 (7-2)*2
3,12 (7-3)*3
4,12 (b-x)*x-c = -x^2+bx-c > 0 // b is time, c is distance
5,10
6,6
7,0



hold the button for 2-5 milliseconds
4 ways to win

hold the button for 4-11 milliseconds
8 ways to win

hold the button for 11-19 milliseconds
9 ways to win


 */

function parseData(text: string) {
  const [timePart, distancePart] = text.split("\n")
  return [parseNumbers(timePart), parseNumbers(distancePart)] as const
}

function parseNumbers(text: string) {
  const numbers = text.match(/\d+/g)
  return numbers ? numbers.map((x) => parseInt(x, 10)) : []
}

function solveQuadratic(
  a: number,
  b: number,
  c: number
): [number | undefined, number | undefined] {
  const discriminant = b ** 2 - 4 * a * c

  if (discriminant < 0) {
    return [undefined, undefined]
  } else {
    const sqrtDiscriminant = Math.sqrt(discriminant)
    const root1 = (-b + sqrtDiscriminant) / (2 * a)
    const root2 = (-b - sqrtDiscriminant) / (2 * a)
    return [root1, root2]
  }
}

function program(text: string) {
  const raceData = parseData(text)
  const races = []
  for (let i = 0; i < raceData[0].length; i++) {
    races.push([raceData[0][i], raceData[1][i]])
  }

  const ranges = []
  for (const [time, distance] of races) {
    const roots = solveQuadratic(-1, time, (distance + 1) * -1)
    ranges.push([Math.ceil(roots[0] || 0), Math.floor(roots[1] || 0)])
  }

  const rangeSizes = ranges.map((x) => x[1] - x[0] + 1)
  const result = rangeSizes.reduce((prev, curr) => prev * curr, 1)
  console.log(result)
  return
}

function main() {
  program(sample)
  readStandardInput((input) => program(input))
}

main()
