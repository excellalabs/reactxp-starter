
export function chooseRandom<T> (list: T[]): T {
  const idx = Math.floor(Math.random() * list.length)
  return list[idx]
}
