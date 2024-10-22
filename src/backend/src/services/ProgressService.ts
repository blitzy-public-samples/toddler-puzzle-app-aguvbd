// External Dependencies
import { Op } from 'sequelize'; // Version 6.6.5

// Internal Dependencies
import ProgressModel from '../models/ProgressModel';
import { initializeLogger } from '../utils/Logger';
import { validateProgressData } from '../utils/Validator';
import { sendSuccessResponse, sendErrorResponse } from '../utils/ResponseHelper';
import { authenticateRequest } from '../middlewares/AuthMiddleware';

// Initialize logger for ProgressService operations
const logger = initializeLogger('ProgressService');

/**
 * ProgressService
 * Provides services related to user progress management within the Toddler Puzzle App.
 * Handles operations such as creating, updating, and retrieving user progress data.
 * 
 * Requirements Addressed:
 * - Progress Data Management (SYSTEM ARCHITECTURE/Database Server): Handles CRUD operations and business logic related to user progress data.
 */
class ProgressService {
  /**
   * Creates a new progress record for a user.
   * Steps:
   * 1. Validate the progress data using validateProgressData.
   * 2. Use ProgressModel to create a new progress record.
   * 3. Log the creation operation using initializeLogger.
   * 4. Send a success response with the created progress record using sendSuccessResponse.
   *
   * @param {object} progressData - The progress data to be created.
   * @returns {Promise<object>} - The created progress record.
   */
  async createProgress(progressData: object): Promise<object> {
    try {
      // Step 1: Validate the progress data
      const validationErrors = validateProgressData(progressData);
      if (validationErrors) {
        logger.error('Validation errors in progress data:', validationErrors);
        return sendErrorResponse('Validation Error', validationErrors);
      }

      // Step 2: Create a new progress record using ProgressModel
      const newProgress = await ProgressModel.create(progressData);

      // Step 3: Log the creation operation
      logger.info('Created new progress record', newProgress);

      // Step 4: Send a success response with the created progress record
      return sendSuccessResponse(newProgress);
    } catch (error) {
      logger.error('Error creating progress record:', error);
      return sendErrorResponse('Internal Server Error', error);
    }
  }

  /**
   * Retrieves progress records for a specific user.
   * Steps:
   * 1. Authenticate the request using authenticateRequest.
   * 2. Use ProgressModel to query progress records by user ID.
   * 3. Log the retrieval operation using initializeLogger.
   * 4. Send a success response with the retrieved progress records using sendSuccessResponse.
   *
   * @param {number} userId - The ID of the user whose progress records are to be retrieved.
   * @returns {Promise<object[]>} - A list of progress records for the user.
   */
  async getProgressByUserId(userId: number): Promise<object[]> {
    // Step 1: Authenticate the request
    if (!authenticateRequest()) {
      logger.warn('Unauthorized access attempt to get progress by user ID');
      return sendErrorResponse('Unauthorized', 'Authentication required');
    }

    try {
      // Step 2: Query progress records using ProgressModel
      const progressRecords = await ProgressModel.findAll({
        where: { userId },
      });

      // Step 3: Log the retrieval operation
      logger.info(`Retrieved progress records for user ID: ${userId}`);

      // Step 4: Send a success response with the retrieved records
      return sendSuccessResponse(progressRecords);
    } catch (error) {
      logger.error('Error retrieving progress records:', error);
      return sendErrorResponse('Internal Server Error', error);
    }
  }

  /**
   * Updates an existing progress record.
   * Steps:
   * 1. Authenticate the request using authenticateRequest.
   * 2. Validate the update data using validateProgressData.
   * 3. Use ProgressModel to update the progress record.
   * 4. Log the update operation using initializeLogger.
   * 5. Send a success response with the updated progress record using sendSuccessResponse.
   *
   * @param {number} progressId - The ID of the progress record to be updated.
   * @param {object} updateData - The data to update in the progress record.
   * @returns {Promise<object>} - The updated progress record.
   */
  async updateProgress(progressId: number, updateData: object): Promise<object> {
    // Step 1: Authenticate the request
    if (!authenticateRequest()) {
      logger.warn('Unauthorized access attempt to update progress');
      return sendErrorResponse('Unauthorized', 'Authentication required');
    }

    // Step 2: Validate the update data
    const validationErrors = validateProgressData(updateData);
    if (validationErrors) {
      logger.error('Validation errors in update data:', validationErrors);
      return sendErrorResponse('Validation Error', validationErrors);
    }

    try {
      // Step 3: Update the progress record using ProgressModel
      const [rowsUpdated, [updatedProgress]] = await ProgressModel.update(updateData, {
        where: { id: progressId },
        returning: true,
      });

      if (rowsUpdated === 0) {
        logger.warn(`No progress record found with ID: ${progressId}`);
        return sendErrorResponse('Not Found', 'Progress record not found');
      }

      // Step 4: Log the update operation
      logger.info(`Updated progress record with ID: ${progressId}`);

      // Step 5: Send a success response with the updated progress record
      return sendSuccessResponse(updatedProgress);
    } catch (error) {
      logger.error('Error updating progress record:', error);
      return sendErrorResponse('Internal Server Error', error);
    }
  }

  /**
   * Deletes a progress record.
   * Steps:
   * 1. Authenticate the request using authenticateRequest.
   * 2. Use ProgressModel to delete the progress record.
   * 3. Log the deletion operation using initializeLogger.
   * 4. Send a success response if deletion was successful using sendSuccessResponse,
   *    otherwise send an error response using sendErrorResponse.
   *
   * @param {number} progressId - The ID of the progress record to be deleted.
   * @returns {Promise<boolean>} - True if deletion was successful, otherwise false.
   */
  async deleteProgress(progressId: number): Promise<boolean> {
    // Step 1: Authenticate the request
    if (!authenticateRequest()) {
      logger.warn('Unauthorized access attempt to delete progress');
      return sendErrorResponse('Unauthorized', 'Authentication required');
    }

    try {
      // Step 2: Delete the progress record using ProgressModel
      const deletedRows = await ProgressModel.destroy({
        where: { id: progressId },
      });

      // Step 3: Log the deletion operation
      logger.info(`Deleted progress record with ID: ${progressId}`);

      // Step 4: Send appropriate response based on deletion result
      if (deletedRows > 0) {
        return sendSuccessResponse({ message: 'Progress record deleted successfully' });
      } else {
        logger.warn(`No progress record found with ID: ${progressId}`);
        return sendErrorResponse('Not Found', 'Progress record not found');
      }
    } catch (error) {
      logger.error('Error deleting progress record:', error);
      return sendErrorResponse('Internal Server Error', error);
    }
  }
}

export default new ProgressService();