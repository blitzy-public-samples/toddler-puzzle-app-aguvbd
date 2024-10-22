/**
 * ESLint configuration file for the backend services of the Toddler Puzzle App.
 *
 * Ensures code quality and consistency across the codebase.
 *
 * Requirements addressed:
 * - Code Quality and Consistency
 *   (Technical Specification/Development Practices/Code Quality)
 *   Ensure that the code adheres to defined style guidelines and best practices.
 *
 * Dependencies:
 * - eslint v8.x
 * - eslint-plugin-import v2.x
 * - eslint-plugin-node v11.x
 * - eslint-plugin-promise v5.x
 * - eslint-plugin-prettier v4.x
 */

module.exports = {
  // Specify the environments that the code is designed to run in.
  env: {
    node: true, // Enables Node.js global variables and Node.js scoping.
    es2020: true, // Adds all ECMAScript 2020 globals.
  },

  // Define global variables (none in this case).
  globals: {},

  // Extend configurations from recommended ESLint configurations and plugins.
  extends: [
    'eslint:recommended', // Use recommended rules from ESLint.
    'plugin:import/errors', // Ensures proper import syntax and catches errors.
    'plugin:import/warnings', // Warns about potential import/export problems.
    'plugin:node/recommended', // Adds Node.js specific linting rules.
    'plugin:promise/recommended', // Enforces best practices for JavaScript promises.
    'prettier', // Integrates Prettier formatting rules to avoid conflicts.
  ],

  // Parsing options for ECMAScript features.
  parserOptions: {
    ecmaVersion: 12, // Support for ECMAScript 2021 features.
    sourceType: 'module', // Allows use of ES6 modules.
  },

  // Plugins provide additional linting rules.
  plugins: [
    'import', // v2.x - Ensures proper import/export syntax and practices.
    'node', // v11.x - Adds Node.js specific linting rules.
    'promise', // v5.x - Enforces best practices for JavaScript promises.
    'prettier', // v4.x - Integrates Prettier formatting rules with ESLint.
  ],

  // Specific ESLint rules to enforce code quality and consistency.
  rules: {
    'no-console': 'warn', // Warn when console statements are used. Supports Code Quality (Technical Specification/Development Practices/Code Quality).
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Error when variables are defined but not used, except those starting with '_'. Helps maintain code cleanliness. Supports Code Quality (Technical Specification/Development Practices/Code Quality).
    'import/order': ['error', { groups: ['builtin', 'external', 'internal'] }], // Enforce consistent import order. Improves readability. Supports Code Quality (Technical Specification/Development Practices/Code Quality).
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }], // Disallow unsupported Node.js syntax except ES modules. Ensures compatibility while using modern syntax. Supports Code Quality (Technical Specification/Development Practices/Code Quality).
  },
};