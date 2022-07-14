/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!src/**/protocols/*.ts'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  roots: ['<rootDir>/src'],

  testEnvironment: 'jest-environment-node',

  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
