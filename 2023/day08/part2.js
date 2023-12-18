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

function calculateSteps (directions, maps, start) {
  let steps = 0
  let currentKey = start
  while (!currentKey.endsWith('Z')) {
    currentKey = maps[currentKey][directions[steps % directions.length]]
    steps++
  }
  return steps
}

function gcd (a, b) {
  return a ? gcd(b % a, a) : b
}

function lcm (a, b) {
  return a * b / gcd(a, b)
}

const lines = getLines('./input.txt')
const directions = getDirections(lines)
const maps = getMaps(lines)
const result = Object.keys(maps)
  .filter((key) => key.endsWith('A'))
  .map((key) => calculateSteps(directions, maps, key))
  .reduce(lcm)

console.log(result)
