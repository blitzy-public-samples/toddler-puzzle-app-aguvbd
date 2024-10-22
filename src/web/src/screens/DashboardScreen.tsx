// DashboardScreen.tsx
// Description:
// The DashboardScreen component provides parents with a comprehensive overview and control panel for monitoring their child's activity within the Toddler Puzzle App. It integrates various components to display user progress, notifications, and parental controls in a visually engaging manner.

// Requirements Addressed:
// - Parental Controls (Technical Specification/Feature 5: Parental Controls)
//   Location: Technical Specification/Feature 5: Parental Controls
//   Description: Provide parents with robust tools to manage content, control purchases, set usage limits, and monitor their child’s activity, ensuring a safe and controlled environment.

// Import React and necessary hooks
import React from 'react'; // React version 17.0.2: To create and manage the component's state and lifecycle.

// Import internal components
import Header from '../components/Header'; // Provides consistent header with navigation and branding elements.
import Footer from '../components/Footer'; // Provides consistent footer with navigation links.
import NotificationBadge from '../components/NotificationBadge'; // Displays notifications related to updates or new content.
import ParentalControlToggle from '../components/ParentalControlToggle'; // Allows parents to manage parental control settings directly from the DashboardScreen.
import ProgressBar from '../components/ProgressBar'; // Visually represents the user's progress through available puzzles.

// Import style modules and hooks
import MobileStyles from '../mobile/styles/MobileStyles'; // Ensures consistent styling across mobile components.
import useMobileOrientation from '../mobile/hooks/useMobileOrientation'; // Adjusts the layout based on the device's orientation.

// Define the DashboardScreen component using a functional component structure
const DashboardScreen: React.FC = () => {
  // Use the useMobileOrientation hook to adjust layout based on device orientation
  const { isPortrait } = useMobileOrientation(); // Adjusts layout based on device orientation (Technical Specification/Feature 6: User Interface, TR-6.1)

  return (
    // Main container applying styles from MobileStyles to ensure visual consistency
    <div
      className={`dashboard-screen ${isPortrait ? 'portrait' : 'landscape'}`}
      style={{
        ...MobileStyles.container,
        ...(isPortrait ? MobileStyles.portraitContainer : MobileStyles.landscapeContainer),
      }}
    >
      {/* Render the Header component at the top */}
      {/* Header provides navigation and branding (Technical Specification/Feature 6: User Interface, TR-6.2) */}
      <Header />

      {/* Main content area with styles applied */}
      <main className="dashboard-content" style={MobileStyles.contentContainer}>
        {/* Display NotificationBadge to alert users of new updates */}
        {/* Addresses notifications to parents (Technical Specification/Feature 9: Notifications, TR-9.1) */}
        <NotificationBadge />

        {/* Integrate ParentalControlToggle for easy access to parental settings */}
        {/* Allows parents to manage settings (Technical Specification/Feature 5: Parental Controls, TR-5.2) */}
        <ParentalControlToggle />

        {/* Use ProgressBar to show user's progress in puzzles */}
        {/* Displays child's progress (Technical Specification/Feature 5: Parental Controls, TR-5.4) */}
        <ProgressBar />
      </main>

      {/* Render the Footer component at the bottom */}
      {/* Footer provides navigation links (Technical Specification/Feature 6: User Interface, TR-6.2) */}
      <Footer />
    </div>
  );
};

export default DashboardScreen;