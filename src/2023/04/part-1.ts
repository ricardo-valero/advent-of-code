import { getInput, getSample, parseData } from "./shared"

function getMatches(data: ReturnType<typeof parseData>) {
  const result = []
  for (const card of data) {
    const [winning, you] = card[1]
    result.push(you.filter((x) => winning.includes(x)))
  }
  return result
}

function program(text: string) {
  const data = parseData(text)
  const matches = getMatches(data)
  const points = matches.filter((x) => x.length > 0).map((x) => 2 ** (x.length - 1))
  const total = points.reduce((prev, curr) => prev + curr, 0)
  return total
}

function main() {
  console.table([
    program(getSample().trim()),
    program(getInput().trim())
  ])
}

main()
