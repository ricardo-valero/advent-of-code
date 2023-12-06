import { digitsToNumber, getInput } from "./shared"

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

function parseDigits(text: string) {
  const digits = Array<number>()
  let currentString = ""
  for (const char of text) {
    currentString += char
    for (const [key, values] of Object.entries(digitMap)) {
      if (values.some((value) => currentString.endsWith(value))) {
        digits.push(Number(key))
      }
    }
  }
  return digits
}

function program(text: string) {
  let result = 0
  for (const line of text.split("\n")) {
    const digits = parseDigits(line.trim())
    const number = digitsToNumber(digits)
    result += number
  }
  return result
}

function main() {
  console.table([
    program(sample.trim()),
    program(getInput().trim())
  ])
}

main()
