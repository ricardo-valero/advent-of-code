import { readFileSyncRelative } from "../utils.ts"

export const getSample = () =>
  `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

export const getInput = () => readFileSyncRelative(import.meta.url, "./input.txt")

export const KEY = "Game" as const
export const COLORS = ["red", "green", "blue"] as const

export type Color = {
  red: number
  green: number
  blue: number
}

export function parseKeyValues(text: string) {
  const [keyText, ...valuesText] = text.split(":")
  return [parseKey(keyText.trim()), parseValues(valuesText.join("").trim())] as const
}

function parseKey(text: string) {
  return parseInt(text.split(KEY)[1].trim())
}

function parseValues(text: string) {
  const result: Array<Color> = []
  for (const set of text.split(/[;]/)) {
    const r = { red: 0, green: 0, blue: 0 }
    for (const cube of set.trim().split(/[,]/)) {
      for (const color of COLORS) {
        if (cube.includes(color)) {
          const q = cube.split(color)[0].trim()
          r[color] += Number(q)
        }
      }
    }
    result.push(r)
  }
  return result
}
