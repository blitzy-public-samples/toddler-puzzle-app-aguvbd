// External dependencies (React 17.0.2)
// Provides the base library for building the application.
import React from 'react';
// External dependencies (ReactDOM 17.0.2)
// Renders React components to the DOM.
import ReactDOM from 'react-dom';

// Internal dependencies
// 'App' is the main application component that integrates various pages and services.
import App from './App';
// 'GlobalStyles' ensures consistent styling across the application.
import GlobalStyles from './styles/GlobalStyles';

/**
 * Renders the main App component into the root DOM element.
 *
 * Requirements Addressed:
 * - Name: Application Initialization
 *   - Location: Technical Specification/System Components/Application Setup
 *   - Description: Initializes the admin interface application by rendering the main App component and setting up global configurations.
 *
 * Function: renderApp
 * Description: Renders the App component into the DOM and applies global styles.
 * Parameters: None
 * Returns: void
 * Steps:
 *   1. Apply global styles using GlobalStyles.
 *   2. Use ReactDOM to render the App component into the root DOM element.
 */
function renderApp(): void {
  // Step 1: Apply global styles to ensure consistent styling across the application.
  // This utilizes 'GlobalStyles' as per the internal dependency specified.

  // Step 2: Render the main 'App' component into the root DOM element.
  // This fulfills the application initialization requirement by starting the admin interface application.
  ReactDOM.render(
    <>
      <GlobalStyles />
      <App />
    </>,
    document.getElementById('root')
  );
}

// Initialize the application by calling the renderApp function.
// This sets up the application and makes it ready for administrators to use.
renderApp();