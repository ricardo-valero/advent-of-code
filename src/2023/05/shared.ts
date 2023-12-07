import { readFileSyncRelative } from "../utils.ts"

export const getInput = () => readFileSyncRelative(import.meta.url, "./input.txt")

export const getSample = () =>
  `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

type Key = {
  source: string
  destination: string | "null"
}

export function parseData(text: string) {
  const regex = /([\w\- ]+):\s*([\s\d]+)/g
  const matches = [...text.matchAll(regex)]
  const data = matches.map((x) => parseKeyValues(x[0]))
  return data
  // return new Map(data) // a map won't let me search keys by value
}

function parseKeyValues(text: string) {
  const part = text.split(":")
  return [parseKey(part[0].trim()), parseValues(part[1].trim())] as const
}

function parseKey(text: string): Key {
  const regex = /(?:(\w+)-\w+-(\w+)|(\w+))/g
  const matches = [...text.matchAll(regex)]
  const x = matches.flat()
  return { source: x[3] ?? x[1], destination: x[2] } as const
}

function parseValues(text: string) {
  const part = text.split("\n")
  return part.map((x) => parseNumbers(x.trim()))
}

function parseNumbers(text: string) {
  const numbers = text.match(new RegExp(/\d+/, "g"))
  return numbers ? numbers.map((x) => parseInt(x, 10)) : []
}
