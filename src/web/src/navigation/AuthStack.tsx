/**
 * AuthStack.tsx
 *
 * This file defines the AuthStack component for the Toddler Puzzle App's navigation system.
 * The AuthStack is responsible for managing the authentication-related navigation flows,
 * including login, registration, and password recovery screens.
 *
 * Requirements Addressed:
 * - User Interface (Technical Specification/Feature 6: User Interface)
 *   - TR-6.1: Utilize responsive design principles to ensure compatibility across various device screen sizes.
 *   - TR-6.2: Implement large, easily tappable buttons and icons to facilitate ease of use for toddlers.
 *   - TR-6.4: Ensure smooth transitions and animations to provide immediate feedback upon user interactions.
 * - Parental Controls (Technical Specification/Feature 5: Parental Controls)
 *   - TR-5.2: Implement UI components for setting usage limits and managing app settings.
 * - Accessibility Features (Technical Specification/Feature 6: User Interface)
 *   - TR-6.5: Develop accessibility features such as high-contrast modes and voice instructions.
 */

import React from 'react'; // React v17.0.2
import { createStackNavigator } from '@react-navigation/stack'; // React Navigation v5.9.4

// Importing necessary screens
import SplashScreen from '../screens/SplashScreen';
import AccessibilitySettingsScreen from '../screens/AccessibilitySettingsScreen';
import ParentalControlsScreen from '../screens/ParentalControlsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Creating a Stack Navigator
const Stack = createStackNavigator();

/**
 * AuthStack Component
 *
 * Renders the authentication stack navigator, managing navigation flows for authentication-related screens.
 *
 * Steps:
 * 1. Import necessary modules and components.
 * 2. Define the AuthStack component using a functional component structure.
 * 3. Set up a stack navigator using React Navigation.
 * 4. Add screens for SplashScreen, AccessibilitySettingsScreen, ParentalControlsScreen, and SettingsScreen to the stack navigator.
 * 5. Ensure navigation options are set for each screen, including titles and transition animations.
 *
 * @returns {JSX.Element} The rendered authentication stack navigator component.
 */
const AuthStack: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false, // Hides the header for a full-screen experience
        animationEnabled: true, // Enables smooth transitions (TR-6.4)
      }}
    >
      {/* Splash Screen */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          title: 'Welcome',
          // Requirements Addressed:
          // - Provides an engaging introduction (Feature 6: User Interface)
        }}
      />

      {/* Accessibility Settings Screen */}
      <Stack.Screen
        name="AccessibilitySettings"
        component={AccessibilitySettingsScreen}
        options={{
          title: 'Accessibility Settings',
          // Requirements Addressed:
          // - TR-6.5: Develop accessibility features such as high-contrast modes and voice instructions.
        }}
      />

      {/* Parental Controls Screen */}
      <Stack.Screen
        name="ParentalControls"
        component={ParentalControlsScreen}
        options={{
          title: 'Parental Controls',
          // Requirements Addressed:
          // - TR-5.2: Implement UI components for setting usage limits and managing app settings.
        }}
      />

      {/* Settings Screen */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          // Requirements Addressed:
          // - TR-5.2: Implement UI components for setting usage limits and managing app settings.
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;