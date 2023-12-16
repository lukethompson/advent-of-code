import { getLines } from '../utils.js'

function getLine (line) {
  return line.split(' ').slice(1).filter(Boolean).map(Number)
}

function winCount (time, record) {
  let count = 0
  for (let holdTime = 1; holdTime < time; holdTime++) {
    if ((time - holdTime) * holdTime > record) count++
  }
  return count
}

const lines = getLines('./input.txt')
const times = getLine(lines[0])
const records = getLine(lines[1])

const result = times.reduce((acc, time, i) => {
  return acc * winCount(time, records[i])
}, 1)

console.log(result)
