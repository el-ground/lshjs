import { getSeededRandom } from '#src/models/utils/get-seeded-random'

//  https://github.com/duhaime/minhash/blob/master/src/minhash.js
const maximumPrime: number = 4294967311
const maximumHash: number = Math.pow(2, 32) - 1

const setupPermutations = (
  permutationCount: number,
  seed: string,
): number[] => {
  const usedIndex: { [index: number]: null } = {}
  const permutation: number[] = []

  for (
    let permutationIndex = 0;
    permutationIndex < permutationCount;
    permutationIndex++
  ) {
    let whileLoopSeed: number = 0
    let index: number = Math.floor(
      getSeededRandom(`${whileLoopSeed++}`, seed) * maximumHash,
    )

    while (index in usedIndex) {
      index = Math.floor(
        getSeededRandom(`${whileLoopSeed++}`, seed) * maximumHash,
      )
    }
    permutation.push(index)
    usedIndex[index] = null
  }

  return permutation
}

const permutationA: number[] = setupPermutations(200, 'permutationA')
const permutationB: number[] = setupPermutations(200, 'permutationB')

const hashString = (queryString: string): number => {
  let hash: number = 0

  // convert string to 32 bit unsigned integer
  for (let index = 0; index < queryString.length; index++) {
    const characterCode: number = queryString.charCodeAt(index)
    hash = (hash << 5) - hash + characterCode
    hash = hash & hash // 32bit int
  }
  return hash + maximumHash // 32 bit uint
}

export const getMinhashesFromShingles = (
  shingles: string[],
  minhashSize: number,
): number[] => {
  const minhashedShingles: number[] = []

  for (let index = 0; index < minhashSize; index++) {
    let minhashed: number = maximumHash
    for (const shingle of shingles) {
      const hashed: number =
        (permutationA[index] * hashString(shingle) + permutationB[index]) %
        maximumPrime

      if (hashed < minhashed) {
        minhashed = hashed
      }
    }
    minhashedShingles.push(minhashed)
  }

  return minhashedShingles
}
