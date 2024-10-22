// src/backend/src/services/AdminService.ts

// Importing necessary modules and services
import { AdminLogModel } from '../models/AdminLogModel';
import { AIImageService } from './AIImageService';
import { initializeLogger } from '../utils/Logger';
import { sendSuccessResponse, sendErrorResponse } from '../utils/ResponseHelper';

// Initialize logger for AdminService
const logger = initializeLogger('AdminService');

/**
 * Approves an AI-generated image, logs the action, and updates the database.
 * 
 * Addresses requirements:
 * - Feature 7: Admin Controls (TECHNICAL REQUIREMENTS/Feature 7: Admin Controls)
 *   - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
 *   - TR-7.3: Ensure that all administrative actions are logged for auditing purposes.
 * 
 * @param imageId - The unique identifier of the image to approve.
 * @returns True if the image was successfully approved, otherwise false.
 */
export async function approveImage(imageId: number): Promise<boolean> {
    try {
        // Step 1: Validate the imageId.
        // Ensure that imageId is a valid number and greater than zero.
        if (!imageId || typeof imageId !== 'number' || imageId <= 0) {
            logger.error(`Invalid imageId provided: ${imageId}`);
            return false;
        }

        // Step 2: Call AIImageService to approve the image.
        // Interact with the AIImageService to approve the image.
        const isApproved = await AIImageService.approveImage(imageId);
        if (!isApproved) {
            logger.error(`Failed to approve image with ID: ${imageId}`);
            return false;
        }

        // Step 3: Log the approval action using AdminLogModel.
        // Create a new log entry for the approval action.
        const logEntry = new AdminLogModel({
            adminId: null, // TODO: Replace with the actual admin ID performing the action.
            action: 'approve',
            imageId: imageId,
            timestamp: new Date()
        });
        await logEntry.save();

        // Log success message indicating the image was approved.
        logger.info(`Image with ID ${imageId} approved successfully.`);

        // Step 4: Return true if the operation was successful.
        return true;
    } catch (error) {
        // Log the error with detailed information.
        logger.error(`An error occurred while approving image with ID ${imageId}: ${error.message}`);
        return false;
    }
}

/**
 * Deletes an AI-generated image, logs the action, and updates the database.
 * 
 * Addresses requirements:
 * - Feature 7: Admin Controls (TECHNICAL REQUIREMENTS/Feature 7: Admin Controls)
 *   - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
 *   - TR-7.3: Ensure that all administrative actions are logged for auditing purposes.
 * 
 * @param imageId - The unique identifier of the image to delete.
 * @returns True if the image was successfully deleted, otherwise false.
 */
export async function deleteImage(imageId: number): Promise<boolean> {
    try {
        // Step 1: Validate the imageId.
        // Ensure that imageId is a valid number and greater than zero.
        if (!imageId || typeof imageId !== 'number' || imageId <= 0) {
            logger.error(`Invalid imageId provided: ${imageId}`);
            return false;
        }

        // Step 2: Call AIImageService to delete the image.
        // Interact with the AIImageService to delete the image.
        const isDeleted = await AIImageService.deleteImage(imageId);
        if (!isDeleted) {
            logger.error(`Failed to delete image with ID: ${imageId}`);
            return false;
        }

        // Step 3: Log the deletion action using AdminLogModel.
        // Create a new log entry for the deletion action.
        const logEntry = new AdminLogModel({
            adminId: null, // TODO: Replace with the actual admin ID performing the action.
            action: 'delete',
            imageId: imageId,
            timestamp: new Date()
        });
        await logEntry.save();

        // Log success message indicating the image was deleted.
        logger.info(`Image with ID ${imageId} deleted successfully.`);

        // Step 4: Return true if the operation was successful.
        return true;
    } catch (error) {
        // Log the error with detailed information.
        logger.error(`An error occurred while deleting image with ID ${imageId}: ${error.message}`);
        return false;
    }
}