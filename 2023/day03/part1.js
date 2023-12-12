import { getLines } from '../utils.js'

const lines = getLines('./input.txt')

let currNumber = ''
let isPartNumber = false
let result = 0
for (let row = 0; row < lines.length; row++) {
  if (isPartNumber) {
    result += parseInt(currNumber)
    isPartNumber = false
  }
  currNumber = ''
  for (let col = 0; col < lines[row].length; col++) {
    const char = lines[row][col]
    if (isNaN(char)) {
      if (isPartNumber) {
        result += parseInt(currNumber)
        isPartNumber = false
      }
      currNumber = ''
      continue
    }
    currNumber += char

    if (!isPartNumber) {
      isPartNumber = [
        [row - 1, col],
        [row - 1, col + 1],
        [row, col + 1],
        [row + 1, col + 1],
        [row + 1, col],
        [row + 1, col - 1],
        [row, col - 1],
        [row - 1, col - 1],
      ].some(([row, col]) => lines[row]?.[col] && /[^\.\d]/.test(lines[row]?.[col]))
    }
  }
}

console.log(result)
