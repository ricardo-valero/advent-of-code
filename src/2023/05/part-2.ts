import type { DataKey } from "./shared"
import { getInput, getSample, parseDataMaps, parseDataSeed } from "./shared"

function findPath(
  dataMaps: Array<readonly [DataKey, Array<Array<number>>]>,
  srcValue: number
) {
  for (const [_, value] of dataMaps) {
    srcValue = getDstValue(value, srcValue)
  }
  return srcValue
}

function getDstValue(
  map: Array<Array<number>>,
  srcValue: number
) {
  for (const [dstStart, srcStart, rangeLength] of map) {
    if (srcStart <= srcValue && srcValue <= srcStart + rangeLength) {
      return (srcValue - srcStart) + dstStart
    }
  }
  return srcValue
}

function program(text: string, index = 0) {
  const start = performance.now()
  const dataSeed = parseDataSeed(text)
  const dataMaps = parseDataMaps(text)
  const seeds = dataSeed[1].flat()
  let result: number | undefined = undefined
  const i = index * 2
  // for (let i = 0; i < seeds.length; i += 2) {
  const seedRangeStart = seeds[i]
  const seedRangeLength = seeds[i + 1]
  for (let seedValue = seedRangeStart; seedValue < seedRangeStart + seedRangeLength; seedValue++) {
    const path = findPath(dataMaps, seedValue)
    if (!result || result > path) {
      result = path
    }
  }
  // }
  const end = performance.now()
  const time = Math.floor((end - start) / 1000)
  console.table([index, time, result])
  return result
}

function main() {
  // program(getSample().trim())
  program(getInput().trim(), 0)
}

/*
node
0, 37, 529571705

bun
[ 0, 5, 529571705 ]
[ 1, 29, 386490336 ]
[ 2, 204, 692277668 ]
*/

main()
