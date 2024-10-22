/**
 * Babel configuration file for the web application.
 *
 * This configuration ensures that modern JavaScript and TypeScript code is transpiled
 * into a format compatible with older browsers and environments.
 *
 * Requirements Addressed:
 * - **JavaScript and TypeScript Transpilation**
 *   - Location: Technical Specification/Development Practices/Build Process
 *   - Description: Ensure that Babel is correctly configured to transpile modern JavaScript and TypeScript code,
 *     enabling compatibility with various environments and browsers.
 */

module.exports = {
  /**
   * Presets used by Babel to determine how to transpile the code.
   */
  presets: [
    /**
     * @babel/preset-env (version 7.0.0)
     * Allows Babel to transpile modern JavaScript (ES6+) into code compatible with older environments.
     * Dependency: babel-preset-env
     */
    '@babel/preset-env',
    /**
     * @babel/preset-react (version 7.0.0)
     * Enables Babel to transpile React JSX syntax.
     * Dependency: babel-preset-react
     */
    '@babel/preset-react',
    /**
     * @babel/preset-typescript (version 7.0.0)
     * Allows Babel to transpile TypeScript code into JavaScript.
     * Dependency: @babel/preset-typescript
     */
    '@babel/preset-typescript'
  ],
  /**
   * Plugins extending Babel's functionality.
   */
  plugins: [
    /**
     * @babel/plugin-proposal-class-properties (compatible with Babel 7.0.0)
     * Enables support for class properties syntax in JavaScript.
     * Necessary for using modern class property features.
     * Dependency: @babel/plugin-proposal-class-properties
     */
    '@babel/plugin-proposal-class-properties',
    /**
     * @babel/plugin-transform-runtime (compatible with Babel 7.0.0)
     * Optimizes code by reusing helper functions to reduce code duplication.
     * Improves performance and reduces bundle size.
     * Dependency: @babel/plugin-transform-runtime
     */
    '@babel/plugin-transform-runtime'
  ]
};