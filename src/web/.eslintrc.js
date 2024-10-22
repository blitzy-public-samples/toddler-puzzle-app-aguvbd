/*
 * ESLint configuration for the Toddler Puzzle App web application.
 *
 * This configuration ensures code quality and consistency across JavaScript and TypeScript files.
 * It addresses the requirement "Code Quality and Consistency" as specified in the Technical Specification:
 * Location: Technical Specification/Development Practices/Code Quality
 *
 * External Dependencies:
 * - eslint (version 8.0.0): Provides the core linting functionality for JavaScript and TypeScript files.
 * - eslint-plugin-react (version 7.0.0): Adds specific linting rules for React applications.
 * - eslint-plugin-import (version 2.0.0): Ensures proper import/export syntax and helps avoid issues with missing files.
 * - eslint-config-airbnb (version 19.0.0): Provides Airbnb's base JavaScript style guide for ESLint.
 * - prettier (version 2.0.0): Provides automated code formatting to maintain consistent code style across the project.
 */

module.exports = {
  // Extends configurations from Airbnb, React recommended rules, and Prettier to enforce consistent coding standards.
  // Addresses "Code Quality and Consistency"
  // Location: Technical Specification/Development Practices/Code Quality
  extends: ['airbnb', 'plugin:react/recommended', 'prettier'],

  // Defines the parser options to support modern ECMAScript features and JSX syntax.
  parserOptions: {
    ecmaVersion: 2020, // Supports ECMAScript 2020 features.
    sourceType: 'module', // Allows the use of imports.
    ecmaFeatures: {
      jsx: true, // Enables parsing of JSX, necessary for React applications.
    },
  },

  // Specifies the environments for global variables, ensuring code runs in intended contexts.
  env: {
    browser: true, // Defines browser globals like window and document.
    node: true, // Defines Node.js globals and Node.js scoping.
    es6: true, // Enables ES6 globals such as Set, Map, and Promise.
  },

  // Settings for specific modules and plugins.
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version to use appropriate linting rules.
    },
  },

  // Defines global variables used across the project (none specified as per the schema).
  globals: {
    // No global variables defined.
  },

  // Specifies plugins to extend linting capabilities.
  plugins: [
    'react', // eslint-plugin-react (version 7.0.0)
    'import', // eslint-plugin-import (version 2.0.0)
  ],

  // Custom rules to enforce code style and quality.
  // Each rule addresses "Code Quality and Consistency"
  // Location: Technical Specification/Development Practices/Code Quality
  rules: {
    // Disallow the use of console to maintain clean output.
    // Severity: warn
    // Description: Helps prevent console logs in production code.
    // Requirement Reference: Technical Specification/Development Practices/Code Quality
    'no-console': 'warn',

    // Enforce consistent use of single quotes for strings.
    // Description: Maintains uniform string quoting style across the codebase.
    // Requirement Reference: Technical Specification/Development Practices/Code Quality
    quotes: ['error', 'single'],

    // Require semicolons at the end of statements.
    // Description: Prevents potential errors due to automatic semicolon insertion.
    // Requirement Reference: Technical Specification/Development Practices/Code Quality
    semi: ['error', 'always'],

    // Enforce consistent use of trailing commas in multiline object and array literals.
    // Description: Improves diff readability and minimizes code changes.
    // Options: Multiline - always, Singleline - never
    // Requirement Reference: Technical Specification/Development Practices/Code Quality
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],

    // Enforce consistent indentation using 2 spaces.
    // Description: Enhances code readability and maintains uniform indentation.
    // Options: Use spaces with an indentation of 2.
    // Requirement Reference: Technical Specification/Development Practices/Code Quality
    indent: ['error', 2, { SwitchCase: 1 }],

    // Additional rules can be added here following the same structure.
  },
};