import { readStandardInput } from "../utils"

const sample = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

function parseData(text: string) {
  const parts = text.split("\n")
  return parts.map(parseValues)
}

function parseValues(text: string) {
  const parts = text.split(" ")
  return parts.map((x) => parseInt(x, 10))
}

function program(text: string) {
  const data = parseData(text)

  // get history sequences
  const sequences = []
  for (const history of data) {
    const sequence = Array<Array<number>>()
    sequence.push(history)
    let allZeros = false
    while (allZeros === false) {
      sequence.push([])
      const next = sequence[sequence.length - 1]
      const prev = sequence[sequence.length - 2]
      for (let i = 0; i < prev.length - 1; i++) {
        next.push(prev[i + 1] - prev[i])
      }
      allZeros = next.every((element) => element === 0)
    }
    sequences.push(sequence)
  }

  // reverse
  for (const sequence of sequences) {
    for (const element of sequence) {
      element.reverse()
    }
  }

  // extrapolate and fill
  for (const sequence of sequences) {
    for (let i = sequence.length - 1; i >= 0; i--) {
      if (i === sequence.length - 1) {
        sequence[i].push(0)
      } else {
        const down = sequence[i + 1][sequence[i + 1].length - 1]
        const prev = sequence[i][sequence[i].length - 1]
        sequence[i].push(prev - down)
      }
    }
  }

  const result = sequences.map((x) => x[0][x[0].length - 1]).reduce((prev, curr) => prev + curr, 0)
  console.log(result)
}

program(sample)
readStandardInput(program)
