import type { Set } from "./shared"
import { COLOR_KEYS, getInput, getSample, parseKeyValues } from "./shared"

const configuration: Readonly<Set> = {
  red: 12,
  green: 13,
  blue: 14
}

function validate(sets: Array<Set>, configuration: Set) {
  for (const color of COLOR_KEYS) {
    for (const set of sets) {
      if (set[color] > configuration[color]) {
        return false
      }
    }
  }
  return true
}

function program(text: string) {
  let result = 0
  for (const line of text.split("\n")) {
    const a = parseKeyValues(line.trim())
    const b = validate(a[1], configuration)
    if (b === true) {
      result += a[0]
    }
  }
  return result
}

function main() {
  console.table([
    program(getSample().trim()),
    program(getInput().trim())
  ])
}

main()
