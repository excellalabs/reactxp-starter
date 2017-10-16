
import { chooseRandom } from 'helpers/random'

const names = [
  'World',
  'React',
  'Kevin',
  'Doguhan',
  'Stuart'
]

function wait (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const ONE_SECOND = 1000

export function getRandomName (): Promise<string> {
  return wait(ONE_SECOND / 3)
    .then(() => chooseRandom(names))
}
