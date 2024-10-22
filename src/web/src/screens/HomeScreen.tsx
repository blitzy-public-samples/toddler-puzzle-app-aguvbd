// Import React and necessary hooks
import React from 'react'; // External dependency: React version 17.0.2

// Import components from React Native
import { View, StyleSheet } from 'react-native';

// Internal components and modules
import Header from '../components/Header'; // Provides a consistent header with navigation and branding elements (src/web/src/components/Header.tsx)
import Footer from '../components/Footer'; // Provides a consistent footer with navigation links (src/web/src/components/Footer.tsx)
import NotificationBadge from '../components/NotificationBadge'; // Displays notifications related to updates or new content (src/web/src/components/NotificationBadge.tsx)
import ParentalControlToggle from '../components/ParentalControlToggle'; // Allows parents to manage parental control settings directly from the HomeScreen (src/web/src/components/ParentalControlToggle.tsx)
import ProgressBar from '../components/ProgressBar'; // Visually represents the user's progress through available puzzles (src/web/src/components/ProgressBar.tsx)
import MainTabNavigator from '../navigation/MainTabNavigator'; // Manages the primary tab-based navigation within the app (src/web/src/navigation/MainTabNavigator.tsx)

// Mobile-specific styles and hooks
import MobileStyles from '../mobile/styles/MobileStyles'; // Ensures consistent styling across mobile components (src/web/src/mobile/styles/MobileStyles.ts)
import useMobileOrientation from '../mobile/hooks/useMobileOrientation'; // Adjusts the layout based on the device's orientation (src/web/src/mobile/hooks/useMobileOrientation.ts)

/**
 * HomeScreen Component
 *
 * Purpose:
 * The HomeScreen component serves as the main entry point for the Toddler Puzzle App's user interface.
 * It provides access to various puzzle themes and displays the user's progress, notifications, and
 * parental controls in a visually engaging manner.
 *
 * Requirements Addressed:
 * - User Interface:
 *   - Design and develop an intuitive and visually appealing user interface tailored for toddlers,
 *     featuring large icons, bright colors, and simple navigation.
 *     (Technical Specification/Feature 6: User Interface)
 *
 * Steps:
 * 1. Use the useMobileOrientation hook to adjust the layout based on device orientation.
 * 2. Render the Header component at the top of the screen.
 * 3. Display the NotificationBadge to alert users of new updates.
 * 4. Integrate the ParentalControlToggle for easy access to parental settings.
 * 5. Use the ProgressBar to show the user's progress in puzzles.
 * 6. Include the MainTabNavigator to provide access to various puzzle themes.
 * 7. Render the Footer component at the bottom of the screen.
 * 8. Apply styles from MobileStyles to ensure the screen is visually appealing and consistent with the app's design.
 *
 * @returns {JSX.Element} The rendered home screen component.
 */
const HomeScreen: React.FC = () => {
  // 1. Use the useMobileOrientation hook to adjust the layout based on device orientation
  const orientation = useMobileOrientation(); // Could be 'portrait' or 'landscape'

  // 2. Render the HomeScreen UI
  return (
    <View style={styles.container}>
      {/* 3. Render the Header component at the top of the screen */}
      <Header />

      {/* 4. Display the NotificationBadge to alert users of new updates */}
      <NotificationBadge />

      {/* 5. Main content area */}
      <View style={styles.content}>
        {/* 6. Integrate the ParentalControlToggle for easy access to parental settings */}
        <ParentalControlToggle />

        {/* 7. Use the ProgressBar to show the user's progress in puzzles */}
        <ProgressBar />

        {/* 8. Include the MainTabNavigator to provide access to various puzzle themes */}
        <MainTabNavigator />
      </View>

      {/* 9. Render the Footer component at the bottom of the screen */}
      <Footer />
    </View>
  );
};

// Apply styles from MobileStyles to ensure the screen is visually appealing and consistent with the app's design
const styles = StyleSheet.create({
  container: {
    // Base container styles from MobileStyles
    ...MobileStyles.container,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF', // White background to maintain a clean and bright interface
  },
  content: {
    // Styles for the main content area
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // Additional styles can be added here, possibly adjusting based on orientation
  },
});

export default HomeScreen;