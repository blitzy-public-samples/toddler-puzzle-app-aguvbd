// src/admin_interface/src/styles/GlobalStyles.ts

/**
 * Description:
 * This file defines global styling rules for the admin interface, ensuring a consistent look and feel across all components.

 * Requirements Addressed:
 * - Name: Consistent Styling
 * - Location: Technical Specification/User Interface/Styling
 * - Description: Ensures a uniform appearance across the admin interface by providing global styles that can be applied to all components.

 * Dependencies:
 * - External:
 *   - Name: styled-components
 *   - Module: 'styled-components'
 *   - Version: 5.3.3
 *   - Purpose: Provides utilities for defining and managing CSS-in-JS styles.
 */

// Import 'createGlobalStyle' from 'styled-components' to define global styles.
// Version: 5.3.3
import { createGlobalStyle } from 'styled-components';

/**
 * GlobalStyles component applies global CSS styles across the admin interface.
 *
 * This component resets default margins and paddings, sets a consistent font family,
 * and applies a standard background color. It ensures all components start with
 * the same base styles, addressing the "Consistent Styling" requirement specified
 * in the Technical Specification under "User Interface/Styling".
 */
const GlobalStyles = createGlobalStyle`
    /* Reset default margin, padding, and box-sizing for all elements */
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Apply consistent styles to the body element */
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f0f2f5; /* Light grey background for a clean look */
        color: #333; /* Default text color */
        line-height: 1.6; /* Improve readability */
    }

    /* Ensure consistent styling for headings */
    h1, h2, h3, h4, h5, h6 {
        font-family: inherit; /* Use the same font as the body */
        color: inherit;       /* Inherit text color */
        margin-bottom: 1rem;  /* Add space below headings */
    }

    /* Style paragraphs for readability */
    p {
        margin-bottom: 1rem; /* Add space below paragraphs */
    }

    /* Style links with a consistent color scheme */
    a {
        text-decoration: none;
        color: #1890ff; /* Primary link color */
    }

    a:hover {
        color: #40a9ff; /* Lighter blue on hover */
    }

    /* Style lists to have consistent spacing */
    ul, ol {
        margin-left: 1.5rem; /* Indent lists */
        margin-bottom: 1rem; /* Add space below lists */
    }

    /* Ensure buttons have consistent styling */
    button {
        font-family: inherit;
        cursor: pointer;
    }

    /* Inputs and textareas should inherit font styling */
    input, textarea {
        font-family: inherit;
    }

    /* Provide a consistent style for images */
    img {
        max-width: 100%; /* Ensure images do not overflow their container */
        height: auto;    /* Maintain aspect ratio */
    }

    /* Style the scrollbar for consistency across browsers */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;

export default GlobalStyles;