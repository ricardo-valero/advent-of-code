import * as fs from "node:fs"
import * as path from "node:path"
import * as url from "node:url"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8")

const sample = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const digitMap: Record<number, Array<string>> = {
  0: ["0", "zero"],
  1: ["1", "one"],
  2: ["2", "two"],
  3: ["3", "three"],
  4: ["4", "four"],
  5: ["5", "five"],
  6: ["6", "six"],
  7: ["7", "seven"],
  8: ["8", "eight"],
  9: ["9", "nine"]
}

function joinInts(ints: Array<number>) {
  return parseInt(ints.join(""))
}

function solve(text: string) {
  const digits = Array<number>()
  let currentString = ""

  for (const char of text) {
    currentString += char
    for (const [key, value] of Object.entries(digitMap)) {
      if (value.some((v) => currentString.endsWith(v))) {
        digits.push(Number(key))
      }
    }
  }

  return digits
}

function program(text: string) {
  let result = 0
  // const table = []
  for (const line of text.split("\n")) {
    const match = solve(line.trim())
    const firstLast = [match[0], match[match.length - 1]]
    const number = joinInts(firstLast)
    // table.push(match)
    result += number
  }
  // console.table(table)
  return result
}

function main() {
  console.table(program(sample.trim()))
  console.table(program(input.trim()))
}

main()
