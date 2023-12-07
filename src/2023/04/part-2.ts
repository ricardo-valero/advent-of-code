import { getInput, getSample, parseData } from "./shared"

function getCount(data: ReturnType<typeof parseData>) {
  const quantity = new Array<number>(data.length).fill(1)
  let result = 0
  for (let i = 0; i < data.length; i++) {
    const card = data[i]
    const [winning, you] = card[1]
    const matches = you.filter((x) => winning.includes(x)).length
    for (let j = 1; j <= matches && (i + j) < quantity.length; j++) {
      quantity[i + j] += 1 * quantity[i]
    }
    result += quantity[i]
  }
  return result
}

function program(text: string) {
  const data = parseData(text)
  const count = getCount(data)
  return count
}

function main() {
  console.table([
    program(getSample().trim()),
    program(getInput().trim())
  ])
}

main()
