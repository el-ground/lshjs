export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  transformIgnorePatterns: [],
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['./scripts/jest.setup.ts'],
  moduleNameMapper: {
    '#src/(.*)$': '<rootDir>/src/$1',
    '#framework/(.*)$': '<rootDir>/src/framework/$1',
    '#util/(.*)$': '<rootDir>/src/util/$1',
    '#model/(.*)$': '<rootDir>/src/model/$1',
    '#methods/(.*)$': '<rootDir>/src/methods/$1',
    '#plugins/(.*)$': '<rootDir>/src/plugins/$1',
    '#temp/(.*)$': '<rootDir>/temp/$1',
    '#assets/(.*)$': '<rootDir>/assets/$1',
    '#data/(.*)$': '<rootDir>/data/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      useESM: true,
    },
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|js)'],
}
