// External dependencies
import { Request, Response } from 'express'; // express version 4.17.1
// Used to handle HTTP requests and define routes as per 'Dependencies' in the file JSON specification.

// Internal dependencies
import UserService from '../services/UserService';
// UserService handles business logic related to user operations.
// Requirement Addressed: User Data Management
// Location: SYSTEM ARCHITECTURE/Database Server

import AuthService from '../services/AuthService';
// AuthService manages authentication logic such as JWT token verification.
// Requirement Addressed: Authentication and Authorization
// Location: SECURITY CONSIDERATIONS/Authentication and Authorization

import { initializeLogger } from '../utils/Logger';
// Logger used to log user controller operations and errors.

import { validateEmail, validatePassword } from '../utils/Validator';
// Validator utilities to validate email and password formats in user input.

import { sendSuccessResponse, sendErrorResponse } from '../utils/ResponseHelper';
// Helpers to send standardized success and error responses.

// UserController class handles HTTP requests related to user operations such as registration, login, profile retrieval, and updates.
// Requirement Addressed: Handles HTTP requests for user operations.
// Location: File description in the JSON specification.

class UserController {
  private userService: UserService;
  private authService: AuthService;
  private logger: ReturnType<typeof initializeLogger>;

  constructor() {
    // Initializes the UserController with necessary dependencies.
    // Steps:
    // 1. Initialize the logger for logging operations.
    // 2. Set up dependencies for user service interactions and validation.

    this.logger = initializeLogger();
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  // Handles user registration requests by validating input data and delegating to UserService for user creation.
  // Requirement Addressed: User Data Management
  // Location: SYSTEM ARCHITECTURE/Database Server

  public async registerUser(req: Request, res: Response): Promise<void> {
    // Steps:
    // 1. Extract user data from the request body.
    // 2. Validate the email and password using Validator utilities.
    // 3. Call UserService.registerUser to create a new user.
    // 4. Log the registration operation using the logger.
    // 5. Send a success response with the created user data and JWT token.
    // 6. Handle any errors by sending an error response.

    try {
      // Step 1: Extract user data from the request body.
      const { email, password } = req.body;

      // Step 2: Validate the email and password using Validator utilities.
      if (!validateEmail(email)) {
        this.logger.error(`Invalid email format during registration: ${email}`);
        // Requirement Addressed: Input Validation and Sanitization
        // Location: SECURITY CONSIDERATIONS/Security Protocols

        return sendErrorResponse(res, 400, 'Invalid email format.');
      }

      if (!validatePassword(password)) {
        this.logger.error(`Invalid password format during registration for email: ${email}`);
        // Requirement Addressed: Input Validation and Sanitization
        // Location: SECURITY CONSIDERATIONS/Security Protocols

        return sendErrorResponse(res, 400, 'Password does not meet security requirements.');
      }

      // Step 3: Call UserService.registerUser to create a new user.
      const newUser = await this.userService.registerUser(email, password);

      // Step 4: Log the registration operation using the logger.
      this.logger.info(`User registered successfully: ${newUser.id}`);

      // Step 5: Send a success response with the created user data and JWT token.
      const token = this.authService.generateToken(newUser);

      sendSuccessResponse(res, 201, {
        user: newUser,
        token,
      });
    } catch (error: any) {
      // Step 6: Handle any errors by sending an error response.
      this.logger.error(`Error during user registration: ${error.message}`);
      sendErrorResponse(res, 500, 'An error occurred during registration.');
    }
  }

  // Handles user login requests by verifying credentials and issuing a JWT token.
  // Requirement Addressed: Authentication and Authorization
  // Location: SECURITY CONSIDERATIONS/Authentication and Authorization

  public async loginUser(req: Request, res: Response): Promise<void> {
    // Steps:
    // 1. Extract email and password from the request body.
    // 2. Validate the email format using Validator utilities.
    // 3. Call UserService.loginUser to authenticate the user.
    // 4. Log the login operation using the logger.
    // 5. Send a success response with the authenticated user data and JWT token.
    // 6. Handle any errors by sending an error response.

    try {
      // Step 1: Extract email and password from the request body.
      const { email, password } = req.body;

      // Step 2: Validate the email format using Validator utilities.
      if (!validateEmail(email)) {
        this.logger.error(`Invalid email format during login: ${email}`);
        // Requirement Addressed: Input Validation and Sanitization
        // Location: SECURITY CONSIDERATIONS/Security Protocols

        return sendErrorResponse(res, 400, 'Invalid email format.');
      }

      // Step 3: Call UserService.loginUser to authenticate the user.
      const user = await this.userService.loginUser(email, password);

      // Step 4: Log the login operation using the logger.
      this.logger.info(`User logged in successfully: ${user.id}`);

      // Step 5: Send a success response with the authenticated user data and JWT token.
      const token = this.authService.generateToken(user);

      sendSuccessResponse(res, 200, {
        user,
        token,
      });
    } catch (error: any) {
      // Step 6: Handle any errors by sending an error response.
      this.logger.error(`Error during user login: ${error.message}`);

      if (error.message === 'Invalid credentials') {
        return sendErrorResponse(res, 401, 'Invalid email or password.');
      }

      sendErrorResponse(res, 500, 'An error occurred during login.');
    }
  }

  // Retrieves the profile of the authenticated user.
  // Decorator: AuthMiddleware
  // Requirement Addressed: Secure Access to User Data
  // Location: SECURITY CONSIDERATIONS/Authentication and Authorization

  public async getUserProfile(req: Request, res: Response): Promise<void> {
    // Steps:
    // 1. Extract user ID from the request object.
    // 2. Call UserService.getUserProfile to retrieve user profile data.
    // 3. Log the profile retrieval operation using the logger.
    // 4. Send a success response with the user profile data.
    // 5. Handle any errors by sending an error response.

    try {
      // Step 1: Extract user ID from the request object.
      const userId = req.user?.id;
      if (!userId) {
        this.logger.error('User ID not found in request object.');
        return sendErrorResponse(res, 400, 'Invalid user session.');
      }

      // Step 2: Call UserService.getUserProfile to retrieve user profile data.
      const userProfile = await this.userService.getUserProfile(userId);

      // Step 3: Log the profile retrieval operation using the logger.
      this.logger.info(`User profile retrieved: ${userId}`);

      // Step 4: Send a success response with the user profile data.
      sendSuccessResponse(res, 200, userProfile);
    } catch (error: any) {
      // Step 5: Handle any errors by sending an error response.
      this.logger.error(`Error retrieving user profile: ${error.message}`);
      sendErrorResponse(res, 500, 'An error occurred while retrieving the profile.');
    }
  }

  // Updates the profile of the authenticated user.
  // Decorator: AuthMiddleware
  // Requirement Addressed: User Data Management
  // Location: SYSTEM ARCHITECTURE/Database Server

  public async updateUserProfile(req: Request, res: Response): Promise<void> {
    // Steps:
    // 1. Extract user ID and update data from the request object.
    // 2. Validate the update data using Validator utilities.
    // 3. Call UserService.updateUserProfile to update the user profile.
    // 4. Log the update operation using the logger.
    // 5. Send a success response with the updated user profile data.
    // 6. Handle any errors by sending an error response.

    try {
      // Step 1: Extract user ID and update data from the request object.
      const userId = req.user?.id;
      if (!userId) {
        this.logger.error('User ID not found in request object.');
        return sendErrorResponse(res, 400, 'Invalid user session.');
      }

      const updateData = req.body;

      // Step 2: Validate the update data using Validator utilities.
      if (updateData.email && !validateEmail(updateData.email)) {
        this.logger.error(`Invalid email format during profile update: ${updateData.email}`);
        return sendErrorResponse(res, 400, 'Invalid email format.');
      }

      if (updateData.password && !validatePassword(updateData.password)) {
        this.logger.error('Invalid password format during profile update.');
        return sendErrorResponse(res, 400, 'Password does not meet security requirements.');
      }

      // Step 3: Call UserService.updateUserProfile to update the user profile.
      const updatedUserProfile = await this.userService.updateUserProfile(userId, updateData);

      // Step 4: Log the update operation using the logger.
      this.logger.info(`User profile updated: ${userId}`);

      // Step 5: Send a success response with the updated user profile data.
      sendSuccessResponse(res, 200, updatedUserProfile);
    } catch (error: any) {
      // Step 6: Handle any errors by sending an error response.
      this.logger.error(`Error updating user profile: ${error.message}`);
      sendErrorResponse(res, 500, 'An error occurred while updating the profile.');
    }
  }
}

export default UserController;