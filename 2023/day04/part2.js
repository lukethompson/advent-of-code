import { getLines } from '../utils.js'

const result = getLines('./input.txt').reduce((acc, line, index, arr) => {
  acc[index] = acc[index] ? acc[index] + 1 : 1
  const [winners, numbers] = line.split(': ')[1].split(' | ')
    .map((numbers) => numbers.split(' ').filter(Boolean))
  const cardResult = numbers.reduce((acc, number) => {
    if (winners.includes(number)) acc += 1
    return acc
  }, 0)
  Array.from({ length: cardResult }).forEach((_, i) => {
    const j = index + i + 1
    if (j > arr.length) return
    const newCards = 1 * acc[index]
    acc[j] = acc[j] ? acc[j] + newCards : newCards
  })
  return acc
}, []).reduce((acc, count) => acc + count, 0)

console.log(result)
