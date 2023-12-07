import { getInput, getSample } from "./shared"

const specialCharacters = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "{",
  "}",
  "[",
  "]",
  ":",
  ";",
  "<",
  ">",
  ",",
  //   ".",
  "?",
  "/",
  "~",
  "\\",
  "|",
  "-",
  "=",
  "`",
  "\"",
  "'"
] as const

const state1d = [-1, 0, +1] as const
const state2d = state1d.map((row) => state1d.map((col) => [col, row])).flat()

function parseText(text: string) {
  const coords = new Array<[number, number]>()
  const digits = new Array<number>()
  const lines = text.split("\n")
  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
      const char = lines[row][col]
      if (specialCharacters.some((value) => value === char)) {
        for (const dy of state1d) {
          const curr = lines[row + dy]
          let digit = ""
          let prev = ""
          for (const dx of state1d) {
            digit = findDigits(curr, col + dx)
            if (prev !== digit) {
              if (isDigit(digit)) {
                digits.push(parseInt(digit, 10))
              }
              prev = digit
            }
          }
          //   if (isDigit(curr)) {
          //     console.log(findDigits(lines[y], x))
          //     coords.push([dx, dy])
          //     result += parseInt(curr, 10)
          //   }
        }
      }
    }
  }
  return digits.reduce((prev, curr) => prev + curr, 0)
}

// function findNeighborDigit(
//   line: string,
//   index: number,
//   visited: Set<number> = new Set(),
//   result: number = 0
// ) {
//   if (index < 0 || index >= line.length || visited.has(index)) {
//     return
//   }
//   visited.add(index)
//   const curr = line[index]
//   if (isDigit(curr)) {
//     result = parseInt(curr)
//     for (const dxx of state1d) {
//       findNeighborDigit(line, index + dxx, visited, result)
//     }
//   }
// }

function collectDigits(text: string, index: number, direction: -1 | 1): string {
  let result = ""
  while (index >= 0 && index < text.length && isDigit(text[index])) {
    if (direction === -1) {
      result = text[index] + result
    } else {
      result = result + text[index]
    }
    index += direction
  }
  return result
}

function isDigit(char: string): boolean {
  //   return !isNaN(parseInt(char, 10))
  return /\d/.test(char)
}

function findDigits(text: string, index: number): string {
  if (!isDigit(text[index])) return ""

  let result = ""
  const rightPart = collectDigits(text, index + 1, +1)
  const leftPart = collectDigits(text, index - 1, -1)

  result = leftPart + text[index] + rightPart
  return result
}

function program(text: string) {
  return parseText(text)
}

function main() {
  console.table([
    program(getSample()),
    program(getInput())
  ])
}

main()
