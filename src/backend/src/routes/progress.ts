// src/backend/src/routes/progress.ts

/**
 * This file defines the routes for handling HTTP requests related to user progress in the Toddler Puzzle App.
 * It sets up endpoints for creating, retrieving, updating, and deleting progress records, ensuring that user
 * progress is accurately managed and stored.
 *
 * Requirements Addressed:
 * - Progress Data Management: Handles CRUD operations and business logic related to user progress data.
 *   Location: SYSTEM ARCHITECTURE/Backend Server
 */

import express from 'express'; // Version 4.17.1 - To create and manage the Express router.

// Internal Dependencies
import { ProgressController } from '../controllers/ProgressController'; // To handle HTTP requests and business logic for progress-related operations.
import { authenticateRequest } from '../middlewares/AuthMiddleware'; // To ensure requests are authenticated before accessing progress services.
import { handleError } from '../middlewares/ErrorMiddleware'; // To handle errors and send standardized error responses.
import { rateLimiter } from '../middlewares/RateLimiterMiddleware'; // To limit the number of requests a client can make within a specified time window.

/**
 * Sets up the Express router with routes for managing user progress.
 *
 * @returns The configured Express router with progress routes.
 *
 * Steps:
 * 1. Import the necessary modules and middlewares.
 * 2. Initialize an Express router instance.
 * 3. Define a POST route for creating progress records, using authenticateRequest and rateLimiter middlewares,
 *    and ProgressController.createProgress as the handler.
 * 4. Define a GET route for retrieving progress records by user ID, using authenticateRequest and rateLimiter middlewares,
 *    and ProgressController.getProgressByUserId as the handler.
 * 5. Define a PUT route for updating progress records, using authenticateRequest and rateLimiter middlewares,
 *    and ProgressController.updateProgress as the handler.
 * 6. Define a DELETE route for deleting progress records, using authenticateRequest and rateLimiter middlewares,
 *    and ProgressController.deleteProgress as the handler.
 * 7. Use handleError middleware to manage errors for all routes.
 * 8. Return the configured router.
 */
export function setupProgressRoutes(): express.Router {
  // Requirements Addressed:
  // - Progress Data Management: Handles CRUD operations and business logic related to user progress data.
  //   Location: SYSTEM ARCHITECTURE/Backend Server

  // Step 2: Initialize an Express router instance.
  const router = express.Router();

  // Step 3: Define a POST route for creating progress records.
  // This route allows authenticated users to create new progress records.
  // Middlewares: authenticateRequest, rateLimiter
  // Handler: ProgressController.createProgress
  router.post(
    '/progress',
    authenticateRequest,
    rateLimiter,
    ProgressController.createProgress
  );

  // Step 4: Define a GET route for retrieving progress records by user ID.
  // This route allows authenticated users to retrieve their progress records by user ID.
  // Middlewares: authenticateRequest, rateLimiter
  // Handler: ProgressController.getProgressByUserId
  router.get(
    '/progress/:userId',
    authenticateRequest,
    rateLimiter,
    ProgressController.getProgressByUserId
  );

  // Step 5: Define a PUT route for updating progress records.
  // This route allows authenticated users to update existing progress records.
  // Middlewares: authenticateRequest, rateLimiter
  // Handler: ProgressController.updateProgress
  router.put(
    '/progress/:progressId',
    authenticateRequest,
    rateLimiter,
    ProgressController.updateProgress
  );

  // Step 6: Define a DELETE route for deleting progress records.
  // This route allows authenticated users to delete existing progress records.
  // Middlewares: authenticateRequest, rateLimiter
  // Handler: ProgressController.deleteProgress
  router.delete(
    '/progress/:progressId',
    authenticateRequest,
    rateLimiter,
    ProgressController.deleteProgress
  );

  // Step 7: Use handleError middleware to manage errors for all routes.
  // This middleware handles any errors that occur in the route handlers and sends a standardized error response.
  router.use(handleError);

  // Step 8: Return the configured router with progress routes.
  return router;
}