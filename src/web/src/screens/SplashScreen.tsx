// External dependencies imported from 'react' version 17.0.2
import React, { useEffect, useState } from 'react'; // Version 17.0.2

// Internal dependencies for the SplashScreen component

// Importing RewardAnimation to display engaging animations on the splash screen.
// Purpose: To provide engaging visual feedback for toddlers.
// Location: src/web/src/components/RewardAnimation.tsx
import RewardAnimation from '../components/RewardAnimation';

// Importing MobileStyles to apply consistent and responsive styles to the splash screen.
// Purpose: To ensure the splash screen is visually appealing and consistent with the app's design.
// Location: src/web/src/mobile/styles/MobileStyles.ts
import MobileStyles from '../mobile/styles/MobileStyles';

// Importing useMobileOrientation hook to adjust the layout based on the device's orientation.
// Purpose: To adjust the splash screen's layout according to the device's orientation.
// Location: src/web/src/mobile/hooks/useMobileOrientation.ts
import useMobileOrientation from '../mobile/hooks/useMobileOrientation';

/**
 * SplashScreen Component
 * 
 * Renders the splash screen with animations and transitions to engage toddlers upon app launch.
 * 
 * Requirements Addressed:
 * - TR-6.1: Utilize responsive design principles to ensure compatibility across various device screen sizes.
 *   (Technical Specification/Feature 6: User Interface - TR-6.1)
 * - TR-6.3: Incorporate vibrant color schemes and engaging animations to maintain user interest.
 *   (Technical Specification/Feature 6: User Interface - TR-6.3)
 * - TR-6.4: Ensure smooth transitions and animations to provide immediate feedback upon user interactions.
 *   (Technical Specification/Feature 6: User Interface - TR-6.4)
 * 
 * Returns:
 * - JSX.Element: The rendered splash screen component.
 */
const SplashScreen: React.FC = () => {
  // Initialize state to manage the visibility and animation status of the splash screen.
  // useState hook manages the component's state of visibility.
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Adjust the layout based on the device's orientation using the useMobileOrientation hook.
  // This addresses responsive design as per TR-6.1.
  const orientation = useMobileOrientation(); // Returns 'portrait' or 'landscape'

  // Use the useEffect hook to trigger animations and transitions when the component mounts.
  // This handles side effects such as starting the splash animation.
  useEffect(() => {
    // Timer to control the duration of the splash screen visibility.
    const timer = setTimeout(() => {
      // After the set duration, update the visibility state to hide the splash screen.
      setIsVisible(false);
    }, 3000); // Display splash screen for 3 seconds

    // Cleanup function to clear the timer if the component unmounts.
    return () => clearTimeout(timer);
  }, []);

  // If the splash screen is not visible, do not render it.
  if (!isVisible) {
    return null;
  }

  // Render the splash screen component.
  return (
    // Apply styles from MobileStyles to ensure visual appeal and consistency.
    // Addresses TR-6.3 by using vibrant color schemes.
    <div
      style={{
        ...MobileStyles.splashScreenContainer,
        // Adjust layout based on device orientation, addressing TR-6.1.
        flexDirection: orientation === 'portrait' ? 'column' : 'row',
      }}
    >
      {/* Render the RewardAnimation component to provide engaging animations.
          Addresses TR-6.3 and TR-6.4 by incorporating animations and smooth transitions. */}
      <RewardAnimation />
    </div>
  );
};

export default SplashScreen;