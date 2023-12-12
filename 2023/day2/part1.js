import { getLines } from '../utils.js'

const maxCubesMap = {
  red: 12,
  green: 13,
  blue: 14,
}

const result = getLines('./input.txt').reduce((acc, line) => {
  const [gameId, games] = line.split(': ')

  const isGameValid = games.split('; ').every((game) => {
    return game.split(', ').every((cubesDef) => {
      const [count, color] = cubesDef.split(' ')
      return count <= maxCubesMap[color]
    })
  })
  return isGameValid
    ? acc + parseInt(gameId.split(' ')[1])
    : acc
}, 0)

console.log(result)
