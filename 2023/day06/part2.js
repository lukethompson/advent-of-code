import { getLines } from '../utils.js'

function getLine (line) {
  return Number(line.split(':')[1].replace(/\W/g, ''))
}

function winCount (raceTime, record) {
  let count = 0
  for (let holdTime = 1; holdTime < raceTime; holdTime++) {
    if ((raceTime - holdTime) * holdTime > record) count++
  }
  return count
}

const lines = getLines('./input.txt')
const time = getLine(lines[0])
const record = getLine(lines[1])

const result = winCount(time, record)

console.log(result)
