import { getLines } from '../utils.js'

const wordMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

const result = getLines('./input.txt').reduce((acc, line) => {
  const parsedLine = Object.keys(wordMap).reduce((parsedLine, word) => {
    return parsedLine.replace(
      new RegExp(word, 'g'),
      // Handle joined words, 'twone' -> '21'
      // Insert the number after the first letter to keep joined words for the next replace.
      (word) => word[0] + wordMap[word] + word.slice(1)
    )
  }, line)
  const digits = parsedLine.replace(/\D/g, '')
  return acc + parseInt(digits.at(0) + digits.at(-1))
}, 0)

console.log(result)
