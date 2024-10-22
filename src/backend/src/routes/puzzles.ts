// Import necessary modules and middlewares
import express from 'express'; // Version 4.17.1
import { PuzzleController } from '../controllers/PuzzleController';
import { authenticateRequest } from '../middlewares/AuthMiddleware';
import { handleError } from '../middlewares/ErrorMiddleware';
import { rateLimiter } from '../middlewares/RateLimiterMiddleware';

/**
 * Configures the Express router with routes for puzzle operations.
 *
 * Addresses Requirement: Puzzle Data Management
 * Location: SYSTEM ARCHITECTURE/Database Server
 * Description: Handles CRUD operations and business logic related to puzzle data.
 *
 * @param router - Express router instance
 * @returns void - Sets up routes on the provided router object.
 */
export function setupRoutes(router: express.Router): void {
    // Initialize an Express router instance
    const puzzlesRouter = express.Router();

    /**
     * @route POST /puzzles
     * @description Creates a new puzzle
     * @access Protected
     * @middlewares authenticateRequest, rateLimiter
     * @handler PuzzleController.createPuzzle
     * @requirements
     *   - TR-2.1: Establish a reliable connection with the DALL-E API for image generation.
     *   - TR-2.3: Implement a content moderation pipeline to filter and approve images before use.
     * Location: TECHNICAL REQUIREMENTS -> Feature 2: AI-Generated Images
     */
    puzzlesRouter.post(
        '/',
        authenticateRequest,
        rateLimiter,
        PuzzleController.createPuzzle
    );

    /**
     * @route GET /puzzles/:id
     * @description Retrieves a puzzle by ID
     * @access Protected
     * @middleware authenticateRequest
     * @handler PuzzleController.getPuzzleById
     * @requirements
     *   - TR-1.2: Ensure the UI dynamically adjusts puzzle layouts based on difficulty level.
     *   - TR-4.4: Develop mechanisms to detect offline status and adjust app functionality accordingly.
     * Location: TECHNICAL REQUIREMENTS -> Feature 1: Puzzle Difficulty Levels
     */
    puzzlesRouter.get(
        '/:id',
        authenticateRequest,
        PuzzleController.getPuzzleById
    );

    /**
     * @route PUT /puzzles/:id
     * @description Updates an existing puzzle
     * @access Protected
     * @middlewares authenticateRequest, rateLimiter
     * @handler PuzzleController.updatePuzzle
     * @requirements
     *   - TR-2.4: Ensure image formats and resolutions are optimized for mobile devices.
     *   - TR-5.5: Implement functionality to reset the app to its original state upon parent’s request.
     * Location: TECHNICAL REQUIREMENTS -> Feature 2: AI-Generated Images
     */
    puzzlesRouter.put(
        '/:id',
        authenticateRequest,
        rateLimiter,
        PuzzleController.updatePuzzle
    );

    /**
     * @route DELETE /puzzles/:id
     * @description Deletes a puzzle by ID
     * @access Protected
     * @middlewares authenticateRequest, rateLimiter
     * @handler PuzzleController.deletePuzzle
     * @requirements
     *   - TR-2.3: Implement a content moderation pipeline to filter and approve images before use.
     *   - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
     * Location: TECHNICAL REQUIREMENTS -> Feature 7: Admin Controls
     */
    puzzlesRouter.delete(
        '/:id',
        authenticateRequest,
        rateLimiter,
        PuzzleController.deletePuzzle
    );

    // Apply error handling middleware to catch and process errors
    puzzlesRouter.use(handleError);

    // Mount the puzzlesRouter on the provided router
    router.use('/puzzles', puzzlesRouter);
}