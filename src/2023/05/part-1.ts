import type { DataKey } from "./shared"
import { getInput, getSample, parseDataMaps, parseDataSeed } from "./shared"

// function buildPath(dataMaps: Array<readonly [DataKey, Array<Array<number>>]>, srcValue: number) {
//   const path = Array<number>()
//   path.push(srcValue)
//   for (const [_, value] of dataMaps) {
//     const curr = path[path.length - 1]
//     const match = findDstValue(value, curr)
//     path.push(match)
//   }
//   return path
// }

function findPath(dataMaps: Array<readonly [DataKey, Array<Array<number>>]>, srcValue: number) {
  for (const [_, value] of dataMaps) {
    srcValue = findDstValue(value, srcValue)
  }
  return srcValue
}

function findDstValue(map: Array<Array<number>>, curr: number) {
  for (const [dstStart, srcStart, rangeLength] of map) {
    if (srcStart <= curr && curr <= srcStart + rangeLength) {
      return (curr - srcStart) + dstStart
    }
  }
  return curr
}

function program(text: string) {
  const dataSeed = parseDataSeed(text)
  const dataMaps = parseDataMaps(text)
  const seeds = dataSeed[1].flat()
  const result = new Array<number>()
  for (const seed of seeds) {
    const path = findPath(dataMaps, seed)
    result.push(path)
  }
  return result.sort((a, b) => a - b)[0]
}

function main() {
  console.table([
    program(getSample().trim()),
    program(getInput().trim())
  ])
}

main()
