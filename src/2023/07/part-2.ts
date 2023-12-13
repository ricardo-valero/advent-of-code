import { ReadonlyArray, ReadonlyRecord } from "effect"
import { readStandardInput } from "../utils"

const sample = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

function parseData(text: string) {
  const parts = text.split("\n")
  return parts.map(parseKeyValues)
}

function parseKeyValues(text: string) {
  const parts = text.split(" ")
  return [parts[0], parseInt(parts[1])] as const
}

const labels = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"] as const
const types = ["5", "41", "32", "311", "221", "2111", "11111"] as const

const sortByLabelRank = (ranks: ReadonlyArray<string>) => (a: string, b: string) => {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const indexA = ranks.indexOf(a[i])
    const indexB = ranks.indexOf(b[i])
    if (indexA !== indexB) {
      return indexA - indexB
    }
  }
  return a.length - b.length
}

function sortByTypeRank(ranks: ReadonlyArray<string>, a: string, b: string) {
  const indexA = ranks.indexOf(a)
  const indexB = ranks.indexOf(b)
  return indexA - indexB
}

function getType(labels: ReadonlyArray<string>, hand: string): string {
  const jChar = labels[labels.length - 1]
  const jCount = countChars(hand, jChar)
  const result = labels
    .filter((x) => x !== jChar)
    .map((label) => countChars(hand, label))
    .filter((c) => c !== 0)
    .sort((a, b) => b - a)
  // WHAT IF "JJJJJ"
  if (!result[0]) result.push(0)
  result[0] += jCount
  return result.join("")
}

function getTypeRank(ranks: ReadonlyArray<string>, type: string): number {
  return ranks.indexOf(type)
}

function countChars(input: string, char: string): number {
  return input.split(char).length - 1
}

function program(text: string) {
  const data = parseData(text)

  const result = data.map(([hand, bid]) => {
    const type = getType(labels, hand)
    const typeRank = getTypeRank(types, type)
    if (typeRank === -1) console.log({ hand, bid })
    return ({ hand, bid, typeRank })
  })
  const groupedResult = ReadonlyArray.groupBy(result, (item) => `${item.typeRank}`)

  const sortedResult = ReadonlyRecord.map(
    groupedResult,
    (x) => x.sort((a, b) => sortByLabelRank(labels)(a.hand, b.hand))
  )

  const scores = ReadonlyRecord.toEntries(sortedResult)
  const result2 = scores
    .flatMap((x) => x[1].map((y) => y.bid))
    .reverse()
    .map((x, i) => (x * (i + 1)))
    .reduce((prev, curr) => prev + curr, 0)
  console.log(result2)
}

program(sample)
readStandardInput((input) => program(input))
