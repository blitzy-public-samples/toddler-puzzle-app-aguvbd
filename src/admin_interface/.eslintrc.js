// ESLint configuration file for the Admin Interface of the Toddler Puzzle App

// This configuration addresses the following requirements:
// - "Code Quality and Consistency" located at "Technical Specification/System Components/Development Standards"
//   Description: Ensures that the codebase adheres to defined coding standards, improving maintainability and reducing errors.

// External Dependencies:
// - eslint (version 7.32.0): Provides linting capabilities to enforce coding standards.
// - eslint-plugin-react (version 7.24.0): Adds React-specific linting rules to ESLint.
// - eslint-plugin-jsx-a11y (version 6.4.1): Enforces accessibility best practices in JSX.
// - eslint-plugin-import (version 2.23.4): Ensures proper import/export syntax and practices.

module.exports = {
  // Specify environments that the code is designed to run in.
  env: {
    browser: true,  // Enables browser global variables.
    es2021: true,   // Enables ES2021 globals and syntax.
  },
  // Extend base configurations to enforce a set of core rules.
  extends: [
    'eslint:recommended',             // Use ESLint's recommended rules.
    'plugin:react/recommended',       // Use React-specific linting rules from eslint-plugin-react (v7.24.0).
    'plugin:jsx-a11y/recommended',    // Use accessibility rules from eslint-plugin-jsx-a11y (v6.4.1).
  ],
  // Specify the parser for ESLint to understand TypeScript syntax.
  parser: '@typescript-eslint/parser',  // Parser for TypeScript.
  parserOptions: {
    ecmaFeatures: {
      jsx: true,  // Enable parsing of JSX, needed for React components.
    },
    ecmaVersion: 12,        // Supports ECMAScript 2021 syntax.
    sourceType: 'module',   // Enables the use of imports.
  },
  // Plugins provide additional rules not included in ESLint core.
  plugins: [
    'react',        // React-specific linting rules (eslint-plugin-react v7.24.0).
    'jsx-a11y',     // Accessibility rules for JSX elements (eslint-plugin-jsx-a11y v6.4.1).
    'import',       // Linting of ES6+ import/export syntax (eslint-plugin-import v2.23.4).
  ],
  // Custom rules to override default configurations and enforce coding standards.
  rules: {
    'indent': ['error', 2],              // Enforce consistent indentation of 2 spaces.
    'linebreak-style': ['error', 'unix'],// Enforce the use of Unix line endings.
    'quotes': ['error', 'single'],       // Enforce the use of single quotes for strings.
    'semi': ['error', 'always'],         // Require semicolons at the end of statements.
    'react/react-in-jsx-scope': 'off',   // Disable rule requiring React in scope when using JSX (not needed with React 17+).
  },
  // Settings to customize how ESLint works with React.
  settings: {
    react: {
      version: 'detect',  // Automatically detect the version of React to use.
    },
  },
};