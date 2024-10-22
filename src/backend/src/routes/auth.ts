// Importing the Router class from Express to handle HTTP routing
// External Dependency: express version 4.17.1
import { Router, Application } from 'express'; // Version 4.17.1

// Importing the AuthController to handle authentication-related requests
// Internal Dependency: src/backend/src/controllers/AuthController.ts
import AuthController from '../controllers/AuthController';

// Importing the authenticateRequest middleware to secure protected routes using JWT tokens
// Internal Dependency: src/backend/src/middlewares/AuthMiddleware.ts
import { authenticateRequest } from '../middlewares/AuthMiddleware';

// Function to configure the authentication routes for the application
// This addresses the requirement: Authentication and Authorization
// Location in Documentation: SECURITY CONSIDERATIONS/Authentication and Authorization
export function setupAuthRoutes(app: Application): void {
    // Create a new Router instance to define authentication routes
    const router = Router();

    // Create an instance of AuthController to map routes to controller methods
    const authController = new AuthController();

    // Define the POST route for user registration, mapping to AuthController.register
    // This enables new users to register accounts
    // Requirement Addressed: TR-3.1 - Integrate with secure authentication system
    // Location in Documentation: TECHNICAL REQUIREMENTS/Feature 3: One-Time Payment Model/TR-3.1
    router.post('/api/auth/register', authController.register);

    // Define the POST route for user login, mapping to AuthController.login
    // This allows users to authenticate and receive JWT tokens
    // Requirement Addressed: TR-1.1 - Develop algorithms for user authentication
    // Location in Documentation: TECHNICAL REQUIREMENTS/Feature 1: Puzzle Difficulty Levels/TR-1.1
    router.post('/api/auth/login', authController.login);

    // Apply the authenticateRequest middleware to routes that require authentication
    // For example, the logout route requires the user to be authenticated
    // Requirement Addressed: Ensures secure user authentication and management of access tokens
    // Location in Documentation: SECURITY CONSIDERATIONS/Authentication and Authorization
    router.post('/api/auth/logout', authenticateRequest, authController.logout);

    // Attach the router to the application
    app.use(router);
}