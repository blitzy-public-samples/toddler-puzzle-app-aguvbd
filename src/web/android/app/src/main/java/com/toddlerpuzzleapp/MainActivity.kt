// Version 1.0
import android.app.Activity
// Version 1.0
import android.os.Bundle
import android.widget.Button
import android.content.Intent
import android.net.ConnectivityManager
import android.net.NetworkInfo
import com.toddlerpuzzleapp.R

class MainActivity : Activity() {

    /**
     * Handles the creation of the activity, setting up the UI and initializing components.
     *
     * Requirements Addressed:
     * - User Interface (Technical Requirements/Feature 6: User Interface)
     *   - TR-6.2: Implement large, easily tappable buttons and icons to facilitate ease of use for toddlers.
     *   - TR-6.4: Ensure smooth transitions and animations to provide immediate feedback upon user interactions.
     * - Offline Playability (Technical Requirements/Feature 4: Offline Playability)
     *   - TR-4.4: Develop mechanisms to detect offline status and adjust app functionality accordingly.
     *
     * @param savedInstanceState Bundle containing the activity's previously saved state.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState) // Step 1: Call the superclass's onCreate method.

        // Step 2: Set the content view to the activity's layout.
        // The layout file should be defined in 'res/layout/activity_main.xml'.
        // Internal Dependency: 'strings.xml' for string resources.
        setContentView(R.layout.activity_main)

        // Step 3: Initialize UI components and set up event listeners.
        // Internal Dependency: 'splash_screen.xml' for splash screen layout.
        val startButton: Button = findViewById(R.id.startButton)
        startButton.setOnClickListener {
            // Ensure smooth transition to the main features of the app.
            // TR-6.4: Smooth transitions upon user interactions.
            val intent = Intent(this, PuzzleActivity::class.java)
            startActivity(intent)
        }

        // Step 4: Check for saved instance state to restore previous state if necessary.
        if (savedInstanceState != null) {
            // Restore the previous state of the activity.
            // This could include restoring UI elements or variables.
        }

        // Additional initialization code can be added here.

        // Detect offline status and adjust app functionality accordingly.
        val connectivityManager = getSystemService(CONNECTIVITY_SERVICE) as ConnectivityManager
        val networkInfo: NetworkInfo? = connectivityManager.activeNetworkInfo
        val isOnline = networkInfo?.isConnected == true

        if (!isOnline) {
            // The device is offline.
            // Adjust app functionality accordingly.
            // Requirements Addressed:
            // - Offline Playability (Technical Requirements/Feature 4: Offline Playability)
            //   - TR-4.4: Adjust app functionality based on network status.
            // For example, disable features that require internet or notify the user.
        }
    }
}