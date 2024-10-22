// src/web/src/components/Footer.tsx
// This file defines the Footer component for the Toddler Puzzle App's web interface.
// Addresses 'Feature 6: User Interface' (Technical Specification/Feature 6), specifically:
// - TR-6.2: Implement large, easily tappable buttons and icons.
// - TR-6.3: Incorporate vibrant color schemes and engaging animations.
// - TR-6.4: Ensure smooth transitions and animations for feedback.
// - TR-6.6: Optimize touch gestures for young users.

// Import necessary modules and components
import React from 'react'; // React version 17.0.2

// Internal component imports
import Header from './Header'; // To maintain consistency in layout and styling with the Header component
import NotificationBadge from './NotificationBadge'; // Displays notifications related to updates or new content
import ParentalControlToggle from './ParentalControlToggle'; // Allows parents to manage parental control settings directly from the footer
import ProgressBar from './ProgressBar'; // Visually represents the user's progress through available puzzles

// Define the Footer component using a functional component structure
const Footer: React.FC = () => {
    // Renders the footer section of the app, including navigation and additional interactive elements.

    return (
        <footer className="footer">
            {/* Navigation Links */}
            {/* Renders navigation links with large, easily tappable icons (TR-6.2, TR-6.6) */}
            <nav className="footer-nav">
                <ul className="footer-nav__list">
                    <li className="footer-nav__item">
                        <a href="/home" className="footer-nav__link">
                            <img src="/assets/icons/home.svg" alt="Home" />
                            <span>Home</span>
                        </a>
                    </li>
                    <li className="footer-nav__item">
                        <a href="/puzzles" className="footer-nav__link">
                            <img src="/assets/icons/puzzle.svg" alt="Puzzles" />
                            <span>Puzzles</span>
                        </a>
                    </li>
                    <li className="footer-nav__item">
                        <a href="/settings" className="footer-nav__link">
                            <img src="/assets/icons/settings.svg" alt="Settings" />
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* NotificationBadge Component */}
            {/* Integrates NotificationBadge to alert users of new updates or content */}
            {/* Addresses 'Feature 9: Notifications' (Technical Specification/Feature 9), TR-9.5 */}
            <NotificationBadge />

            {/* ParentalControlToggle Component */}
            {/* Includes ParentalControlToggle for parents to easily access parental settings directly from the footer */}
            {/* Addresses 'Feature 5: Parental Controls' (Technical Specification/Feature 5), TR-5.2 */}
            <ParentalControlToggle />

            {/* ProgressBar Component */}
            {/* Uses ProgressBar to show the user's progress in puzzles, enhancing engagement */}
            {/* Addresses 'Feature 1: Puzzle Difficulty Levels' (Technical Specification/Feature 1), TR-1.2 */}
            <ProgressBar />
        </footer>
    );
};

export default Footer;