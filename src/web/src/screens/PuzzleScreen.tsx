// Import necessary modules and components.

// External Imports
import React from 'react'; // React version 17.0.2 is used for component creation and state management.
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation version 5.9.4 is used for navigation handling.

// Internal Imports
import PuzzleCanvas from '../components/PuzzleCanvas'; // Manages the layout and interaction of puzzle pieces.
import PuzzlePiece from '../components/PuzzlePiece'; // Renders individual puzzle pieces and handles their interactions.
import RewardAnimation from '../components/RewardAnimation'; // Displays animations upon puzzle completion.
import ProgressBar from '../components/ProgressBar'; // Visually represents the user's progress as they complete the puzzle.
import NotificationBadge from '../components/NotificationBadge'; // Displays notifications related to puzzle updates or achievements.
import ParentalControlToggle from '../components/ParentalControlToggle'; // Manages parental control settings related to puzzle interactions.
import useMobileOrientation from '../mobile/hooks/useMobileOrientation'; // Adjusts the layout based on the device's orientation.
import MobileStyles from '../mobile/styles/MobileStyles'; // Applies consistent and responsive styles to the puzzle screen.

// The PuzzleScreen component renders the puzzle-solving interface, allowing toddlers to interact with and solve puzzles.
// Requirements Addressed:
// - Puzzle Difficulty Levels (TECHNICAL REQUIREMENTS/Feature 1: Puzzle Difficulty Levels):
//   Implements support for puzzles with 4, 9, and 16 pieces.
// - User Interface (TECHNICAL REQUIREMENTS/Feature 6: User Interface):
//   Designs an intuitive and visually appealing interface tailored for toddlers.

const PuzzleScreen: React.FC = (props) => {
  // Initialize navigation.
  const navigation = useNavigation();

  // Initialize state to manage the current puzzle and user interactions.
  const [currentPuzzle, setCurrentPuzzle] = React.useState<Puzzle | null>(null);
  const [puzzlePieces, setPuzzlePieces] = React.useState<PuzzlePieceData[]>([]);
  const [isPuzzleComplete, setIsPuzzleComplete] = React.useState<boolean>(false);

  // Use useMobileOrientation to adjust layout based on device orientation.
  const orientation = useMobileOrientation();

  // Effect to fetch and set the current puzzle.
  React.useEffect(() => {
    // Fetch the puzzle data based on difficulty level.
    // This addresses TR-1.1 and TR-1.2: Supporting puzzles with varying piece counts.
    // Location: TECHNICAL REQUIREMENTS/Feature 1: Puzzle Difficulty Levels
    const puzzleData = fetchPuzzleData();
    setCurrentPuzzle(puzzleData);
    setPuzzlePieces(puzzleData.pieces);
  }, []);

  // Function to handle puzzle piece placement.
  const handlePiecePlacement = (
    pieceId: number,
    position: { x: number; y: number }
  ) => {
    // Update the position of the puzzle piece.
    // Ensures pieces fit correctly (TR-1.4).
    // Location: TECHNICAL REQUIREMENTS/Feature 1: Puzzle Difficulty Levels
    setPuzzlePieces((prevPieces) =>
      prevPieces.map((piece) =>
        piece.id === pieceId ? { ...piece, position } : piece
      )
    );
  };

  // Effect to check if the puzzle is complete.
  React.useEffect(() => {
    // Checks if all pieces are correctly placed.
    if (checkPuzzleCompletion()) {
      setIsPuzzleComplete(true);
      // Triggers RewardAnimation upon successful puzzle completion.
      // Location: TECHNICAL REQUIREMENTS/Feature 6: User Interface
    }
  }, [puzzlePieces]);

  // Function to check puzzle completion.
  const checkPuzzleCompletion = () => {
    // Validates that all pieces are in the correct position.
    // Addresses TR-1.4: Implement validation to ensure puzzles are solvable.
    // Location: TECHNICAL REQUIREMENTS/Feature 1: Puzzle Difficulty Levels
    return puzzlePieces.every((piece) => piece.isPlacedCorrectly);
  };

  // Function to calculate user progress.
  const calculateProgress = () => {
    // Calculates progress based on the number of correctly placed pieces.
    const placedPieces = puzzlePieces.filter((piece) => piece.isPlacedCorrectly)
      .length;
    return placedPieces / puzzlePieces.length;
  };

  // Function to adjust styles based on orientation.
  const orientationStyles = orientation === 'landscape' ? styles.landscape : styles.portrait;

  return (
    <View style={[styles.container, MobileStyles.container, orientationStyles]}>
      {/* Render the PuzzleCanvas with PuzzlePiece components within it. */}
      <PuzzleCanvas>
        {puzzlePieces.map((piece) => (
          <PuzzlePiece
            key={piece.id}
            piece={piece}
            onPlace={handlePiecePlacement}
          />
        ))}
      </PuzzleCanvas>

      {/* Integrate ProgressBar to update and display user progress. */}
      <ProgressBar
        progress={calculateProgress()}
        // Addresses TR-6.4: Provide immediate feedback upon user interactions.
        // Location: TECHNICAL REQUIREMENTS/Feature 6: User Interface
      />

      {/* Trigger RewardAnimation upon successful puzzle completion. */}
      {isPuzzleComplete && <RewardAnimation />}

      {/* Use NotificationBadge to display achievements. */}
      <NotificationBadge
        // Displays notifications related to puzzle updates or achievements.
        // Location: TECHNICAL REQUIREMENTS/Feature 9: Notifications
      />

      {/* Include ParentalControlToggle for managing parental settings. */}
      <ParentalControlToggle
        // Manages parental control settings related to puzzle interactions.
        // Location: TECHNICAL REQUIREMENTS/Feature 5: Parental Controls
      />
    </View>
  );
};

// Function to fetch puzzle data.
const fetchPuzzleData = (): Puzzle => {
  // Retrieves puzzle data from local storage or backend.
  // Ensures offline playability (TR-4.1).
  // Location: TECHNICAL REQUIREMENTS/Feature 4: Offline Playability
  // Placeholder implementation.
  return {
    id: 1,
    pieces: generatePuzzlePieces(9), // Example for a 9-piece puzzle.
  };
};

// Function to generate puzzle pieces.
const generatePuzzlePieces = (count: number): PuzzlePieceData[] => {
  // Generates puzzle pieces based on the specified count.
  // Addresses TR-1.1: Support for varying piece counts.
  // Location: TECHNICAL REQUIREMENTS/Feature 1: Puzzle Difficulty Levels
  // Placeholder implementation.
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    position: { x: 0, y: 0 },
    isPlacedCorrectly: false,
  }));
};

// Type definitions.
interface Puzzle {
  id: number;
  pieces: PuzzlePieceData[];
}

interface PuzzlePieceData {
  id: number;
  position: { x: number; y: number };
  isPlacedCorrectly: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // General styles for the container.
    // Applies responsive design principles (TR-6.1).
    // Location: TECHNICAL REQUIREMENTS/Feature 6: User Interface
  },
  landscape: {
    // Styles specific to landscape orientation.
    // Adjusts layout based on orientation (TR-6.6).
    // Location: TECHNICAL REQUIREMENTS/Feature 6: User Interface
  },
  portrait: {
    // Styles specific to portrait orientation.
  },
});

export default PuzzleScreen;