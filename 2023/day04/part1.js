import { getLines } from '../utils.js'

const result = getLines('./input.txt').reduce((acc, line) => {
  const [winners, numbers] = line.split(': ')[1].split(' | ')
    .map((numbers) => numbers.split(' ').filter(Boolean))
  return acc + numbers.reduce((acc, number) => {
    if (winners.includes(number)) {
      if (!acc) acc += 1
      else acc *= 2
    }
    return acc
  }, 0)
}, 0)

console.log(result)

