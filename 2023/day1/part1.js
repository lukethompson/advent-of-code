import { getLines } from '../utils.js'

const result = getLines('./input.txt').reduce((acc, line) => {
  const digits = line.replace(/\D/g, '')
  return acc + parseInt(digits.at(0) + digits.at(-1))
}, 0)

console.log(result)
