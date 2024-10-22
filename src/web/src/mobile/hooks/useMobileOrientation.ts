// src/web/src/mobile/hooks/useMobileOrientation.ts

/**
 * Custom hook for detecting and responding to changes in the orientation of a mobile device.
 * It allows components to adjust their layout and behavior accordingly.
 *
 * Requirements Addressed:
 * - Responsive Design (TR-6.1): Utilize responsive design principles to ensure compatibility across various device screen sizes.
 *   Location: Technical Requirements/Feature 6: User Interface/TR-6.1
 */

import { useState, useEffect } from 'react'; // React Hooks for state management and side effects (react@17.0.2)

import MobileStyles from '../styles/MobileStyles'; // Internal styles module for consistent and responsive mobile styling

const useMobileOrientation = (): string => {
  // Define a function to determine the current orientation based on window dimensions
  const getOrientation = (): string => {
    // Determine if the device is in 'portrait' or 'landscape' mode
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  };

  // Initialize state to store the current orientation
  const [orientation, setOrientation] = useState<string>(getOrientation());

  // Effect to handle changes in window dimensions
  useEffect(() => {
    /**
     * Handler function to update the orientation state whenever the window is resized.
     * This ensures components can adjust layout based on orientation changes, fulfilling TR-6.1.
     */
    const handleResize = () => {
      const newOrientation = getOrientation();
      if (orientation !== newOrientation) {
        setOrientation(newOrientation);
      }
    };

    // Add event listener for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [orientation]);

  // Return the current orientation to enable responsive component behavior
  return orientation;
};

export default useMobileOrientation;