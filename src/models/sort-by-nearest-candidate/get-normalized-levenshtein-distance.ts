export const getNormalizedLevenshteinDistance = (
  queryStringA: string,
  queryStringB: string,
): number => {
  // if either queryStringA or queryStringB is empty
  if (!queryStringA) return queryStringB.length
  if (!queryStringB) return queryStringA.length

  const matrix: number[][] = [...Array(queryStringB.length + 1)].map((x) =>
    Array(queryStringA.length + 1).fill(0),
  )

  for (let rowIndex = 0; rowIndex < queryStringB.length + 1; rowIndex++) {
    for (let colIndex = 0; colIndex < queryStringA.length + 1; colIndex++) {
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
        queryStringB.charAt(rowIndex - 1) == queryStringA.charAt(colIndex - 1)
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
    matrix[queryStringB.length][queryStringA.length] /
    Math.max(queryStringA.length, queryStringB.length)
  )
}
