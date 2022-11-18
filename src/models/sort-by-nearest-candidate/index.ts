import hangul from 'hangul-js'
import { getNormalizedLevenshteinDistance } from '#src/models/sort-by-nearest-candidate/get-normalized-levenshtein-distance'

export const sortByNearestCandidate = (
  candidateLists: string[][],
  queryString: string,
): {
  candidate: string
  consonantDistance: number
}[] => {
  const cleanedQueryString: string = queryString.replace(
    /[\x00-\x2F|\x3A-\x40|\x5B-\x5E|\x60|\x7B-\x7F]/gm,
    '',
  )
  const candidatesCounter: { [candidate: string]: number } = {}

  // count number of times seen
  for (const candidateList of candidateLists) {
    for (const candidate of candidateList) {
      if (!(candidate in candidatesCounter)) {
        candidatesCounter[candidate] = 0
      }
      candidatesCounter[candidate] += 1
    }
  }

  // sort by number of times seen & levenshtein distance
  const disassembledQueryString: string = hangul
    .disassemble(cleanedQueryString)
    .join('')

  const candidatesDistanceSorter: {
    candidate: string
    consonantDistance: number
  }[] = []
  Object.keys(candidatesCounter).forEach((candidate) => {
    const disassembledCandidate: string = hangul.disassemble(candidate).join('')

    candidatesDistanceSorter.push({
      candidate,
      consonantDistance: getNormalizedLevenshteinDistance(
        disassembledCandidate,
        disassembledQueryString,
      ),
    })
  })
  candidatesDistanceSorter.sort((a, b) => {
    return a.consonantDistance - b.consonantDistance
  })

  return candidatesDistanceSorter
}
