import { readStandardInput } from "../utils"
import { digitsToNumber, getInput } from "./shared"

const sample = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const digitMap: Record<string, number> = {
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
}

function parseDigits(text: string) {
  const digits = Array<number>()
  for (const char of text) {
    if (char in digitMap) {
      digits.push(digitMap[char])
    }
  }
  return digits
}

function program(text: string) {
  let result = 0
  for (const line of text.split("\n")) {
    const digits = parseDigits(line)
    const number = digitsToNumber(digits)
    result += number
  }
  return result
}

readStandardInput((input) => {
  console.table([
    program(sample.trim()),
    program(input.trim())
  ])
})
