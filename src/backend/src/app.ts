/**
 * @file app.ts
 * @description Initializes and configures the Express application for the Toddler Puzzle App's backend.
 * Sets up middleware, routes, and other essential components to handle HTTP requests and responses.
 *
 * Requirements Addressed:
 * - Backend Server Initialization
 *   - Location: SYSTEM ARCHITECTURE/Backend Server
 *   - Description: Initializes the Express application, configures middleware, and sets up routes for handling HTTP requests.
 */

// Import necessary modules and dependencies.

// Import Express to create and configure the application (version 4.17.1).
import express from 'express'; // Version 4.17.1

// Import third-party middleware.
import cors from 'cors'; // Enable Cross-Origin Resource Sharing.
import bodyParser from 'body-parser'; // Parse incoming request bodies.

// Import internal middleware.
import AuthMiddleware from './middlewares/AuthMiddleware'; // To authenticate requests using JWT tokens.
import ErrorMiddleware from './middlewares/ErrorMiddleware'; // To handle errors and send standardized error responses.
import RateLimiterMiddleware from './middlewares/RateLimiterMiddleware'; // To limit the number of requests a client can make to prevent abuse.

// Import route setup functions.
import setupAuthRoutes from './routes/auth'; // To configure authentication routes for the application.
import setupUserRoutes from './routes/users'; // To configure user-related routes for the application.
import setupPuzzleRoutes from './routes/puzzles'; // To configure puzzle-related routes for the application.
import setupPurchaseRoutes from './routes/purchases'; // To configure purchase-related routes for the application.
import setupProgressRoutes from './routes/progress'; // To configure progress-related routes for the application.
import setupAdminRoutes from './routes/admin'; // To configure admin-related routes for the application.

/**
 * Initializes the Express application with middleware and routes.
 *
 * Requirements Addressed:
 * - Backend Server Initialization
 *   - Location: SYSTEM ARCHITECTURE/Backend Server
 *   - Description: Initializes the Express application, configures middleware, and sets up routes for handling HTTP requests.
 *
 * @returns {express.Application} The configured Express application instance.
 */
function initializeApp(): express.Application {
  // Create an Express application instance.
  const app = express();

  // Configure global middleware such as JSON parsing and CORS.

  // Use body-parser middleware to parse JSON and URL-encoded request bodies.
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Enable Cross-Origin Resource Sharing to allow requests from different origins.
  app.use(cors());

  // Set up rate limiting middleware to prevent abuse.
  app.use(RateLimiterMiddleware);

  // Initialize routes for authentication, users, puzzles, purchases, progress, and admin actions.

  // Configure authentication routes.
  setupAuthRoutes(app);

  // Configure user-related routes.
  setupUserRoutes(app);

  // Configure puzzle-related routes.
  setupPuzzleRoutes(app);

  // Configure purchase-related routes.
  setupPurchaseRoutes(app);

  // Configure progress-related routes.
  setupProgressRoutes(app);

  // Configure admin-related routes.
  setupAdminRoutes(app);

  // Set up authentication middleware to protect routes after routing configuration.
  app.use(AuthMiddleware);

  // Set up error handling middleware to handle errors and send standardized error responses.
  app.use(ErrorMiddleware);

  // Return the configured Express application instance.
  return app;
}

// Export the initializeApp function as the default export.
export default initializeApp;