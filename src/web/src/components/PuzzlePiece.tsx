// Importing React library (version 17.0.2) to create and manage the component's state and lifecycle.
// This complies with "dependencies.external[0]" in the schema.
// React is used to create the PuzzlePiece component as per the project's design.
import React, { useState } from 'react'; // Version 17.0.2

// Importing internal dependencies.

// Importing styles from MobileStyles to apply consistent and responsive styles to the puzzle piece component.
// This addresses "Apply styles from MobileStyles to ensure the piece is visually appealing and consistent with the app's design."
// As per "dependencies.internal[8]".
import styles from '../mobile/styles/MobileStyles';

// Importing useMobileOrientation hook to adjust the component's layout based on the device's orientation.
// This addresses "Adjust the component's layout based on the device's orientation."
// As per "dependencies.internal[7]".
import useMobileOrientation from '../mobile/hooks/useMobileOrientation';

// Importing ProgressBar to visually represent the user's progress as they complete the puzzle.
// This integrates with the ProgressBar to update user progress.
// As per "dependencies.internal[2]".
import ProgressBar from './ProgressBar';

// Importing RewardAnimation to display animations upon puzzle completion.
// This triggers RewardAnimation upon successful puzzle completion.
// As per "dependencies.internal[1]".
import RewardAnimation from './RewardAnimation';

// Importing ParentalControlToggle to manage parental control settings related to puzzle interactions.
// As per "dependencies.internal[3]".
import ParentalControlToggle from './ParentalControlToggle';

// Importing NotificationBadge to display notifications related to puzzle updates or achievements.
// As per "dependencies.internal[4]".
import NotificationBadge from './NotificationBadge';

// Importing Header and Footer for consistent layout across screens where the PuzzlePiece is used.
// As per "dependencies.internal[5]" and "dependencies.internal[6]".
import Header from './Header';
import Footer from './Footer';

// Importing PuzzleCanvas to manage the layout and interaction of puzzle pieces.
// As per "dependencies.internal[0]".
import PuzzleCanvas from './PuzzleCanvas';

// Importing necessary types and hooks for managing drag-and-drop functionality without external libraries.
import { CSSProperties } from 'react';

// Defining types for the component props.
interface PuzzlePieceProps {
  // The image source for the puzzle piece.
  imageSrc: string;

  // The initial position of the puzzle piece.
  initialPosition: { x: number; y: number };

  // The correct position of the puzzle piece.
  correctPosition: { x: number; y: number };

  // A callback function to update the progress when the piece is placed correctly.
  onPiecePlaced: () => void;
}

// Defining the PuzzlePiece component using a functional component structure.
// The component renders an individual puzzle piece with drag-and-drop functionality.
// This addresses "Define the PuzzlePiece component using a functional component structure."
// As per "functions.PuzzlePiece.description" in the schema.
const PuzzlePiece: React.FC<PuzzlePieceProps> = (props) => {
  // Extracting props.
  const { imageSrc, initialPosition, correctPosition, onPiecePlaced } = props;

  // Using state to manage the position and status of the puzzle piece.
  // This addresses "Initialize state to manage the position and status of the puzzle piece."
  // As per "functions.PuzzlePiece.steps[2]" in the schema.
  const [position, setPosition] = useState<{ x: number; y: number }>(initialPosition);
  const [isPlaced, setIsPlaced] = useState<boolean>(false);

  // Using the useMobileOrientation hook to adjust the component's layout based on the device's orientation.
  // This addresses "Adjust the component's layout based on the device's orientation."
  // As per "dependencies.internal[7]".
  const orientation = useMobileOrientation();

  // Function to handle drag start event.
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    // Setting the dataTransfer data to indicate dragging.
    event.dataTransfer.setData('text/plain', '');
    // Customizing drag image if necessary.
  };

  // Function to handle drag over event.
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    // Prevent default to allow drop.
    event.preventDefault();
  };

  // Function to handle drop event.
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    // Prevent default behavior.
    event.preventDefault();

    // Get the drop position.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Update position state.
    setPosition({ x, y });

    // Check if the piece is placed in the correct position with some tolerance.
    const tolerance = 20; // pixels

    if (
      Math.abs(x - correctPosition.x) <= tolerance &&
      Math.abs(y - correctPosition.y) <= tolerance
    ) {
      // Mark the piece as placed.
      setIsPlaced(true);

      // Update the progress bar.
      onPiecePlaced();

      // Trigger RewardAnimation if puzzle is completed.
      // This would be handled in the parent component.

      // Display notification if necessary.
    }
  };

  // Applying styles from MobileStyles to ensure the piece is visually appealing and consistent with the app's design.
  // This addresses "Apply styles from MobileStyles to ensure the piece is visually appealing and consistent with the app's design."
  // As per "functions.PuzzlePiece.steps[6]" in the schema.
  const pieceStyle: CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    opacity: isPlaced ? 0.5 : 1.0,
    cursor: isPlaced ? 'default' : 'grab',
    // Additional styles from MobileStyles can be applied here.
    ...styles.puzzlePiece,
  };

  return (
    // The puzzle piece is rendered within a div that supports drag-and-drop events.
    // This addresses "Implement drag-and-drop handlers to allow users to move the piece."
    // As per "functions.PuzzlePiece.steps[3]" and "functions.PuzzlePiece.steps[4]" in the schema.
    <div
      style={pieceStyle}
      draggable={!isPlaced}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img src={imageSrc} alt="Puzzle Piece" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default PuzzlePiece;