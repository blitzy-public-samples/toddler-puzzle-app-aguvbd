// MobileStyles.ts
// Description:
// This file contains style definitions specifically tailored for the mobile version of the application,
// ensuring a consistent and responsive user interface across various mobile devices.

// Requirements Addressed:
// - Responsive Design
//   - Location: Technical Requirements/Feature 6: User Interface/TR-6.1
//   - Description: Utilize responsive design principles to ensure compatibility across various device screen sizes.

// Dependencies:
// - Internal:
//   - useMobileOrientation (from 'src/web/src/mobile/hooks/useMobileOrientation.ts')
//     Purpose: To apply orientation-specific styles based on the device's current orientation.
// - External:
//   - StyleSheet (from 'react-native', version 0.64.0)
//     Purpose: To create optimized and platform-specific style sheets for React Native components.

// Import StyleSheet from 'react-native' to create optimized and platform-specific style sheets.
// Version: 0.64.0
import { StyleSheet } from 'react-native';

// Import useMobileOrientation from the internal hooks to apply orientation-specific styles.
import useMobileOrientation from '../hooks/useMobileOrientation';

// Define a function that returns the styles object.
// This allows us to access the current orientation within the styles.
const MobileStyles = () => {
  // Use the useMobileOrientation hook to get the current device orientation.
  const { orientation } = useMobileOrientation();

  // Create the styles using StyleSheet.create for better performance and platform optimization.
  const styles = StyleSheet.create({
    /*
     * Style Name: container
     * Description:
     *   Defines the main container style for mobile components, ensuring padding and alignment
     *   are consistent across devices.
     * Requirements Addressed:
     *   - Responsive Design (TR-6.1):
     *     Ensures compatibility across various device screen sizes by using flexible styling.
     */
    container: {
      padding: 10,          // Provides consistent padding on all devices.
      alignItems: 'center', // Centers items horizontally.
      justifyContent: 'center', // Centers items vertically.
    },

    /*
     * Style Name: header
     * Description:
     *   Styles for the header component, providing a consistent look and feel across the mobile application.
     * Requirements Addressed:
     *   - Responsive Design (TR-6.1):
     *     Maintains consistent header styling across different screen sizes.
     */
    header: {
      fontSize: 20,      // Sets a readable font size for headers.
      fontWeight: 'bold', // Emphasizes the header text.
      color: '#333',     // Uses a dark color for good contrast.
    },

    /*
     * Style Name: button
     * Description:
     *   Button styles that adapt to different orientations, ensuring usability and accessibility.
     * Requirements Addressed:
     *   - Responsive Design (TR-6.1):
     *     Adapts button width based on device orientation to ensure accessibility.
     */
    button: {
      padding: 12,            // Provides ample touch area for buttons.
      borderRadius: 8,        // Rounds the corners for better aesthetics.
      backgroundColor: '#007BFF', // Uses a vibrant color to make the button stand out.
      // Adjust the button width based on the current orientation.
      width: orientation === 'portrait' ? '80%' : '60%', // Width is 80% in portrait, 60% in landscape.
    },
  });

  // Return the styles object so it can be used by components.
  return styles;
};

// Export the MobileStyles function as the default export of this module.
export default MobileStyles;