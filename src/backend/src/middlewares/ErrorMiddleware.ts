/**
 * Error handling middleware for the Toddler Puzzle App backend.
 *
 * This middleware handles errors that occur during the processing of requests.
 * It ensures that all errors are logged and that standardized error responses
 * are sent to the client.
 *
 * Requirements Addressed:
 * - Name: Error Handling
 *   - Location: SYSTEM ARCHITECTURE/Backend Server
 *   - Description: Ensures that all errors are consistently handled and logged,
 *     and that clients receive standardized error responses.
 */

import { Request, Response, NextFunction } from 'express';
// Internal dependencies
import { initializeLogger } from '../utils/Logger'; // To log error details for monitoring and auditing.
import { sendErrorResponse } from '../utils/ResponseHelper'; // To send standardized error responses to the client.

/**
 * Middleware function to handle errors and send standardized error responses.
 *
 * @param err - The error object that was thrown.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The Express NextFunction callback.
 * @returns void - Sends an error response to the client and logs the error.
 */
export function handleError(err: any, req: Request, res: Response, next: NextFunction): void {
    // Step 1: Log the error details using initializeLogger.
    // This helps in monitoring and auditing errors in the system.
    const logger = initializeLogger(); // Assuming initializeLogger returns a logger instance
    logger.error('An error occurred', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        params: req.params,
        query: req.query,
        body: req.body,
        user: req.user, // If user info is available
    });

    // Step 2: Determine the status code and error message based on the error type.
    // If the error has a statusCode property, use it; otherwise, default to 500.
    // This ensures that clients receive the appropriate HTTP status code.
    const statusCode = err.statusCode || 500;

    // In production, avoid exposing error details to the client.
    // A generic message is provided.
    const errorMessage = statusCode === 500 ? 'An unexpected error occurred.' : err.message;

    // Step 3: Send a standardized error response using sendErrorResponse.
    // This sends a consistent error response format to the client.
    sendErrorResponse(res, statusCode, errorMessage);

    // Step 4: Call next() to pass control to the next middleware if necessary.
    // Since we have handled the error and sent a response, typically we do not call next().
    // However, if there are other error handling middlewares, we can call next(err).
    // We'll check if the headers have been sent before calling next().
    if (!res.headersSent) {
        next(err);
    }
}