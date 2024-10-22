// RewardAnimation.tsx
// This component displays a reward animation upon puzzle completion.

// Requirements Addressed:
// - TR-6.3: Incorporate vibrant color schemes and engaging animations to maintain user interest.
//   (Technical Requirements / Feature 6: User Interface / TR-6.3)
// - TR-6.4: Ensure smooth transitions and animations to provide immediate feedback upon user interactions.
//   (Technical Requirements / Feature 6: User Interface / TR-6.4)
// - User Interface Design: Clapping sound and balloons animation on completion.
//   (User Interface Design / 3. Puzzle Screen)

// External Dependencies:

import React, { useEffect } from 'react'; // react ^17.0.1
import { View, StyleSheet } from 'react-native'; // react-native ^0.64.0
import * as Animatable from 'react-native-animatable'; // react-native-animatable ^1.3.3
import Sound from 'react-native-sound'; // react-native-sound ^0.11.0

// Internal Dependencies:
// - Assets required for the reward animation.
import ClapSound from '../assets/sounds/ClapSound.mp3'; // Clapping sound effect.
import BalloonsImage from '../assets/images/RewardAnimation.mp4'; // Balloons animation video.

// Initialize the sound object.
Sound.setCategory('Playback'); // Sets the audio category for playback.

const clapSound = new Sound(ClapSound, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.error('Failed to load the sound', error);
        return;
    }
    // Sound loaded successfully.
});

/**
 * RewardAnimation Component
 *
 * Displays an engaging reward animation with sound upon puzzle completion to provide immediate feedback
 * and maintain user interest.
 *
 * Requirements Addressed:
 * - TR-6.3: Incorporate vibrant color schemes and engaging animations to maintain user interest.
 *   (Technical Requirements / Feature 6: User Interface / TR-6.3)
 * - TR-6.4: Ensure smooth transitions and animations to provide immediate feedback upon user interactions.
 *   (Technical Requirements / Feature 6: User Interface / TR-6.4)
 * - User Interface Design: Clapping sound and balloons animation on completion.
 *   (User Interface Design / 3. Puzzle Screen)
 */
const RewardAnimation: React.FC = () => {
    useEffect(() => {
        // Play the clapping sound effect when the component mounts.
        clapSound.play((success) => {
            if (!success) {
                console.error('Clapping sound did not play successfully');
            }
        });

        // Clean up the sound on component unmount.
        return () => {
            clapSound.stop(() => {
                console.log('Clapping sound stopped');
            });
            clapSound.release();
        };
    }, []);

    return (
        <View style={styles.container}>
            {/* Balloons animation */}
            <Animatable.Image
                animation="bounceInDown" // Animation effect for balloons image.
                iterationCount={1} // Run the animation once.
                duration={1500} // Duration of animation in milliseconds.
                source={BalloonsImage} // Source of the balloons image.
                style={styles.balloons}
                resizeMode="contain"
            />
            {/* Text congratulating the user */}
            <Animatable.Text
                animation="pulse" // Pulse animation to draw attention.
                iterationCount="infinite" // Animation repeats indefinitely.
                style={styles.congratulationsText}
            >
                Congratulations!
            </Animatable.Text>
        </View>
    );
};

// Styles for the RewardAnimation component.
const styles = StyleSheet.create({
    container: {
        // Centers content horizontally and vertically.
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Transparent to overlay on existing content.
    },
    balloons: {
        width: 200,
        height: 200,
    },
    congratulationsText: {
        fontSize: 30,
        color: '#FF1493', // Deep pink color for vibrancy.
        marginTop: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RewardAnimation;