import hangul from 'hangul-js'

export const getShinglesFromQueryString = (queryString: string): string[] => {
  const shingledTextDictionary: { [shingled: string]: null } = {}
  const cleanedQueryString: string = queryString.replace(
    /[\x00-\x2F|\x3A-\x40|\x5B-\x5E|\x60|\x7B-\x7F]/gm,
    '',
  )

  // shingle character bigrams
  for (
    let fromIndex = 0;
    fromIndex <= cleanedQueryString.length - 2;
    fromIndex++
  ) {
    const shingled: string = cleanedQueryString.slice(fromIndex, fromIndex + 2)

    if (shingled.length !== 0) {
      shingledTextDictionary[shingled] = null
    }
  }

  // edge case: when text is single character long
  if (cleanedQueryString.length === 1) {
    shingledTextDictionary[cleanedQueryString] = null
  }

  // shingle initial consonant bigrams
  for (
    let fromIndex = 0;
    fromIndex <= cleanedQueryString.length - 2;
    fromIndex++
  ) {
    const disassembled: string[] = hangul.disassemble(
      cleanedQueryString.slice(fromIndex, fromIndex + 2),
    )

    const shingledArray: string[] = []
    for (let index = 0; index < disassembled.length - 1; index++) {
      const current = disassembled[index]
      const next = disassembled[index + 1]
      if (hangul.isConsonant(current) && hangul.isVowel(next)) {
        shingledArray.push(current)
      }
    }

    const shingled: string = shingledArray.join('')
    if (shingled.length == 2) {
      shingledTextDictionary[shingled] = null
    }
  }

  const shingledText: string[] = Object.keys(shingledTextDictionary)
  return shingledText
}
