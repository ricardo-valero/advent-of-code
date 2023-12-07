import { readFileSyncRelative } from "../utils.ts"

export const getInput = () => readFileSyncRelative(import.meta.url, "./input.txt")

export const getSample = () =>
  `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

export function parseData(text: string) {
  const part = text.split("\n")
  return part.map(parseKeyValues)
}

function parseKeyValues(text: string) {
  const part = text.split(":")
  return [parseKey(part[0].trim()), parseValues(part[1].trim())] as const
}

function parseKey(text: string) {
  return parseInt(text.replace("Card", "").trim(), 10)
}

function parseValues(text: string) {
  const part = text.split("|")
  return [parseNumbers(part[0].trim()), parseNumbers(part[1].trim())] as const
}

function parseNumbers(text: string) {
  const numbers = text.match(new RegExp(/\d+/, "g"))
  return numbers ? numbers.map((x) => parseInt(x, 10)) : []
}
