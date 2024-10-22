/**
 * Header.tsx
 * 
 * This file defines the Header component for the Toddler Puzzle App's web interface.
 * The Header component is responsible for displaying the app's title, navigation links,
 * and interactive elements like notification badges and parental control access.
 * 
 * Requirements Addressed:
 * - User Interface
 *   - Technical Specification/Feature 6: User Interface
 *     - Design and develop an intuitive and visually appealing user interface tailored for toddlers,
 *       featuring large icons, bright colors, and simple navigation.
 */

import React from 'react'; // Version 17.0.2

// Import necessary internal components and hooks

// Footer component to maintain consistency in layout and styling with the Footer component.
import Footer from './Footer';

// NotificationBadge to integrate notification badges within the header for visibility.
import NotificationBadge from './NotificationBadge';

// ParentalControlToggle to allow parents to manage parental control settings directly from the header.
import ParentalControlToggle from './ParentalControlToggle';

// ProgressBar to visually represent the user's progress through available puzzles.
import ProgressBar from './ProgressBar';

// useMobileOrientation hook to adjust the header's layout based on the device's orientation.
import useMobileOrientation from '../mobile/hooks/useMobileOrientation';

// MobileStyles to ensure consistent styling across mobile components.
import { styles as mobileStyles } from '../mobile/styles/MobileStyles';

/**
 * Header Component
 *
 * Renders the header section of the app, including navigation and branding elements.
 *
 * Steps:
 * 1. Import necessary modules and components.
 * 2. Define the Header component using a functional component structure.
 * 3. Render the app's title and navigation links.
 * 4. Integrate the NotificationBadge to alert users of new updates.
 * 5. Include the ParentalControlToggle for easy access to parental settings.
 * 6. Use the ProgressBar to show the user's progress in puzzles.
 * 7. Apply styles from MobileStyles to ensure the header is visually appealing and consistent with the app's design.
 *
 * Requirements Addressed:
 * - User Interface (Technical Specification/Feature 6: User Interface)
 *   - Design and develop an intuitive and visually appealing user interface tailored for toddlers, featuring large icons, bright colors, and simple navigation.
 */
const Header: React.FC = () => {
    // Adjust layout based on the device's orientation (portrait or landscape)
    const { isPortrait } = useMobileOrientation();

    return (
        // Apply styles from MobileStyles for consistent styling
        <header style={isPortrait ? mobileStyles.headerPortrait : mobileStyles.headerLandscape}>
            {/* App Title */}
            {/* Render the app's title with large, bright text to appeal to toddlers */}
            <div style={mobileStyles.titleContainer}>
                <h1 style={mobileStyles.titleText}>Toddler Puzzle App</h1>
            </div>

            {/* Navigation Links */}
            {/* Render navigation links with simple icons for easy navigation */}
            <nav style={mobileStyles.navContainer}>
                <ul style={mobileStyles.navList}>
                    {/* Example navigation item: Home */}
                    <li style={mobileStyles.navItem}>
                        <button style={mobileStyles.navButton}>
                            {/* Icon for Home */}
                            <img
                                src="/assets/icons/home.svg"
                                alt="Home"
                                style={mobileStyles.navIcon}
                            />
                        </button>
                    </li>
                    {/* Example navigation item: Puzzles */}
                    <li style={mobileStyles.navItem}>
                        <button style={mobileStyles.navButton}>
                            {/* Icon for Puzzles */}
                            <img
                                src="/assets/icons/puzzle.svg"
                                alt="Puzzles"
                                style={mobileStyles.navIcon}
                            />
                        </button>
                    </li>
                    {/* Additional navigation items can be added here */}
                </ul>
            </nav>

            {/* Notification Badge */}
            {/* Integrate the NotificationBadge to alert users of new updates */}
            <div style={mobileStyles.notificationContainer}>
                <NotificationBadge />
            </div>

            {/* Parental Control Toggle */}
            {/* Include the ParentalControlToggle for easy access to parental settings */}
            <div style={mobileStyles.parentalControlContainer}>
                <ParentalControlToggle />
            </div>

            {/* Progress Bar */}
            {/* Use the ProgressBar to show the user's progress in puzzles */}
            <div style={mobileStyles.progressBarContainer}>
                <ProgressBar />
            </div>
        </header>
    );
};

export default Header;