import { getLines } from '../utils.js'

function addGearCoordsPart (gearCoordsMap, gearCoords, number) {
  const key = gearCoords.join(',')
  if (gearCoordsMap[gearCoords]) gearCoordsMap[gearCoords].push(parseInt(number))
  else gearCoordsMap[gearCoords] = [parseInt(number)]
}

const lines = getLines('./input.txt')

let currNumber = ''
let currGearCoords = undefined
const gearCoordsMap = {}
for (let row = 0; row < lines.length; row++) {
  if (currGearCoords) {
    addGearCoordsPart(gearCoordsMap, currGearCoords, currNumber)
    currGearCoords = undefined
  }
  currNumber = ''
  for (let col = 0; col < lines[row].length; col++) {
    const char = lines[row][col]
    if (isNaN(char)) {
      if (currGearCoords) {
        addGearCoordsPart(gearCoordsMap, currGearCoords, currNumber)
        currGearCoords = undefined
      }
      currNumber = ''
      continue
    }
    currNumber += char

    if (!currGearCoords) {
      currGearCoords = [
        [row - 1, col],
        [row - 1, col + 1],
        [row, col + 1],
        [row + 1, col + 1],
        [row + 1, col],
        [row + 1, col - 1],
        [row, col - 1],
        [row - 1, col - 1],
      ].find(([row, col]) => lines[row]?.[col] === '*')
    }
  }
}

const result = Object.values(gearCoordsMap).reduce((result, partNumbers) => {
  if (partNumbers.length === 2) {
    result += partNumbers[0] * partNumbers[1]
  }
  return result
}, 0)

console.log(result)
