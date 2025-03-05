import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/setupTestDB.ts'],
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  clearMocks: true,
};

export default config;
