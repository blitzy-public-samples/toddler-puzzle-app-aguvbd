// AuthMiddleware.ts
// This middleware handles authentication tasks such as verifying JWT tokens to ensure secure access to protected routes in the Toddler Puzzle App's backend.
// Requirements Addressed:
// - Ensures secure user authentication and management of access tokens.
//   Location: SECURITY CONSIDERATIONS/Authentication and Authorization

// Importing external dependencies

// 'jsonwebtoken' version 8.5.1 is used to sign and verify JWT tokens for user authentication.
// (Requirement: Ensures secure user authentication and management of access tokens.
//  Location: SECURITY CONSIDERATIONS/Authentication and Authorization)
import jwt from 'jsonwebtoken'; // version 8.5.1

// Importing internal dependencies

// initializeLogger is used to log authentication operations and errors.
// (Requirement: Ensures secure user authentication and management of access tokens.
//  Location: SECURITY CONSIDERATIONS/Authentication and Authorization)
import { initializeLogger } from '../utils/Logger';

// validateEmail and validatePassword are used to validate email formats and password strength during authentication processes.
// (Though not directly used in this middleware, they are essential for authentication processes.)
// (Requirement: Ensures secure user authentication and management of access tokens.
//  Location: SECURITY CONSIDERATIONS/Authentication and Authorization)
import { validateEmail, validatePassword } from '../utils/Validator';

// UserModel is used to interact with user data for authentication purposes.
// (Requirement: Ensures secure user authentication and management of access tokens.
//  Location: SECURITY CONSIDERATIONS/Authentication and Authorization)
import UserModel from '../models/UserModel';

// verifyToken is used to verify JWT tokens for user authentication.
// (Requirement: Ensures secure user authentication and management of access tokens.
//  Location: SECURITY CONSIDERATIONS/Authentication and Authorization)
import { verifyToken } from '../services/AuthService';

// ResponseHelper is used to send standardized error responses.
// (Requirement: Ensures secure user authentication and management of access tokens.
//  Location: SECURITY CONSIDERATIONS/Authentication and Authorization)
import { sendErrorResponse } from '../utils/ResponseHelper';

// Importing types from Express
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to authenticate requests using JWT tokens.
 * Requirements Addressed:
 * - Ensures secure user authentication and management of access tokens.
 *   Location: SECURITY CONSIDERATIONS/Authentication and Authorization
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void} Calls next() if authentication is successful, otherwise sends an error response.
 */
export const authenticateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Initialize logger to log authentication operations and errors.
  const logger = initializeLogger();

  try {
    // Step 1: Extract the token from the request headers.
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Log the missing or malformed Authorization header.
      logger.warn('Authentication failed: Missing or malformed Authorization header.');
      // Send an error response indicating that authentication is required.
      // Requirement: Ensures secure user authentication and management of access tokens.
      // Location: SECURITY CONSIDERATIONS/Authentication and Authorization
      return sendErrorResponse(res, 401, 'Authentication required.');
    }

    const token = authHeader.split(' ')[1];

    // Step 2: Verify the token using the verifyToken function from AuthService.
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      // Log the invalid token attempt.
      logger.warn('Authentication failed: Invalid token.');
      // Send an error response indicating an invalid token.
      // Requirement: Ensures secure user authentication and management of access tokens.
      // Location: SECURITY CONSIDERATIONS/Authentication and Authorization
      return sendErrorResponse(res, 401, 'Invalid token.');
    }

    // Step 3: Log the authentication attempt using initializeLogger.
    logger.info(`User authenticated: User ID ${decodedToken.userId}`);

    // Step 4: If the token is valid, attach the decoded user data to the request object.
    req.user = decodedToken; // Assuming that the decodedToken contains user information.

    // Step 5: Call next() to proceed to the next middleware or route handler.
    next();
  } catch (error) {
    // Log the authentication error with details.
    logger.error('Authentication error:', error);

    // Step 5: If the token is invalid, send an error response using ResponseHelper.
    // Requirement: Ensures secure user authentication and management of access tokens.
    // Location: SECURITY CONSIDERATIONS/Authentication and Authorization
    sendErrorResponse(res, 401, 'Authentication failed.');
  }
};