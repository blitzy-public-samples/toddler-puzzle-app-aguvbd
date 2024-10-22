// Import React (v17.0.2) to create and manage the component's state and lifecycle.
import React from 'react'; // v17.0.2

// Import navigation components from React Navigation (v5.9.4) to handle tab-based navigation.
// Addressing TR-6.1: Utilize responsive design principles to ensure compatibility across various device screen sizes.
// Source: Technical Specification/Feature 6: User Interface
import { NavigationContainer } from '@react-navigation/native'; // v5.9.4
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // v5.11.11

// Import Ionicons from @expo/vector-icons (v10.0.0) for tab icons.
// Adding icons to tabs to make navigation intuitive for toddlers.
// Source: Technical Specification/Feature 6: User Interface
import { Ionicons } from '@expo/vector-icons'; // v10.0.0

// Internal imports for each screen component

// Importing HomeScreen to provide the main entry point for the app's home interface.
// Source: src/web/src/screens/HomeScreen.tsx
import HomeScreen from '../screens/HomeScreen';

// Importing PuzzleScreen to serve as the main interface for toddlers to interact with and solve puzzles.
// Source: src/web/src/screens/PuzzleScreen.tsx
import PuzzleScreen from '../screens/PuzzleScreen';

// Importing DashboardScreen to provide parents with a comprehensive overview and control panel.
// Source: src/web/src/screens/DashboardScreen.tsx
import DashboardScreen from '../screens/DashboardScreen';

// Importing PurchaseScreen to handle the display and processing of in-app purchases.
// Source: src/web/src/screens/PurchaseScreen.tsx
import PurchaseScreen from '../screens/PurchaseScreen';

// Importing ActivityMonitorScreen to provide parents with a detailed view of their child's puzzle completion history.
// Source: src/web/src/screens/ActivityMonitorScreen.tsx
import ActivityMonitorScreen from '../screens/ActivityMonitorScreen';

// Importing RewardScreen to display rewards and achievements to toddlers upon completing puzzles.
// Source: src/web/src/screens/RewardScreen.tsx
import RewardScreen from '../screens/RewardScreen';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

/**
 * MainTabNavigator Component
 * 
 * This component renders the main tab navigator, allowing users to switch between different sections of the app.
 * 
 * Requirements Addressed:
 * - Design and develop an intuitive and visually appealing user interface tailored for toddlers.
 *   - Source: Technical Specification/Feature 6: User Interface
 *     - TR-6.1: Utilize responsive design principles to ensure compatibility across various device screen sizes.
 *     - TR-6.2: Implement large, easily tappable buttons and icons to facilitate ease of use for toddlers.
 *     - TR-6.3: Incorporate vibrant color schemes and engaging animations to maintain user interest.
 *     - TR-6.4: Ensure smooth transitions and animations to provide immediate feedback upon user interactions.
 *     - TR-6.6: Optimize touch gestures to be simple and intuitive for young users.
 * 
 * @returns {JSX.Element} The rendered tab navigator component.
 */
const MainTabNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        /* Applying styles to make the tab navigator visually appealing and consistent with the app's design */
        tabBarOptions={{
          activeTintColor: '#FF69B4', // Hot Pink for active tab icon and label (TR-6.3)
          inactiveTintColor: '#808080', // Gray for inactive tab icon and label
          labelStyle: {
            fontSize: 16, // Large font size for ease of reading (TR-6.2)
          },
          style: {
            backgroundColor: '#FFF0F5', // Lavender Blush background color for the tab bar (TR-6.3)
            height: 70, // Increased height for larger touch area (TR-6.2)
            paddingBottom: 10,
          },
          tabStyle: {
            paddingTop: 10,
          },
          // Ensuring the tab icons and labels are easily accessible and tappable by toddlers
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = '';

            // Assign appropriate icons to each tab
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Puzzle') {
              iconName = focused ? 'game-controller' : 'game-controller-outline';
            } else if (route.name === 'Dashboard') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'Purchase') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Activity') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Rewards') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            }

            // Return the icon component
            return <Ionicons name={iconName} size={30} color={color} />;
            /*
            - The icons are selected to be intuitive and easily recognizable by toddlers and parents.
              - Home: 'home' icon represents the main screen.
              - Puzzle: 'game-controller' icon signifies gameplay.
              - Dashboard: 'grid' icon for an overview interface.
              - Purchase: 'cart' icon represents purchasing content.
              - Activity: 'list' icon indicates activity logs.
              - Rewards: 'trophy' icon for achievements.
            - Using Ionicons to enhance the user interface (TR-6.3).
            - Icons are larger (size 30) to be easily tappable (TR-6.2).
            - Smooth icon changes on focus provide immediate feedback (TR-6.4).
            */
          },
        })}
      >
        {/* Add tabs for each screen */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            // The Home tab provides toddlers with access to the home interface.
            // Source: src/web/src/screens/HomeScreen.tsx
            // Addresses the requirement for simple navigation (TR-6.2).
          }}
        />
        <Tab.Screen
          name="Puzzle"
          component={PuzzleScreen}
          options={{
            tabBarLabel: 'Puzzle',
            // The Puzzle tab allows toddlers to interact with and solve puzzles.
            // Source: src/web/src/screens/PuzzleScreen.tsx
            // Addresses educational engagement (Feature 1: Puzzle Difficulty Levels).
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Dashboard',
            // The Dashboard tab provides parents with controls and monitoring features.
            // Source: src/web/src/screens/DashboardScreen.tsx
            // Addresses parental oversight (Feature 5: Parental Controls).
          }}
        />
        <Tab.Screen
          name="Purchase"
          component={PurchaseScreen}
          options={{
            tabBarLabel: 'Purchase',
            // The Purchase tab handles display and processing of in-app purchases.
            // Source: src/web/src/screens/PurchaseScreen.tsx
            // Addresses monetization efficiency (Feature 3: One-Time Payment Model).
          }}
        />
        <Tab.Screen
          name="Activity"
          component={ActivityMonitorScreen}
          options={{
            tabBarLabel: 'Activity',
            // The Activity tab provides parents with their child's puzzle completion history.
            // Source: src/web/src/screens/ActivityMonitorScreen.tsx
            // Addresses parental oversight and monitoring (Feature 5: Parental Controls).
          }}
        />
        <Tab.Screen
          name="Rewards"
          component={RewardScreen}
          options={{
            tabBarLabel: 'Rewards',
            // The Rewards tab displays achievements to toddlers upon completing puzzles.
            // Source: src/web/src/screens/RewardScreen.tsx
            // Enhances user engagement (Feature 6: User Interface).
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabNavigator;