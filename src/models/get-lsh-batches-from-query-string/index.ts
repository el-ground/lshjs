import { getShinglesFromQueryString } from '#src/models/get-lsh-batches-from-query-string/get-shingles-from-query-string'
import { getMinhashesFromShingles } from '#src/models/get-lsh-batches-from-query-string/get-minhashes-from-shingles'
import { getBatchesFromMinhashes } from '#src/models/get-lsh-batches-from-query-string/get-batches-from-minhashes'

export const getLshBatchesFromQueryString = (
  queryString: string,
  minhashSize: number,
  bandSize: number,
): string[] => {
  const shingles: string[] = getShinglesFromQueryString(queryString)
  const minhashes: number[] = getMinhashesFromShingles(shingles, minhashSize)
  const batches: string[] = getBatchesFromMinhashes(minhashes, bandSize)

  return batches
}
