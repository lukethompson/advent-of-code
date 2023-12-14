import { getLines } from '../utils.js'

function createMaps (mapLines) {
  const maps = []
  for (const line of mapLines) {
    if (line.endsWith(' map:')) {
      maps.push([])
    } else {
      const [dstStart, srcStart, rangeLength] = line.split(' ').map(Number)
      maps.at(-1).push({ dstStart, srcStart, rangeLength })
    }
  }
  return maps
}

function findDst (map, src) {
  const mapRow = map.find(({ dstStart, srcStart, rangeLength }) => src >= srcStart && src < srcStart + rangeLength)
  return mapRow ? mapRow.dstStart + src - mapRow.srcStart : src
}

const lines = getLines('./input.txt')
const seeds = lines[0].split(' ').slice(1).map(Number)
const maps = createMaps(lines.slice(2).filter(Boolean))
const result = seeds.reduce((minDst, seed) => {
  const dst = maps.reduce((src, map) => findDst(map, src), seed)
  return Math.min(minDst, dst)
}, Infinity)

console.log(result)
