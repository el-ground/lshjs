import hangul from 'hangul-js'

export const getNormalizedLevenshteinDistance = (
  queryStringA: string,
  queryStringB: string,
): number => {
  // if either queryStringA or queryStringB is empty
  if (!queryStringA) return queryStringB.length
  if (!queryStringB) return queryStringA.length

  const cleanedQueryStringA: string = queryStringA.replace(
    /[\x00-\x2F|\x3A-\x40|\x5B-\x5E|\x60|\x7B-\x7F]/gm,
    '',
  )
  const cleanedQueryStringB: string = queryStringB.replace(
    /[\x00-\x2F|\x3A-\x40|\x5B-\x5E|\x60|\x7B-\x7F]/gm,
    '',
  )

  const disassembledQueryStringA: string = hangul
    .disassemble(cleanedQueryStringA)
    .join('')
  const disassembledQueryStringB: string = hangul
    .disassemble(cleanedQueryStringB)
    .join('')

  const matrix: number[][] = [
    ...Array(disassembledQueryStringB.length + 1),
  ].map((x) => Array(disassembledQueryStringA.length + 1).fill(0))

  for (
    let rowIndex = 0;
    rowIndex < disassembledQueryStringB.length + 1;
    rowIndex++
  ) {
    for (
      let colIndex = 0;
      colIndex < disassembledQueryStringA.length + 1;
      colIndex++
    ) {
      // initialize levenshtein matrix such that the top-most row is in ascending order (0,1,2,3,...)
      if (rowIndex === 0) {
        matrix[0][colIndex] = colIndex
        continue
      }

      // initialize levenshtein matrix such that the left-most column is in ascending order (0,1,2,3,...)
      if (colIndex === 0) {
        matrix[rowIndex][0] = rowIndex
        continue
      }

      // increment cell values based on neighboring cells
      // calculates least amount of steps(addition, deletion, substitution) required to change from one substring to another
      matrix[rowIndex][colIndex] =
        disassembledQueryStringB.charAt(rowIndex - 1) ==
        disassembledQueryStringA.charAt(colIndex - 1)
          ? matrix[rowIndex - 1][colIndex - 1]
          : Math.min(
              matrix[rowIndex - 1][colIndex - 1],
              matrix[rowIndex - 1][colIndex],
              matrix[rowIndex][colIndex - 1],
            ) + 1
    }
  }

  // return normalized levenshtein distance
  return (
    matrix[disassembledQueryStringB.length][disassembledQueryStringA.length] /
    Math.max(disassembledQueryStringA.length, disassembledQueryStringB.length)
  )
}
