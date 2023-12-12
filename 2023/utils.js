import fs from 'node:fs'

export function getInput (filePath) {
  return fs.readFileSync(filePath, 'utf8').trim()
}

export function getLines (filePath) {
  return getInput(filePath).split('\n')
}
