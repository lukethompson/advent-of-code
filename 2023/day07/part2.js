import { getLines } from '../utils.js'

const letterCardStrengths = {
  'A': 13,
  'K': 12,
  'Q': 11,
  'T': 10,
  'J': 1,
}

function addWinnings (winnings, game, index) {
  return winnings + (game.bid * (index + 1))
}

function compareGames (a, b) {
  if (a.type > b.type) return 1
  if (a.type < b.type) return -1
  for (let i = 0; i < a.hand.length; i++) {
    const aCardStrength = letterCardStrengths[a.hand[i]] || Number(a.hand[i])
    const bCardStrength = letterCardStrengths[b.hand[i]] || Number(b.hand[i])
    if (aCardStrength > bCardStrength) return 1
    if (aCardStrength < bCardStrength) return -1
  }
}

function countCards (cards) {
  const jokerCount = cards.filter((c) => c === 'J').length
  const counts = []
  let remainingCards = cards.filter((c) => c !== 'J')
  while (remainingCards.length) {
    const card = remainingCards[0]
    const count = remainingCards.filter((c) => c === card).length
    counts.push(count)
    remainingCards = remainingCards.filter((c) => c !== card)
  }
  counts.sort((a, b) => b - a)
  counts[0] = (counts[0] || 0) + jokerCount
  return counts
}

function getHandType (hand) {
  const counts = countCards(hand)
  if (counts[0] === 5) return 7
  if (counts[0] === 4) return 6
  if (counts[0] === 3 && counts[1] === 2) return 5
  if (counts[0] === 3) return 4
  if (counts[0] === 2 && counts[1] === 2) return 3
  if (counts[0] === 2) return 2
  return 1
}

function calculateWinnings (lines) {
  return lines.map(createGame)
    .sort(compareGames)
    .reduce(addWinnings, 0)
}

function createGame (line) {
  const [handLine, bid] = line.split(' ')
  const hand = handLine.split('')
  return { hand, bid, type: getHandType(hand) }
}

const lines = getLines('./input.txt')
const result = calculateWinnings(lines)

console.log(result)
