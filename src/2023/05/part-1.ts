import { getInput, getSample, parseData } from "./shared"

function program(text: string) {
  const data = parseData(text)
  const [[_, seeds]] = data
  const result = []
  for (const seed of seeds.flat()) {
    const path = Array<number>()
    path.push(seed)
    for (const [key, value] of data) {
      if (key.destination) {
        let newNumber = undefined
        const curr = path[path.length - 1]
        for (const [dstRangeStart, srcRangeStart, rangeLength] of value) {
          if (
            srcRangeStart <= curr
            && curr <= srcRangeStart + rangeLength
          ) {
            newNumber = (curr - srcRangeStart) + dstRangeStart
            break
          }
        }
        if (newNumber) {
          path.push(newNumber)
        } else {
          path.push(curr)
        }
      }
    }
    result.push(path)
  }

  const a = result.map((x) => x[x.length - 1]).sort((a, b) => a - b)

  return a[0]
}

function main() {
  console.table([
    program(getSample().trim()),
    program(getInput().trim())
  ])
}

main()