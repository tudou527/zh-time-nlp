import { createConfig } from '@umijs/test';

const defaultConfig = createConfig();

export default {
  ...defaultConfig,
  testTimeout: 600000,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    ...defaultConfig.moduleNameMapper,
    '@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/cli/*.ts'],
  coverageReporters: ['text', 'cobertura', 'lcov'],
  modulePathIgnorePatterns: [
    '<rootDir>/test/fixture',
  ],
};
