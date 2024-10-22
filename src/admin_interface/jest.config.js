/**
 * Jest Configuration File for the Admin Interface of the Toddler Puzzle App
 *
 * This configuration ensures that the testing framework is properly configured to support unit and integration tests in the admin interface.
 *
 * Requirements Addressed:
 * - "Testing Configuration"
 *   - Location: Technical Specification/System Components/Testing
 *   - Description: Ensures that the testing framework is properly configured to support unit and integration tests in the admin interface.
 *
 * Dependencies:
 * - jest (version 27.0.6) // Provides the testing framework for running unit and integration tests.
 * - ts-jest (version 27.0.4) // Enables Jest to work with TypeScript files.
 * - jest-environment-jsdom (version 27.0.6) // Simulates a browser environment for testing React components.
 * - tsconfig.json // Provides TypeScript configuration to ensure Jest can process TypeScript files.
 */

module.exports = {
  /**
   * Specifies the test environment that will be used for testing.
   * Using 'jsdom' simulates a browser-like environment, which is necessary for testing React components and other browser APIs.
   *
   * Requirement Addressed: "Testing Configuration"
   * Location: Technical Specification/System Components/Testing
   *
   * Dependency:
   * - jest-environment-jsdom (version 27.0.6) // Simulates a browser environment for testing React components.
   */
  testEnvironment: 'jsdom',

  /**
   * A map from regular expressions to paths to transformers.
   * This tells Jest to use 'ts-jest' to process TypeScript files, allowing us to write tests in TypeScript.
   *
   * Requirement Addressed: "Testing Configuration"
   * Location: Technical Specification/System Components/Testing
   *
   * Dependency:
   * - ts-jest (version 27.0.4) // Enables Jest to work with TypeScript files.
   */
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  /**
   * An array of file extensions your modules use.
   * This allows Jest to recognize files with these extensions when running tests.
   *
   * Requirement Addressed: "Testing Configuration"
   * Location: Technical Specification/System Components/Testing
   */
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  /**
   * A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed.
   * This is useful for setting up global configurations or variables needed by tests.
   *
   * Requirement Addressed: "Testing Configuration"
   * Location: Technical Specification/System Components/Testing
   *
   * Internal Dependency:
   * - setupTests.ts // Set up file for configuring the testing environment.
   */
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  /**
   * Provides global configuration for 'ts-jest'.
   * Specifies the path to the TypeScript configuration file.
   * This ensures that Jest's understanding of TypeScript matches the project's configuration.
   *
   * Requirement Addressed: "Testing Configuration"
   * Location: Technical Specification/System Components/Testing
   *
   * Dependency:
   * - tsconfig.json // Provides TypeScript configuration to ensure Jest can process TypeScript files.
   */
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  /**
   * Indicates whether each individual test should be reported during the run.
   * Setting this to true helps in debugging by providing detailed feedback for each test.
   */
  verbose: true,
};