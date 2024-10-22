/**
 * This file implements the AdminController, which handles HTTP requests related to administrative actions
 * such as approving or deleting AI-generated images. It utilizes various services and models to perform these operations
 * and ensures that all actions are logged for auditing purposes.
 * 
 * Requirements Addressed:
 * - Name: Admin Controls
 * - Location: TECHNICAL REQUIREMENTS/Feature 7: Admin Controls
 * - Description: Provides administrators with tools to manage AI-generated content, including approving or deleting images to maintain quality and appropriateness.
 */

import express, { Request, Response } from 'express'; // express version 4.17.1: Provides routing functionalities for handling HTTP requests.

import { AdminService } from '../services/AdminService'; // Provides business logic for administrative tasks such as approving or deleting AI-generated images.
import { AIImageService } from '../services/AIImageService'; // Interacts with the AI image generation API for image-related operations.
import { AdminLogModel } from '../models/AdminLogModel'; // Logs administrative actions for auditing purposes.
import { authenticateRequest } from '../middlewares/AuthMiddleware'; // Ensures that only authenticated administrators can access the admin routes.
import { sendSuccessResponse, sendErrorResponse } from '../utils/ResponseHelper'; // Sends standardized success and error responses to the client.

const router = express.Router();

// Apply the authentication middleware to all admin routes.
// This ensures that only authenticated administrators can access these routes.
// Related Requirement:
// - TR-7.1: Develop an admin dashboard with secure access controls and authentication mechanisms.
router.use(authenticateRequest);

/**
 * Handles the HTTP request to approve an AI-generated image.
 * 
 * Requirements Addressed:
 * - Name: Admin Controls
 * - Location: TECHNICAL REQUIREMENTS/Feature 7: Admin Controls
 * - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
 * - TR-7.3: Ensure that all administrative actions are logged for auditing purposes.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
const approveImage = async (req: Request, res: Response): Promise<void> => {
    try {
        // Step 1: Extract imageId from the request parameters.
        const { imageId } = req.params;

        // Step 2: Call AdminService.approveImage with the imageId.
        // This service handles the business logic for approving the image.
        await AdminService.approveImage(imageId);

        // Step 3: Log the action using AdminLogModel for auditing purposes.
        // This satisfies TR-7.3 by ensuring all administrative actions are logged.
        await AdminLogModel.create({
            adminId: req.user.id, // Assuming req.user is populated by authenticateRequest middleware.
            action: `Approved image with ID: ${imageId}`,
            timestamp: new Date(),
        });

        // Step 4: Send a success response to the client using sendSuccessResponse.
        sendSuccessResponse(res, 200, 'Image approved successfully.');
    } catch (error) {
        // If an error occurs:

        // Log the error for debugging purposes.
        console.error(`Error approving image with ID ${req.params.imageId}:`, error);

        // Send an error response to the client using sendErrorResponse.
        sendErrorResponse(res, 500, 'An error occurred while approving the image.');
    }
};

/**
 * Handles the HTTP request to delete an AI-generated image.
 * 
 * Requirements Addressed:
 * - Name: Admin Controls
 * - Location: TECHNICAL REQUIREMENTS/Feature 7: Admin Controls
 * - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
 * - TR-7.3: Ensure that all administrative actions are logged for auditing purposes.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
const deleteImage = async (req: Request, res: Response): Promise<void> => {
    try {
        // Step 1: Extract imageId from the request parameters.
        const { imageId } = req.params;

        // Step 2: Call AdminService.deleteImage with the imageId.
        // This service handles the business logic for deleting the image.
        await AdminService.deleteImage(imageId);

        // Step 3: Log the action using AdminLogModel for auditing purposes.
        // This satisfies TR-7.3 by ensuring all administrative actions are logged.
        await AdminLogModel.create({
            adminId: req.user.id, // Assuming req.user is populated by authenticateRequest middleware.
            action: `Deleted image with ID: ${imageId}`,
            timestamp: new Date(),
        });

        // Step 4: Send a success response to the client using sendSuccessResponse.
        sendSuccessResponse(res, 200, 'Image deleted successfully.');
    } catch (error) {
        // If an error occurs:

        // Log the error for debugging purposes.
        console.error(`Error deleting image with ID ${req.params.imageId}:`, error);

        // Send an error response to the client using sendErrorResponse.
        sendErrorResponse(res, 500, 'An error occurred while deleting the image.');
    }
};

// Define the routes for the AdminController.

// Route to approve an AI-generated image.
// POST /admin/images/:imageId/approve
// This route allows administrators to approve images.
// Related Requirement:
// - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
router.post('/images/:imageId/approve', approveImage);

// Route to delete an AI-generated image.
// DELETE /admin/images/:imageId
// This route allows administrators to delete images.
// Related Requirement:
// - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
router.delete('/images/:imageId', deleteImage);

export default router;