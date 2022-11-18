export const getBatchesFromMinhashes = (
  minhashes: number[],
  bandSize: number,
): string[] => {
  const batches: string[] = []

  for (let index = 0; index < minhashes.length; index += bandSize) {
    // embed semantic information
    let batch: string = `1.0.0;${minhashes.length}:${bandSize};`

    // turn minhashes into a unique key
    for (const minhash of minhashes.slice(index, index + bandSize)) {
      const buffer = Buffer.alloc(4)

      for (let index = 0; index < 3; index++) {
        buffer[index] = Math.floor(minhash / Math.pow(256, 4 - index - 1))
      }
      buffer[3] = minhash % 256

      batch += buffer.toString('base64').replace(/==/gm, '')
    }

    batches.push(batch)
  }

  return batches
}
