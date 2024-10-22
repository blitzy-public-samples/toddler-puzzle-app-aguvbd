/**
 * Jest Configuration for the Web Application
 *
 * This configuration file sets up Jest to properly handle testing of JavaScript and TypeScript files,
 * including setup files and environment settings.
 *
 * Requirements Addressed:
 * - Testing Framework Configuration
 *   - Location: Technical Specification/Development Practices/Testing
 *   - Description: Ensure that Jest is properly configured to support testing of JavaScript and TypeScript files, including setup files and environment settings.
 */

/**
 * External Dependencies:
 * - jest (version 27.0.0): Provides the core testing framework for JavaScript and TypeScript files.
 * - ts-jest (version 27.0.0): Enables Jest to transpile TypeScript files using the TypeScript compiler.
 * - babel-jest (version 27.0.0): Allows Jest to transpile JavaScript files using Babel.
 *
 * Internal Dependencies:
 * - tsconfig.json: Provides TypeScript configuration for Jest to handle TypeScript files.
 */

module.exports = {
  // Use 'ts-jest' preset to handle TypeScript files.
  preset: 'ts-jest',

  // Specify the test environment to simulate a Node.js environment.
  testEnvironment: 'node',

  // Define file extensions Jest will process.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Configure Jest to use transformers for TypeScript and JavaScript files.
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transpile TypeScript files using ts-jest.
    '^.+\\.(js|jsx)$': 'babel-jest', // Transpile JavaScript files using babel-jest.
  },

  // Setup files that will be run after the test environment has been set up.
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Initialize testing utilities.

  // Module name mappings to support module aliases.
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1', // Map '@components/*' to 'src/components/*'.
    '^@screens/(.*)$': '<rootDir>/src/screens/$1', // Map '@screens/*' to 'src/screens/*'.
    '^@styles/(.*)$': '<rootDir>/src/styles/$1', // Map '@styles/*' to 'src/styles/*'.
  },

  // Patterns to exclude from testing.
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore third-party modules and build outputs.

  // Directory where Jest should output its coverage files.
  coverageDirectory: '<rootDir>/coverage/', // Store coverage reports in the 'coverage' directory.

  // Specify glob patterns of files for which coverage information should be collected.
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}', // Include all source files.
    '!src/**/*.d.ts', // Exclude TypeScript declaration files.
  ],
};