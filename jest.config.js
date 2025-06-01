// jest.config.js
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const testMatch = ['**/__tests__/**/*.test.ts'];
export const moduleFileExtensions = ['ts', 'js', 'json'];
export const transform = {
    '^.+\\.ts$': 'ts-jest',
};
export const clearMocks = true;
