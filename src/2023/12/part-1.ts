import { readStandardInput } from "../utils"

const sample = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

/*
???.### 1,1,3 - 1 arrangement
.??..??...?##. 1,1,3 - 4 arrangements //
?#?#?#?#?#?#?#? 1,3,1,6 - 1 arrangement
????.#...#... 4,1,1 - 1 arrangement //
????.######..#####. 1,6,5 - 4 arrangements //
?###???????? 3,2,1 - 10 arrangements

possible solution

#.#.### 1,1,3
.#...#....###. 1,1,3
.#.###.#.###### 1,3,1,6
####.#...#... 4,1,1
#....######..#####. 1,6,5
.###.##....# 3,2,1
*/

function parseData(text: string) {
  return text.split("\n").map(parseConditionsValues)
}

function parseConditionsValues(text: string) {
  const parts = text.split(" ")
  return [parseConditions(parts[0]), parseValues(parts[1])] as const
}

function parseValues(text: string) {
  return text.split(",").map((t) => parseInt(t, 10))
}

function parseConditions(text: string) {
  return text.split(".").filter((x) => x !== "")
}

function program(input: string) {
  const data = parseData(input)
  const results = []

  // check
  for (const [conditions, values] of data) {
    if (conditions.length === values.length) {
      const poss = Array<number>()
      for (let i = 0; i < conditions.length; i++) {
        poss.push(Math.floor(conditions[i].length / values[i]))
      }
      results.push(poss.reduce((prev, curr) => prev * curr, 1))
    } else {
      results.push("unknown")
    }
  }
  //   console.log(data)
  return results
}

console.log(program(sample))
readStandardInput((input) => console.log(program(input)))
