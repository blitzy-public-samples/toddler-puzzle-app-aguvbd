/**
 * @file users.ts
 * @description This file defines the routes for user-related operations in the Toddler Puzzle App's backend. It maps HTTP requests to the appropriate controller functions, ensuring secure and efficient handling of user data.
 *
 * Requirements Addressed:
 * - **User Data Management** (Located at: SYSTEM ARCHITECTURE/Backend Server): Handles routing for CRUD operations and business logic related to user data.
 * - **Authentication and Authorization** (Located at: SECURITY CONSIDERATIONS/Authentication and Authorization): Ensures secure access to user data and operations by applying authentication middleware.
 */

// External Dependencies
import express from 'express'; // Express framework for handling HTTP requests (version 4.17.1)

// Internal Dependencies
import UserController from '../controllers/UserController'; // Handles HTTP requests related to user operations
import AuthMiddleware from '../middlewares/AuthMiddleware'; // Verifies JWT tokens for secure access to protected routes
import ErrorMiddleware from '../middlewares/ErrorMiddleware'; // Handles errors and sends standardized error responses
import RateLimiterMiddleware from '../middlewares/RateLimiterMiddleware'; // Limits the number of requests to prevent abuse

/**
 * Configures the Express router with routes for user-related operations.
 *
 * @param router - The Express Router object to which the user routes will be attached.
 * @returns void - Sets up routes on the provided router object.
 *
 * Steps:
 * 1. Import necessary middlewares and controllers.
 * 2. Define route for user registration and map it to `UserController.registerUser`.
 * 3. Define route for user login and map it to `UserController.loginUser`.
 * 4. Define route for retrieving user profile, protected by `AuthMiddleware`, and map it to `UserController.getUserProfile`.
 * 5. Define route for updating user profile, protected by `AuthMiddleware`, and map it to `UserController.updateUserProfile`.
 * 6. Apply `RateLimiterMiddleware` to limit the number of requests a client can make.
 * 7. Apply `ErrorMiddleware` to handle any errors that occur during request processing.
 *
 * Requirements Addressed:
 * - **User Data Management** (Located at: SYSTEM ARCHITECTURE/Backend Server)
 * - **Authentication and Authorization** (Located at: SECURITY CONSIDERATIONS/Authentication and Authorization)
 */
export function setupUserRoutes(router: express.Router): void {
    // Step 6: Apply RateLimiterMiddleware to all routes in this router to prevent abuse
    // Addressing: Implements rate limiting as per security considerations (TR-11.5 Implement caching strategies)
    router.use(RateLimiterMiddleware);

    // Step 2: Define route for user registration
    // POST /users/register - Registers a new user
    // Addressing: TR-5.1 Develop a secure authentication system for parents to access control settings
    router.post('/users/register', UserController.registerUser);

    // Step 3: Define route for user login
    // POST /users/login - Authenticates a user and issues JWT
    // Addressing: TR-5.1 Develop a secure authentication system for parents to access control settings
    router.post('/users/login', UserController.loginUser);

    // Step 4: Define route for retrieving user profile (Protected Route)
    // GET /users/profile - Retrieves user profile information
    // Applies AuthMiddleware to ensure secure access
    // Addressing: TR-5.2 Implement UI components for setting usage limits and managing app settings
    router.get('/users/profile', AuthMiddleware, UserController.getUserProfile);

    // Step 5: Define route for updating user profile (Protected Route)
    // PUT /users/profile - Updates user profile information
    // Applies AuthMiddleware to ensure secure access
    // Addressing: TR-5.2 Implement UI components for setting usage limits and managing app settings
    router.put('/users/profile', AuthMiddleware, UserController.updateUserProfile);

    // Step 7: Apply ErrorMiddleware to handle any errors during request processing
    // Ensures standardized error responses
    // Addressing: Ensures error handling as per security considerations (SECURITY CONSIDERATIONS/Error Handling)
    router.use(ErrorMiddleware);
}