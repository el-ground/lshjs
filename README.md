# lshjs

Module which allows query strings to be placed into LSH batches, and compares candidates from a list of LSH candidates.

# Installing

Using npm:

```bash
$ npm install lshjs
```

Using yarn:

```bash
$ yarn add lshjs
```

# Methods

```
getLshBatchesFromQueryString(queryString: string, minhashSize: number, bandSize: number): string[]
```
Given a parameter of _queryString_, _minhashSize_ and _bandSize_, returns the respective LSH batch as a list of strings.

``
queryString
``
Label/document to be placed into LSH batches.

``
minhashSize
``
Number of permutations to be done when minhashing the shingles.

``
bandSize
``
Number of rows in a band when placing minhashed values into a LSH batch.

```
sortByNearestCandidate(candidateLists: string[][], queryString: string): {candidate: string, consonantDistance: number}[]
```
Given a parameter of _candidateLists_ and _queryString_, returns the candidates in the order of their levenshtein distance from the query string.

``
candidateLists
``
List of candidates acquired from accessing individual LSH batches.

``
queryString
``
Label/document to be compared with the candidates