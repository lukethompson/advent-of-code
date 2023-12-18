import { getLines } from '../utils.js'

function getDirections (lines) {
  return lines[0].split('')
}

function getMaps (lines) {
  return lines.slice(2).reduce((acc, line) => {
    const [key, values] = line.split(' = ')
    const [L, R] = values.replace(/[\(\)]/g, '').split(', ')
    acc[key] = { L, R }
    return acc
  }, {})
}

function calculateSteps (lines) {
  const directions = getDirections(lines)
  const maps = getMaps(lines)
  let steps = 0
  let currentKey = 'AAA'
  while (currentKey !== 'ZZZ') {
    currentKey = maps[currentKey][directions[steps % directions.length]]
    steps++
  }
  return steps
}

const lines = getLines('./input.txt')
const result = calculateSteps(lines)

console.log(result)
