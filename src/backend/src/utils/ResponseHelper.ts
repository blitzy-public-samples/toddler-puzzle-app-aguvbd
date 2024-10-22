// src/backend/src/utils/ResponseHelper.ts

// This file provides utility functions for sending standardized responses from the backend server of the Toddler Puzzle App.
// It ensures that all responses, whether successful or erroneous, follow a consistent format, enhancing client-side processing and user feedback.

// Requirements Addressed:
// - Standardized Response Handling
//   Location: API Design / Authentication APIs
//   Description: Ensures that all API responses are consistent in format, aiding in client-side processing and user feedback.

import { Response } from 'express'; // Express version not specified
import { initializeLogger } from './Logger'; // To log response operations and errors.

interface SuccessResponse {
    success: true;
    data: any;
}

interface ErrorResponse {
    success: false;
    error: string;
}

/**
 * Sends a standardized success response to the client.
 *
 * @param res - Express response object
 * @param statusCode - HTTP status code
 * @param data - Response data
 *
 * Steps:
 * 1. Log the response details using initializeLogger.
 * 2. Send a JSON response with the specified status code and data.
 *
 * Requirements Addressed:
 * - Standardized Response Handling
 *   Location: API Design / Authentication APIs
 *   Description: Ensures that all API responses are consistent in format, aiding in client-side processing and user feedback.
 */
export function sendSuccessResponse(res: Response, statusCode: number, data: object): void {
    const logger = initializeLogger();

    const response: SuccessResponse = {
        success: true,
        data: data
    };

    // Step 1: Log the response details using initializeLogger.
    logger.info(`Success Response: ${JSON.stringify(response)}`);

    // Step 2: Send a JSON response with the specified status code and data.
    res.status(statusCode).json(response);
}

/**
 * Sends a standardized error response to the client.
 *
 * @param res - Express response object
 * @param statusCode - HTTP status code
 * @param errorMessage - Error message string
 *
 * Steps:
 * 1. Log the error details using initializeLogger.
 * 2. Send a JSON response with the specified status code and error message.
 *
 * Requirements Addressed:
 * - Standardized Response Handling
 *   Location: API Design / Authentication APIs
 *   Description: Ensures that all API responses are consistent in format, aiding in client-side processing and user feedback.
 */
export function sendErrorResponse(res: Response, statusCode: number, errorMessage: string): void {
    const logger = initializeLogger();

    const response: ErrorResponse = {
        success: false,
        error: errorMessage
    };

    // Step 1: Log the error details using initializeLogger.
    logger.error(`Error Response: ${JSON.stringify(response)}`);

    // Step 2: Send a JSON response with the specified status code and error message.
    res.status(statusCode).json(response);
}