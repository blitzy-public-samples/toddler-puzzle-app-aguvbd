// src/web/src/components/ProgressBar.tsx

// Import necessary modules and components.

// Importing React to create and manage the component's state and lifecycle.
// Version: react 17.0.2
import React from 'react';

// Internal dependencies for consistent UI elements.

// Header provides a consistent header across screens where the ProgressBar is used.
// Module: src/web/src/components/Header.tsx
import Header from './Header';

// Footer provides a consistent footer across screens where the ProgressBar is used.
// Module: src/web/src/components/Footer.tsx
import Footer from './Footer';

// NotificationBadge displays notifications related to progress updates.
// Module: src/web/src/components/NotificationBadge.tsx
import NotificationBadge from './NotificationBadge';

// ParentalControlToggle allows parents to manage settings related to progress tracking.
// Module: src/web/src/components/ParentalControlToggle.tsx
import ParentalControlToggle from './ParentalControlToggle';

// RewardAnimation displays animations upon reaching progress milestones.
// Module: src/web/src/components/RewardAnimation.tsx
import RewardAnimation from './RewardAnimation';

// Import styles to ensure the progress bar is visually appealing and consistent with the app's design.
// This relates to Technical Specification/Feature 6: User Interface, TR-6.3: Incorporate vibrant color schemes and engaging animations.
import './ProgressBar.css';

// Define the props interface for the ProgressBar component.

// ProgressBarProps defines the type for the progress parameter.
// The progress parameter determines the fill level of the progress bar.
// This addresses Technical Specification/Feature 6: User Interface, ensuring clear indication of user progress.

interface ProgressBarProps {
  progress: number; // The user's progress percentage (0 to 100).
}

// Define the ProgressBar component using a functional component structure.

// The ProgressBar component renders a progress bar to visually represent the user's progress through puzzles.
// It addresses the following requirements:
// - Technical Specification/Feature 6: User Interface
//   - TR-6.1: Utilize responsive design principles for compatibility across devices.
//   - TR-6.2: Implement large, easily tappable elements for toddlers.
//   - TR-6.3: Incorporate vibrant colors and animations to maintain interest.
//   - TR-6.4: Ensure smooth animations for immediate feedback upon interactions.

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Ensure the progress value is clamped between 0 and 100 to prevent overflow.
  // This maintains UI integrity as per TR-6.1.
  const progressBarWidth = Math.min(Math.max(progress, 0), 100);

  // Determine if the RewardAnimation should be displayed upon reaching milestones.
  // This fulfills TR-6.3 and TR-6.4 by adding engaging animations.
  const showRewardAnimation = progressBarWidth >= 100;

  return (
    <div className="progress-bar-container">
      {/* Integrate Header for consistent UI placement.
          Dependency purpose: Provides a consistent header across screens. */}
      <Header />

      {/* Main progress bar content */}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressBarWidth}%` }}
        >
          {/* Display the progress percentage as text.
              This aids in simple navigation as per TR-6.2. */}
          <span className="progress-bar-text">{`${progressBarWidth}%`}</span>
        </div>
      </div>

      {/* Display NotificationBadge for progress updates.
          Dependency purpose: Shows notifications related to progress. */}
      <NotificationBadge />

      {/* Include ParentalControlToggle to manage progress tracking settings.
          Dependency purpose: Allows parents to manage settings. */}
      <ParentalControlToggle />

      {/* Display RewardAnimation upon reaching progress milestones.
          This adds engaging animations, addressing TR-6.3 and TR-6.4. */}
      {showRewardAnimation && <RewardAnimation />}

      {/* Integrate Footer for consistent UI placement.
          Dependency purpose: Provides a consistent footer across screens. */}
      <Footer />
    </div>
  );
};

export default ProgressBar;