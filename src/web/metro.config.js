/**
 * Metro configuration for React Native
 * https://facebook.github.io/metro/docs/configuration
 *
 * This configuration file ensures that the Metro bundler is correctly configured to handle asset resolution,
 * module paths, and custom transformations for the React Native application.
 *
 * Requirements Addressed:
 * - Bundler Configuration
 *   - Location: Technical Specification/Development Practices/Build Process
 *   - Description: Ensure that the Metro bundler is correctly configured to handle asset resolution,
 *     module paths, and custom transformations for the React Native application.
 */

/* Dependencies */

// External Dependencies
// Import the core Metro bundler functionality for React Native applications (Version: 0.66.2)
const { getDefaultConfig } = require('metro-config');

// Internal Dependencies
// Note: The following internal files may influence module resolution and the bundling process
// - TypeScript compiler options: src/web/tsconfig.json
// - Babel presets and plugins: src/web/babel.config.js
// - Project dependencies and scripts: src/web/package.json

/* Function Definitions */

/**
 * Retrieves the default Metro configuration and extends it with custom settings.
 *
 * Function: getCustomMetroConfig
 * Returns: The extended Metro configuration object.
 *
 * Requirements Addressed:
 * - Bundler Configuration
 *   - Location: Technical Specification/Development Practices/Build Process
 *
 * Steps:
 *   1. Import the Metro configuration module.
 *   2. Define custom source and asset extensions.
 *   3. Extend the default Metro configuration with custom settings.
 *   4. Return the modified configuration object.
 */
async function getCustomMetroConfig() {
  // Step 1: Retrieve the default Metro configuration
  const defaultConfig = await getDefaultConfig();

  // Step 2: Define custom source and asset extensions
  const customSourceExts = ['jsx', 'js', 'ts', 'tsx']; // Source code file extensions
  const customAssetExts = ['ttf', 'mp3', 'mp4'];       // Asset file extensions

  // Step 3: Extend the default Metro configuration with custom settings
  const {
    resolver: { sourceExts, assetExts },
  } = defaultConfig;

  const extendedConfig = {
    ...defaultConfig,
    resolver: {
      // Combine default source extensions with custom extensions
      sourceExts: [...sourceExts, ...customSourceExts],
      // Combine default asset extensions with custom extensions
      assetExts: [...assetExts, ...customAssetExts],
    },
    transformer: {
      // Use the default transformer; additional transformer options can be specified here
      babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
    },
  };

  // Step 4: Return the modified configuration object
  return extendedConfig;
}

// Export the extended Metro configuration
module.exports = getCustomMetroConfig();