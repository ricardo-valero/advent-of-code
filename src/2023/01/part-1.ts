import * as fs from "node:fs"
import * as path from "node:path"
import * as url from "node:url"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8")

const sample = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const integerMap = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9
} as const

function matchWithIntegerMap(text: string) {
  const numbers = Array<number>()
  for (let j = 0; j < text.length; j++) {
    const char = text[j]
    if (char in integerMap) {
      numbers.push(integerMap[char as keyof typeof integerMap])
    }
  }
  return numbers
}

function joinInts(ints: Array<number>) {
  return parseInt(ints.join(""))
}

function main(input: string) {
  const lines = input.split("\n")
  let result = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const match = matchWithIntegerMap(line)
    const firstLast = [match[0], match[match.length - 1]]
    const number = joinInts(firstLast)
    result += number
  }
  return result
}

console.table(main(sample))
console.table(main(input))
