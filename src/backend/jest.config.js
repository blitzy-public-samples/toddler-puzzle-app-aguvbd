/**
 * Jest configuration for the backend services of the Toddler Puzzle App.
 *
 * This configuration sets up the testing environment, specifies test file patterns,
 * and integrates with TypeScript using ts-jest to ensure comprehensive and efficient testing.
 *
 * Requirements Addressed:
 * - Testing Framework Configuration
 *   - Location: Technical Requirements/Feature 11: Performance Optimization/TR-11.6
 *   - Description: "Conduct automated and manual testing to ensure the quality and stability of each update before release."
 *   - This configuration is essential for setting up automated testing, enabling us to run unit and integration tests on the backend codebase, thus maintaining quality and stability per TR-11.6.
 *
 * Dependencies:
 * - jest (version latest)
 *   - Provides a testing framework for running unit and integration tests.
 * - ts-jest
 *   - A Jest transformer for TypeScript, allowing TypeScript files to be tested.
 */

module.exports = {
  // Specifies the test environment that will be used for testing.
  // Using 'node' since we are testing a Node.js backend application.
  testEnvironment: 'node',

  // Transforms TypeScript files using ts-jest before testing.
  transform: {
    '^.+\\.ts$': 'ts-jest', // ts-jest helps Jest understand TypeScript.
    // ts-jest version specified in package.json as a dependency.
  },

  // An array of file extensions your modules use.
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // The glob patterns Jest uses to detect test files.
  testMatch: ['**/tests/**/*.test.ts'],
  // This pattern matches all .test.ts files in any subdirectory under tests.

  // A list of paths to modules that run some code to configure or set up
  // the testing framework before each test.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Allows for additional configurations and global variables.

  // The directory where Jest should output its coverage files.
  coverageDirectory: '<rootDir>/coverage',
  // Ensures coverage reports are generated to monitor code coverage.

  // An array of glob patterns indicating a set of files
  // for which coverage information should be collected.
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  // Collects coverage from all TypeScript source files except declaration files.

  // A list of reporter names that Jest uses when writing coverage reports.
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  // Provides multiple formats for coverage reporting.

  // Additional configurations can be added here to support more features.
};