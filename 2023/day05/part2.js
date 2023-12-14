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

function createSeedRanges (seedsLine) {
  return seedsLine.split(' ').slice(1).reduce((acc, seed, index, arr) => {
    if (index % 2) return acc
    acc.push([Number(seed), Number(seed) + Number(arr[index + 1])])
    return acc
  }, [])
}

function findMinLocation (maps, seedRanges, locationRangesSorted) {
  const mapsReversed = maps.toReversed()
  for (const locationRange of locationRangesSorted) {
    for (let dst = locationRange[0]; dst <= locationRange[1]; dst++) {
      const seed = mapsReversed.reduce((dst, map) => findSrc(map, dst), dst)
      if (
        seed &&
        seedRanges.find(([start, end]) => seed >= start && seed < end)
      ) return dst
    }
  }
}

function findSrc (map, dst) {
  const mapRow = map.find(({ dstStart, srcStart, rangeLength }) => dst >= dstStart && dst < dstStart + rangeLength)
  return mapRow ? mapRow.srcStart + dst - mapRow.dstStart : dst
}

const lines = getLines('./input.txt')
const seedRanges = createSeedRanges(lines[0])
const maps = createMaps(lines.slice(2).filter(Boolean))
const locationRangesSorted = maps.at(-1).map((mapRow) => [mapRow.dstStart, mapRow.dstStart + mapRow.rangeLength])
  .sort((a, b) => a[0] - b[0])
const result = findMinLocation(maps, seedRanges, locationRangesSorted)

console.log(result)
