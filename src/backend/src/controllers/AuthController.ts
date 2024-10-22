// Importing express to handle HTTP requests and responses
// External dependency: express@4.17.1
import { Request, Response } from 'express';

// Importing AuthService to handle authentication logic
import AuthService from '../services/AuthService';

// Importing Logger utility for logging operations and errors
import { initializeLogger } from '../utils/Logger';

// Importing Validator utilities for validating email and password
import { validateEmail, validatePassword } from '../utils/Validator';

// Importing ResponseHelpers for standardized success and error responses
import { sendErrorResponse, sendSuccessResponse } from '../utils/ResponseHelper';

/**
 * AuthController
 * 
 * Handles HTTP requests related to user authentication, such as login and registration.
 * 
 * Requirements Addressed:
 * - Authentication and Authorization (SECURITY CONSIDERATIONS/Authentication and Authorization)
 *   - Ensures secure user authentication and management of access tokens.
 */
export class AuthController {
    // Instance of AuthService to handle authentication logic
    private authService: AuthService;

    // Logger instance for logging operations and errors
    private logger: any;

    /**
     * Initializes the AuthController with necessary dependencies.
     * 
     * Steps:
     * 1. Initialize the logger for logging operations.
     * 2. Set up dependencies for authentication service interactions and validation.
     */
    constructor() {
        // Initialize the logger for logging operations
        this.logger = initializeLogger('AuthController');

        // Set up the AuthService for authentication operations
        this.authService = new AuthService();

        // Bind methods to maintain context
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    /**
     * Handles user registration requests by validating input data and creating a user record.
     * 
     * Requirements Addressed:
     * - Authentication and Authorization (SECURITY CONSIDERATIONS/Authentication and Authorization)
     *   - Ensures secure user registration and management of access tokens.
     * 
     * @param req - Express Request object containing user registration data.
     * @param res - Express Response object for sending responses to the client.
     * @returns void - Sends a response to the client indicating success or failure.
     * 
     * Steps:
     * 1. Extract user data from the request body.
     * 2. Validate the email and password using Validator utilities.
     * 3. Call AuthService.registerUser with the validated data.
     *    - Addresses TR-1.2 (Technical Requirements/Feature 1: Puzzle Difficulty Levels)
     * 4. If successful, send a success response with the user data and JWT token.
     * 5. If an error occurs, log the error and send an error response.
     */
    public async register(req: Request, res: Response): Promise<void> {
        try {
            // Step 1: Extract user data from the request body
            const { username, email, password } = req.body;

            // Step 2: Validate the email and password using Validator utilities
            if (!validateEmail(email)) {
                this.logger.error(`Invalid email format: ${email}`);
                return sendErrorResponse(res, 400, 'Invalid email format.');
            }

            if (!validatePassword(password)) {
                this.logger.error('Password does not meet strength requirements.');
                return sendErrorResponse(res, 400, 'Password does not meet strength requirements.');
            }

            // Step 3: Call AuthService.registerUser with the validated data
            const user = await this.authService.registerUser({ username, email, password });

            // Step 4: If successful, send a success response with the user data and JWT token
            return sendSuccessResponse(res, 201, 'Registration successful.', {
                user,
                token: user.token,
            });
        } catch (error) {
            // Step 5: If an error occurs, log the error and send an error response
            this.logger.error('Registration error:', error);
            return sendErrorResponse(res, 500, 'Registration failed.');
        }
    }

    /**
     * Handles user login requests by verifying credentials and issuing a JWT token.
     * 
     * Requirements Addressed:
     * - Authentication and Authorization (SECURITY CONSIDERATIONS/Authentication and Authorization)
     *   - Ensures secure user authentication and management of access tokens.
     * 
     * @param req - Express Request object containing user login data.
     * @param res - Express Response object for sending responses to the client.
     * @returns void - Sends a response to the client indicating success or failure.
     * 
     * Steps:
     * 1. Extract email and password from the request body.
     * 2. Validate the email format using Validator utilities.
     * 3. Call AuthService.loginUser with the provided credentials.
     *    - Addresses TR-2.3 (Technical Requirements/Feature 2: AI-Generated Images)
     * 4. If successful, send a success response with the user data and JWT token.
     * 5. If an error occurs, log the error and send an error response.
     */
    public async login(req: Request, res: Response): Promise<void> {
        try {
            // Step 1: Extract email and password from the request body
            const { email, password } = req.body;

            // Step 2: Validate the email format using Validator utilities
            if (!validateEmail(email)) {
                this.logger.error(`Invalid email format: ${email}`);
                return sendErrorResponse(res, 400, 'Invalid email format.');
            }

            // Step 3: Call AuthService.loginUser with the provided credentials
            const user = await this.authService.loginUser(email, password);

            // Step 4: If successful, send a success response with the user data and JWT token
            return sendSuccessResponse(res, 200, 'Login successful.', {
                user,
                token: user.token,
            });
        } catch (error) {
            // Step 5: If an error occurs, log the error and send an error response
            this.logger.error('Login error:', error);
            return sendErrorResponse(res, 401, 'Invalid email or password.');
        }
    }
}