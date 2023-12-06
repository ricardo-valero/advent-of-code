import { readFileSyncRelative } from "../utils"

export const getInput = () => readFileSyncRelative(import.meta.url, "./input.txt")

export function digitsToNumber(digits: Array<number>) {
  const firstLast = [digits[0], digits[digits.length - 1]]
  const number = parseInt(firstLast.join(""))
  return number
}
