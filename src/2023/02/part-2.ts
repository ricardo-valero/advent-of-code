import type { Color } from "./shared"
import { COLORS, getInput, getSample, parseKeyValues } from "./shared"

function findMax(sets: Array<Color>) {
  const max: Color = { red: 0, green: 0, blue: 0 }
  for (const set of sets) {
    for (const color of COLORS) {
      if (set[color] > max[color]) {
        max[color] = set[color]
      }
    }
  }
  return max
}

function program(text: string) {
  let result = 0
  for (const line of text.split("\n")) {
    const a = parseKeyValues(line.trim())
    const b = findMax(a[1])
    const c = b.red * b.green * b.blue
    result += c
  }
  return result
}

function main() {
  console.table(program(getSample()))
  console.table(program(getInput()))
}

main()
