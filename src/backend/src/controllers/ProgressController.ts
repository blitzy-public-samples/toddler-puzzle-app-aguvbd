/**
 * ProgressController
 *
 * This controller handles HTTP requests related to user progress in the Toddler Puzzle App.
 * It provides endpoints for creating, retrieving, updating, and deleting progress records,
 * ensuring that user progress is accurately managed and stored.
 *
 * Requirements Addressed:
 * - Progress Data Management (SYSTEM ARCHITECTURE/Backend Server)
 *   Handles CRUD operations and business logic related to user progress data.
 */

import express, { Request, Response, NextFunction } from 'express';
import ProgressService from '../services/ProgressService'; // Internal dependency: ProgressService
import { sendSuccessResponse, sendErrorResponse } from '../utils/ResponseHelper'; // Internal dependencies: sendSuccessResponse, sendErrorResponse
import authenticateRequest from '../middlewares/AuthMiddleware'; // Internal dependency: authenticateRequest
import handleError from '../middlewares/ErrorMiddleware'; // Internal dependency: handleError

const router = express.Router();

/**
 * @function createProgress
 * @description Handles the creation of a new progress record for a user.
 *
 * Requirements Addressed:
 * - TR-1.4 (Technical Requirements/Feature 1: Puzzle Difficulty Levels)
 *   Implement validation to ensure puzzles are solvable and pieces fit correctly.
 * - TR-4.5 (Technical Requirements/Feature 4: Offline Playability)
 *   Ensure all core functionalities are accessible offline, including puzzle completion and progress tracking.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {void} Sends a response back to the client.
 *
 * Middleware:
 * - authenticateRequest: Ensures the request is authenticated before accessing progress services.
 */
router.post(
  '/',
  authenticateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract progress data from the request body.
      const progressData = req.body;

      // Call ProgressService.createProgress with the extracted data.
      const newProgress = await ProgressService.createProgress(progressData);

      // If successful, send a success response using sendSuccessResponse.
      sendSuccessResponse(res, newProgress);
    } catch (error) {
      // If an error occurs, handle it using handleError.
      handleError(error, req, res, next);
    }
  }
);

/**
 * @function getProgressByUserId
 * @description Retrieves progress records for a specific user.
 *
 * Requirements Addressed:
 * - TR-5.4 (Technical Requirements/Feature 5: Parental Controls)
 *   Develop activity monitoring dashboards that provide insights into the child’s usage patterns.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {void} Sends a response back to the client.
 *
 * Middleware:
 * - authenticateRequest: Ensures the request is authenticated before accessing progress services.
 */
router.get(
  '/user/:userId',
  authenticateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract user ID from the request parameters.
      const userId = req.params.userId;

      // Call ProgressService.getProgressByUserId with the user ID.
      const progressRecords = await ProgressService.getProgressByUserId(userId);

      // If successful, send a success response using sendSuccessResponse.
      sendSuccessResponse(res, progressRecords);
    } catch (error) {
      // If an error occurs, handle it using handleError.
      handleError(error, req, res, next);
    }
  }
);

/**
 * @function updateProgress
 * @description Updates an existing progress record.
 *
 * Requirements Addressed:
 * - TR-4.2 (Technical Requirements/Feature 4: Offline Playability)
 *   Ensure synchronization of progress data once the device reconnects to the internet.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {void} Sends a response back to the client.
 *
 * Middleware:
 * - authenticateRequest: Ensures the request is authenticated before accessing progress services.
 */
router.put(
  '/:progressId',
  authenticateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract progress ID and update data from the request.
      const progressId = req.params.progressId;
      const updateData = req.body;

      // Call ProgressService.updateProgress with the progress ID and update data.
      const updatedProgress = await ProgressService.updateProgress(progressId, updateData);

      // If successful, send a success response using sendSuccessResponse.
      sendSuccessResponse(res, updatedProgress);
    } catch (error) {
      // If an error occurs, handle it using handleError.
      handleError(error, req, res, next);
    }
  }
);

/**
 * @function deleteProgress
 * @description Deletes a progress record.
 *
 * Requirements Addressed:
 * - TR-5.5 (Technical Requirements/Feature 5: Parental Controls)
 *   Implement functionality to reset the app to its original state upon parent’s request.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {void} Sends a response back to the client.
 *
 * Middleware:
 * - authenticateRequest: Ensures the request is authenticated before accessing progress services.
 */
router.delete(
  '/:progressId',
  authenticateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract progress ID from the request parameters.
      const progressId = req.params.progressId;

      // Call ProgressService.deleteProgress with the progress ID.
      await ProgressService.deleteProgress(progressId);

      // If successful, send a success response using sendSuccessResponse.
      sendSuccessResponse(res, { message: 'Progress deleted successfully.' });
    } catch (error) {
      // If an error occurs, handle it using handleError.
      handleError(error, req, res, next);
    }
  }
);

export default router;