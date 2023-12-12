import { getLines } from '../utils.js'

const result = getLines('./input.txt').reduce((acc, line) => {
  const mins = line.split(': ')[1].split('; ').reduce((mins, game) => {
    game.split(', ').forEach((cubesDef) => {
      const [count, color] = cubesDef.split(' ')
      mins[color] = Math.max(mins[color], count)
    })
    return mins
  },{ red: 0, green: 0, blue: 0 })

  return acc + mins.red * mins.green * mins.blue
}, 0)

console.log(result)
