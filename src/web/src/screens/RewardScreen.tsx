// src/web/src/screens/RewardScreen.tsx

// Import React to create and manage the component's state and lifecycle.
// External Dependency: React (react)
// Version: 17.0.2
import React from 'react'; // React version 17.0.2

// Import internal components and assets.

// Header component provides a consistent header across screens.
// Internal Dependency: Header (src/web/src/components/Header.tsx)
// Purpose: To provide a consistent header across screens.
import Header from '../components/Header';

// Footer component provides a consistent footer across screens.
// Internal Dependency: Footer (src/web/src/components/Footer.tsx)
// Purpose: To provide a consistent footer across screens.
import Footer from '../components/Footer';

// RewardAnimation displays engaging animations and plays sound upon puzzle completion.
// Internal Dependency: RewardAnimation (src/web/src/components/RewardAnimation.tsx)
// Purpose: To display engaging animations and play sound upon puzzle completion.
import RewardAnimation from '../components/RewardAnimation';

// ProgressBar visually represents the user's progress through puzzles.
// Internal Dependency: ProgressBar (src/web/src/components/ProgressBar.tsx)
// Purpose: To visually represent the user's progress through puzzles.
import ProgressBar from '../components/ProgressBar';

// Styles from MobileStyles ensure consistent styling across mobile components.
// Internal Dependency: MobileStyles (src/web/src/mobile/styles/MobileStyles.ts)
// Purpose: To ensure consistent styling across mobile components.
import { styles } from '../mobile/styles/MobileStyles';

// useMobileOrientation adjusts the layout based on the device's orientation.
// Internal Dependency: useMobileOrientation (src/web/src/mobile/hooks/useMobileOrientation.ts)
// Purpose: To adjust the layout based on the device's orientation.
import useMobileOrientation from '../mobile/hooks/useMobileOrientation';

// ClapSound provides a clapping sound effect for positive reinforcement.
// Internal Dependency: ClapSound (src/web/src/assets/sounds/ClapSound.mp3)
// Purpose: To provide a clapping sound effect for positive reinforcement.
import ClapSound from '../assets/sounds/ClapSound.mp3';

// RewardAnimationVideo provides visual feedback and encouragement upon puzzle completion.
// Internal Dependency: RewardAnimationVideo (src/web/src/assets/videos/RewardAnimation.mp4)
// Purpose: To provide visual feedback and encouragement upon puzzle completion.
import RewardAnimationVideo from '../assets/videos/RewardAnimation.mp4';

/**
 * RewardScreen Component
 * 
 * Renders the reward screen, displaying animations and playing sound effects to celebrate the user's achievements.
 * 
 * Requirements Addressed:
 * - User Interface (Technical Specification/Feature 6: User Interface)
 *   - TR-6.1: Utilize responsive design principles to ensure compatibility across various device screen sizes.
 *     - Applied through responsive styles and use of useMobileOrientation hook to adjust layout.
 *   - TR-6.3: Incorporate vibrant color schemes and engaging animations to maintain user interest.
 *     - Implemented via RewardAnimation component and styles.
 *   - TR-6.4: Ensure smooth transitions and animations to provide immediate feedback upon user interactions.
 *     - Achieved through RewardAnimation and playing ClapSound upon completion.
 *   - TR-6.6: Optimize touch gestures to be simple and intuitive for young users.
 *     - The screen components are designed with large touch areas and simple interactions.
 * 
 * Steps:
 * 1. Import necessary modules and components.
 * 2. Define the RewardScreen component using a functional component structure.
 * 3. Adjust layout based on device's orientation using useMobileOrientation.
 * 4. Apply styles from MobileStyles for consistent and responsive design.
 * 5. Render Header and Footer components for consistent layout.
 * 6. Integrate RewardAnimation to display animations and play ClapSound.
 * 7. Use ProgressBar to show the user's progress.
 * 
 * @returns {JSX.Element} The rendered reward screen component.
 */
const RewardScreen: React.FC = () => {
  // Step 3: Utilize custom hook to determine device orientation.
  // Requirement Addressed: Adjust layout based on the device's orientation.
  // Internal Dependency: useMobileOrientation (src/web/src/mobile/hooks/useMobileOrientation.ts)
  const { isPortrait } = useMobileOrientation();

  // Step 4: Apply styles from MobileStyles for consistent and responsive design.
  // Requirement Addressed: TR-6.1 (responsive design principles).
  const containerStyle = isPortrait ? styles.containerPortrait : styles.containerLandscape;

  return (
    <div style={containerStyle}>
      {/* Step 5: Render Header component for consistent layout.
          - Provides a consistent header across screens.
          - Internal Dependency: Header (src/web/src/components/Header.tsx)
      */}
      <Header />

      <div style={styles.content}>
        {/* Step 6: Integrate RewardAnimation to display animations and play ClapSound.
            - Addresses TR-6.3 and TR-6.4 (engaging animations and immediate feedback).
            - Internal Dependencies:
              - RewardAnimation (src/web/src/components/RewardAnimation.tsx)
              - ClapSound (src/web/src/assets/sounds/ClapSound.mp3)
              - RewardAnimationVideo (src/web/src/assets/videos/RewardAnimation.mp4)
        */}
        <RewardAnimation
          animationSource={RewardAnimationVideo}
          soundSource={ClapSound}
        />

        {/* Step 7: Use ProgressBar to show the user's progress.
            - Visually represents the user's progress through puzzles.
            - Internal Dependency: ProgressBar (src/web/src/components/ProgressBar.tsx)
        */}
        <ProgressBar />
      </div>

      {/* Step 5: Render Footer component for consistent layout.
          - Provides a consistent footer across screens.
          - Internal Dependency: Footer (src/web/src/components/Footer.tsx)
      */}
      <Footer />
    </div>
  );
};

export default RewardScreen;