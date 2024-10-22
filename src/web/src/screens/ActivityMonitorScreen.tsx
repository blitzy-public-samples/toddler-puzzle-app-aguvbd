/**
 * ActivityMonitorScreen.tsx
 *
 * This screen provides parents with a detailed view of their child's puzzle completion history,
 * including graphical representations of progress over time and a list of completed puzzles with dates and themes.
 *
 * Requirements Addressed:
 * - Parental Controls
 *   - Location: Technical Specification/Feature 5: Parental Controls
 *   - Description: Provide parents with robust tools to manage content, control purchases,
 *     set usage limits, and monitor their child’s activity, ensuring a safe and controlled environment.
 */

import React from 'react'; // React version 17.0.2

// Internal dependencies
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import NotificationBadge from '../components/NotificationBadge';
import useMobileOrientation from '../mobile/hooks/useMobileOrientation';
import { MobileStyles } from '../mobile/styles/MobileStyles';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'; // React Native components for layout and styling

/**
 * ActivityMonitorScreen Component
 *
 * Renders the activity monitor screen, providing a detailed view of the child's puzzle completion history.
 *
 * Steps:
 * 1. Import necessary modules and components.
 * 2. Define the ActivityMonitorScreen component using a functional component structure.
 * 3. Render the Header component for consistent navigation.
 * 4. Display a graphical representation of the child's progress over time.
 * 5. List completed puzzles with details such as dates and themes.
 * 6. Integrate the ProgressBar to show overall progress.
 * 7. Use the NotificationBadge to alert parents of new activity updates.
 * 8. Apply styles from MobileStyles to ensure the screen is visually appealing and consistent with the app's design.
 * 9. Render the Footer component for consistent navigation.
 */

const ActivityMonitorScreen: React.FC = () => {
  // Adjust the layout based on the device's orientation
  const { isPortrait } = useMobileOrientation();

  // Sample data representing the child's progress over time
  // In a production environment, this data would be fetched from an API or global state
  const progressData = [
    { date: '2023-10-01', puzzlesCompleted: 2 },
    { date: '2023-10-02', puzzlesCompleted: 3 },
    { date: '2023-10-03', puzzlesCompleted: 1 },
    // ...additional data points
  ];

  // Sample data representing the list of completed puzzles
  const completedPuzzles = [
    { date: '2023-10-01', theme: 'Animals', title: 'Lion Puzzle' },
    { date: '2023-10-02', theme: 'Vehicles', title: 'Car Puzzle' },
    { date: '2023-10-03', theme: 'Nature', title: 'Tree Puzzle' },
    // ...additional completed puzzles
  ];

  return (
    <View style={styles.container}>
      {/* Header component for consistent navigation */}
      <Header />

      {/* NotificationBadge to display notifications related to activity updates */}
      {/* Addresses: Parental Controls (Feature 5, TR-5.4) */}
      <NotificationBadge />

      {/* Content wrapped in ScrollView to handle content overflow */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Graphical representation of progress over time */}
        {/* Addresses: Parental Controls (Feature 5, TR-5.4) */}
        <Text style={styles.sectionTitle}>Progress Over Time</Text>
        <View style={styles.graphContainer}>
          {/* Placeholder for graph component */}
          <Text style={styles.graphPlaceholder}>Graph Component Placeholder</Text>
        </View>

        {/* List of completed puzzles with dates and themes */}
        {/* Addresses: Parental Controls (Feature 5, TR-5.4) */}
        <Text style={styles.sectionTitle}>Completed Puzzles</Text>
        {completedPuzzles.map((puzzle, index) => (
          <View key={index} style={styles.puzzleItem}>
            <Text style={styles.puzzleDate}>{puzzle.date}</Text>
            <Text style={styles.puzzleTitle}>{puzzle.title}</Text>
            <Text style={styles.puzzleTheme}>{puzzle.theme}</Text>
          </View>
        ))}

        {/* ProgressBar to show overall progress */}
        {/* Addresses: Parental Controls (Feature 5, TR-5.4) */}
        <Text style={styles.sectionTitle}>Overall Progress</Text>
        <ProgressBar progress={0.7} />

        {/* Apply styles from MobileStyles for consistent styling */}
        {/* Addresses: User Interface consistency (Feature 6, TR-6.1) */}
      </ScrollView>

      {/* Footer component for consistent navigation */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    ...MobileStyles.container, // Incorporate styles from MobileStyles
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    ...MobileStyles.text, // Use text styles from MobileStyles
  },
  graphContainer: {
    height: 200,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  graphPlaceholder: {
    fontSize: 16,
    color: '#888888',
  },
  puzzleItem: {
    backgroundColor: '#EFEFEF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  puzzleDate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  puzzleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  puzzleTheme: {
    fontSize: 16,
    color: '#333333',
  },
  progressBarContainer: {
    marginVertical: 32,
  },
});

export default ActivityMonitorScreen;