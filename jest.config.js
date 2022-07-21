/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!src/**/protocols/*.ts',
    '!src/**/models/*.ts',
    '!src/**/**/protocols.ts',
  ],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  roots: ['<rootDir>/src'],

  testEnvironment: 'jest-environment-node',

  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};

module.exports = config;
