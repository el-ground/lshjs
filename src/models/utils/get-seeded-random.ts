const cyrb53Hash = (id: string, seed = 0): number => {
  let h1: number = 0xdeadbeef ^ seed
  let h2: number = 0x41c6ce57 ^ seed

  for (let i = 0; i < id.length; i++) {
    const ch: number = id.charCodeAt(i)

    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909)

  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

const mulberry32RNG = (hashId: number): number => {
  let workingHashId: number = hashId

  workingHashId = Math.imul(
    workingHashId ^ (workingHashId >>> 15),
    workingHashId | 1,
  )
  workingHashId ^=
    workingHashId +
    Math.imul(workingHashId ^ (workingHashId >>> 7), workingHashId | 61)

  return ((workingHashId ^ (workingHashId >>> 14)) >>> 0) / 4294967296
}

export const getSeededRandom = (id: string, seed: string): number => {
  const seedNumber: number = cyrb53Hash(seed)
  const hashId: number = cyrb53Hash(id, seedNumber)

  return mulberry32RNG(hashId)
}
