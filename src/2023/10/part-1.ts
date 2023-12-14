import { readStandardInput } from "../utils"

const samples = [
  `.....
.S-7.
.|.|.
.L-J.
.....`,
  `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`
] as const

const move2d = {
  N: [-1, 0],
  S: [+1, 0],
  E: [0, +1],
  W: [0, -1]
} as const
type Move2dKey = keyof typeof move2d

const charMap: Record<string, [[Move2dKey, Move2dKey], [Move2dKey, Move2dKey]]> = {
  "|": [["N", "N"], ["S", "S"]],
  "-": [["E", "E"], ["W", "W"]],
  "L": [["S", "E"], ["W", "N"]],
  "J": [["S", "W"], ["E", "N"]],
  "7": [["N", "W"], ["E", "S"]],
  "F": [["N", "E"], ["W", "S"]]
}
type CharMapKey = keyof typeof charMap

function parseData(text: string) {
  return text.split("\n")
}

function program(input: string) {
  //   for (const [key, value] of Object.entries(betterCharMap)) {
  //     input = input.replaceAll(key, value)
  //   }
  const data = parseData(input)
  let start: [number, number] | undefined = undefined
  for (let i = 0; i < data.length; i++) {
    if (data[i].includes("S")) {
      start = [i, data[i].indexOf("S")]
      break
    }
  }
  const result = []
  if (start) {
    let currPos = [start[0], start[1]]
    let moveKey: Move2dKey = "S" // How to determine starting move?
    let isRunning = true
    while (isRunning) {
      const move = move2d[moveKey]
      currPos = [currPos[0] + move[0], currPos[1] + move[1]]
      if (currPos[0] === start[0] && currPos[1] === start[1]) {
        isRunning = false
        break
      }
      result.push(currPos)
      const char = data[currPos[0]][currPos[1]] as CharMapKey
      const possibleMoves = charMap[char]
      if (possibleMoves[0][0] === moveKey) {
        moveKey = possibleMoves[0][1]
      } else if (possibleMoves[1][0] === moveKey) {
        moveKey = possibleMoves[1][1]
      } else {
        console.log("Error: Not continuous pipe!")
        break
      }
    }
  }
  console.log(Math.ceil(result.length / 2))
}

console.log("---Sample 1---")
program(samples[0])
console.log("---Sample 2---")
program(samples[1])
console.log("---Input---")
readStandardInput(program)
