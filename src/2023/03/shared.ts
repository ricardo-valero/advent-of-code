import { readFileSyncRelative } from "../utils.ts"

export const getInput = () => readFileSyncRelative(import.meta.url, "./input.txt")

export const getSample = () =>
  `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
