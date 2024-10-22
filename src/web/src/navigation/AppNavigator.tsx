// src/web/src/navigation/AppNavigator.tsx

// This file defines the AppNavigator component for the Toddler Puzzle App's navigation system.
// The AppNavigator is responsible for managing the overall navigation structure of the app,
// integrating both the authentication stack and the main tab navigator to provide a seamless user experience.

// Requirements Addressed:
// - User Interface (Technical Specification/Feature 6: User Interface)
//   Location: Technical Specification/Feature 6: User Interface
//   Description: Design and develop an intuitive and visually appealing user interface tailored for toddlers,
//   featuring large icons, bright colors, and simple navigation.

// Import necessary modules and components.

// Import React to create and manage the component's state and lifecycle. (Version 17.0.2)
import React from 'react'; // Version 17.0.2

// Import NavigationContainer to handle navigation within the app. (Version 5.9.4)
import { NavigationContainer } from '@react-navigation/native'; // Version 5.9.4

// Import internal navigation stacks.

// Import AuthStack to manage authentication-related navigation flows.
import AuthStack from './AuthStack';

// Import MainTabNavigator to manage the primary tab-based navigation within the app.
import MainTabNavigator from './MainTabNavigator';

// Define the AppNavigator component using a functional component structure.
const AppNavigator: React.FC = () => {
  // Set up a navigation container using React Navigation.

  // TODO: Implement authentication logic to switch between AuthStack and MainTabNavigator.
  // This will ensure seamless transitions between authentication and main app sections,
  // addressing the requirement in Technical Specification/Feature 6: User Interface.

  // Placeholder authentication state. In a real implementation, this state would come from
  // context or global state management (e.g., Redux) after integrating authentication logic.
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      {/* Integrate the AuthStack and MainTabNavigator within the navigation container. */}
      {/* Conditional rendering based on authentication status */}
      {isAuthenticated ? (
        // If the user is authenticated, render the main tab navigator.
        <MainTabNavigator />
      ) : (
        // If the user is not authenticated, render the authentication stack.
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;