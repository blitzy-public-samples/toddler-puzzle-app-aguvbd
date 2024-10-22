// src/web/src/components/NotificationBadge.tsx

// Import necessary modules and components.

// Importing React to create and manage the component's state and lifecycle.
// Version: 17.0.2
import React from 'react';

// Importing internal components:

// Header component to integrate the notification badge within the header for visibility.
// Addresses consistent UI placement within the app.
import Header from './Header';

// Footer component to maintain consistency in layout and styling with the Footer component.
// Ensures UI consistency across all screens as per Technical Specification Feature 6: User Interface.
import Footer from './Footer';

// ParentalControlToggle component allows parents to manage parental control settings directly from the notification area.
// Addresses Feature 5: Parental Controls
// Location: Technical Specification/Feature 5: Parental Controls
// TR-5.2: Implement UI components for setting usage limits and managing app settings.
import ParentalControlToggle from './ParentalControlToggle';

// ProgressBar component visually represents the user's progress through available puzzles.
// Enhances user engagement and provides feedback on progress.
// Addresses Feature 1: Puzzle Difficulty Levels and Feature 4: Offline Playability.
import ProgressBar from './ProgressBar';

// Importing CSS for styling the NotificationBadge component.
// Styles ensure the badge is visually appealing and consistent with the app's design as per Feature 6: User Interface.
import './NotificationBadge.css';

// Define the props interface for the NotificationBadge component.
interface NotificationBadgeProps {
  // The number of new notifications to display.
  count: number;
}

/**
 * NotificationBadge Component
 * 
 * Renders a badge indicating the presence of new notifications or updates,
 * enhancing user awareness and engagement.
 * 
 * Requirements Addressed:
 * - Feature 9: Notifications
 *   - Location: Technical Specification/Feature 9: Notifications
 *     "Implement a notification system to inform parents about new themes, puzzles,
 *     and important updates, ensuring they stay engaged with the app's offerings."
 * 
 * Steps Implemented:
 * 1. Define the NotificationBadge component using a functional component structure.
 * 2. Use the count parameter to determine the number of notifications to display.
 * 3. Render the badge with appropriate styles and visibility logic.
 * 4. Integrate with the Header and Footer components for consistent UI placement.
 * 5. Apply styles to ensure the badge is visually appealing and consistent with the app's design.
 * 
 * @param {NotificationBadgeProps} props - The properties passed to the component.
 * @returns {JSX.Element | null} The rendered notification badge component or null if no notifications.
 */
const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
  // If there are no notifications, the badge is not rendered.
  if (count <= 0) {
    return null;
  }

  // Render the NotificationBadge component.
  return (
    <>
      {/* Integrate with Header component for consistent UI placement (Step 4) */}
      <Header>
        {/* Wrapper for the notification badge */}
        <div className="notification-badge-wrapper">
          {/* Notification badge element with appropriate styles (Steps 3 and 5) */}
          <div className="notification-badge">
            {/* Display the count of new notifications */}
            <span className="notification-count">{count}</span>
          </div>
          {/* Include ParentalControlToggle allowing parents to manage settings directly from notification area */}
          {/* Addresses Feature 5: Parental Controls (TR-5.2) */}
          <ParentalControlToggle />
          {/* Include ProgressBar to represent user's progress through puzzles */}
          {/* Enhances user engagement and addresses progress tracking */}
          <ProgressBar />
        </div>
      </Header>

      {/* Include Footer component to maintain consistency in layout and styling (Step 4) */}
      {/* Addresses Feature 6: User Interface */}
      <Footer />
    </>
  );
};

export default NotificationBadge;