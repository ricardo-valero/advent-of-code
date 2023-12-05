import { readFileSyncRelative } from "../utils.ts"

const sample = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

const KEY = "Game" as const
const COLORS = ["red", "green", "blue"] as const

type Color = {
  red: number
  green: number
  blue: number
}

const configuration: Readonly<Color> = {
  red: 12,
  green: 13,
  blue: 14
}

function solve(text: string) {
  const result: [number, Array<Color>] = [0, []]
  const [keyPart, values] = text.split(":")
  const key = parseInt(keyPart.trim().split(KEY)[1].trim())
  result[0] = key
  for (const set of values.trim().split(/[;]/)) {
    const r = { red: 0, green: 0, blue: 0 }
    for (const cube of set.trim().split(/[,]/)) {
      for (const color of COLORS) {
        if (cube.includes(color)) {
          const q = cube.split(color)[0].trim()
          r[color] += Number(q)
        }
      }
    }
    result[1].push(r)
  }
  return result
}

function validate(sets: Array<Color>, configuration: Color) {
  for (const color of COLORS) {
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
    const a = solve(line.trim())
    const b = validate(a[1], configuration)
    if (b === true) {
      result += a[0]
    }
  }
  return result
}

function main() {
  console.table(program(sample))
  const input = readFileSyncRelative(import.meta.url, "./input.txt")
  console.table(program(input))
}

main()
