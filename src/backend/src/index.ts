// Import necessary modules and functions

// External Dependency:
// "http" module is a Node.js built-in module used to create an HTTP server.
// Version: Node.js built-in
import * as http from 'http';

// Internal Dependency:
// Importing initializeApp function to initialize the Express application with middleware and routes.
// Module path: src/backend/src/app.ts
import { initializeApp } from './app';

// Global Variables:
// Defining PORT to use the environment variable PORT or default to 3000.
// This allows flexible configuration of the server port.
// This addresses TR-11.3 in TECHNICAL REQUIREMENTS - Feature 11: Performance Optimization
const PORT = process.env.PORT || 3000;

// Function: startServer
// Description:
// Starts the HTTP server and listens on the specified port.
// This function addresses the "Backend Server Initialization" requirement.
// Location in Documentation: SYSTEM ARCHITECTURE -> Backend Server
function startServer(): void {
    // Step 1: Initialize the Express application with middleware and routes.
    // The initializeApp function sets up the necessary middleware and routes as per the application requirements.
    const app = initializeApp();

    // Step 2: Create an HTTP server using the Express application.
    // This creates a server instance that can handle HTTP requests.
    const server = http.createServer(app);

    // Step 3: Set the server to listen on the specified PORT.
    // This binds the server to the network port defined by the PORT variable.
    server.listen(PORT, () => {
        console.log(`Server is running and listening on port ${PORT}`);
        // Logging the server status addresses TR-11.4 in TECHNICAL REQUIREMENTS - Feature 11: Performance Optimization
    });

    // Step 4: Handle server shutdown gracefully to close connections and free resources.
    // This ensures that the server can terminate without leaving hanging processes or locked resources.
    // Addresses TR-4.4 in TECHNICAL REQUIREMENTS - Feature 4: Offline Playability
    const gracefulShutdown = () => {
        console.log('Received kill signal, shutting down gracefully');
        server.close(() => {
            console.log('Closed out remaining connections');
            // Exit process after closing server
            process.exit(0);
        });

        // Force kill server if it doesn't close within a timeout
        setTimeout(() => {
            console.error('Could not close connections in time, forcing shutdown');
            process.exit(1);
        }, 10000);
    };

    // Listening for termination signals to initiate graceful shutdown
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
}

// Start the server by invoking the startServer function.
startServer();