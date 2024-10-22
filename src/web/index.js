// src/web/index.js
// Entry point for the Toddler Puzzle App's web interface.
// Initializes the React application and renders the main App component into the DOM.

// Requirement Addressed:
// - Feature: User Interface
// - Location: Technical Specification/Feature 6: User Interface
// - Description: Design and develop an intuitive and visually appealing user interface tailored for toddlers, featuring large icons, bright colors, and simple navigation.

// Importing React and ReactDOM libraries.
// React (v17.0.2) is used to create and manage the component's state and lifecycle.
// ReactDOM (v17.0.2) is used to render the React component tree into the DOM.
import React from 'react'; // React v17.0.2
import ReactDOM from 'react-dom'; // ReactDOM v17.0.2

// Importing the main App component.
// The App component renders the main application interface.
// Internal dependency from 'src/web/App.tsx'.
import App from './App.tsx';

// Function to render the main App component into the DOM.
function renderApp() {
  // Renders the App component into the DOM element with the id 'root'.
  // This mounts the entire React application onto the webpage.
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// Calling the renderApp function to initialize and render the application.
renderApp();