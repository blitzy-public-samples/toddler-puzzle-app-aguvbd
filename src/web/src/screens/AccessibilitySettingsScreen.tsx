// AccessibilitySettingsScreen.tsx
// This file defines the AccessibilitySettingsScreen component for the Toddler Puzzle App's web interface.
// It provides users with options to adjust accessibility settings, such as high-contrast mode and voice instructions,
// to enhance the app's usability for toddlers with different needs.

// Requirements Addressed:
// - Accessibility Features: Develop accessibility features such as high-contrast modes and voice instructions.
//   Location: Technical Specification/Feature 6: User Interface/TR-6.5
// - Responsive Design: Utilize responsive design principles to ensure compatibility across various device screen sizes.
//   Location: Technical Specification/Feature 6: User Interface/TR-6.1
// - Offline Playability: Ensure all core functionalities are accessible offline.
//   Location: Technical Specification/Feature 4: Offline Playability/TR-4.5

import React, { useState, useEffect } from 'react'; // React version 17.0.2
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParentalControlToggle from '../components/ParentalControlToggle';
import useMobileOrientation from '../mobile/hooks/useMobileOrientation';
import MobileStyles from '../mobile/styles/MobileStyles';

// Define the AccessibilitySettingsScreen component using a functional component structure.
const AccessibilitySettingsScreen: React.FC = () => {
  // Initialize state to manage accessibility settings such as high-contrast mode and voice instructions.
  // Using useState hook to manage state.
  const [highContrastMode, setHighContrastMode] = useState<boolean>(false);
  const [voiceInstructions, setVoiceInstructions] = useState<boolean>(false);

  // Use the useMobileOrientation hook to adjust the screen's layout based on the device's orientation.
  // Addresses responsive design requirements (TR-6.1).
  const orientation = useMobileOrientation();

  // Apply styles from MobileStyles to ensure the screen is visually appealing and consistent with the app's design.
  const styles = MobileStyles(orientation, highContrastMode);

  // Use useEffect hook to save settings changes when they occur.
  // Ensures that any changes to the accessibility settings are persisted.
  // Addresses offline playability and data synchronization (TR-4.1, TR-10.5).
  useEffect(() => {
    const saveSettings = () => {
      // Save settings to local storage for offline availability.
      // This fulfills the requirement to make settings available offline (TR-4.1).
      localStorage.setItem(
        'accessibilitySettings',
        JSON.stringify({ highContrastMode, voiceInstructions })
      );
    };

    saveSettings();
  }, [highContrastMode, voiceInstructions]);

  return (
    <div style={styles.container}>
      {/* Integrate with the Header component for consistent UI placement. */}
      <Header title="Accessibility Settings" />

      <main style={styles.main}>
        <h1 style={styles.heading}>Accessibility Settings</h1>

        {/* Render the accessibility options with appropriate styles and event handlers. */}
        {/* High Contrast Mode Toggle */}
        <div style={styles.settingItem}>
          <label htmlFor="highContrastMode" style={styles.label}>
            High Contrast Mode
          </label>
          <ParentalControlToggle
            id="highContrastMode"
            isEnabled={highContrastMode}
            onToggle={() => setHighContrastMode(!highContrastMode)}
          />
        </div>

        {/* Voice Instructions Toggle */}
        <div style={styles.settingItem}>
          <label htmlFor="voiceInstructions" style={styles.label}>
            Voice Instructions
          </label>
          <ParentalControlToggle
            id="voiceInstructions"
            isEnabled={voiceInstructions}
            onToggle={() => setVoiceInstructions(!voiceInstructions)}
          />
        </div>

        {/* Additional accessibility settings can be added here following the same pattern. */}
      </main>

      {/* Integrate with the Footer component for consistent UI placement. */}
      <Footer />
    </div>
  );
};

export default AccessibilitySettingsScreen;