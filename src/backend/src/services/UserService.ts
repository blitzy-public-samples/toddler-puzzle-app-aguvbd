// Importing jsonwebtoken for JWT token handling (version 8.5.1)
// This addresses 'Authentication and Authorization' in 'SECURITY CONSIDERATIONS/Authentication and Authorization'
import jwt from 'jsonwebtoken'; // version 8.5.1

// Importing bcrypt for password hashing and verification (version 5.0.1)
// This addresses 'Password Storage' in 'SECURITY CONSIDERATIONS/DATA SECURITY'
import bcrypt from 'bcrypt'; // version 5.0.1

// Importing UserModel to interact with the users table in the database
// This addresses 'User Data Management' in 'SYSTEM ARCHITECTURE/Database Server'
import UserModel from '../models/UserModel';

// Importing logger for logging operations and errors
// This addresses 'Logging' in 'TECHNICAL REQUIREMENTS/Feature 11: Performance Optimization'
import { initializeLogger } from '../utils/Logger';

// Importing validators for email and password validation
// This addresses 'Input Validation and Sanitization' in 'SECURITY CONSIDERATIONS/SECURITY PROTOCOLS'
import { validateEmail, validatePassword } from '../utils/Validator';

// Importing response helpers for standardized success and error responses
import { sendSuccessResponse, sendErrorResponse } from '../utils/ResponseHelper';

// Importing verifyToken function to verify JWT tokens for authentication
// This addresses 'Authentication and Authorization' in 'SECURITY CONSIDERATIONS/Authentication and Authorization'
import { verifyToken } from './AuthService';

// Global variables
// JWT_SECRET is used for signing JWT tokens, sourced from environment variables for security
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

// Initialize logger
const logger = initializeLogger();

/**
 * UserService provides business logic for user operations such as registration, login,
 * profile management, and data retrieval.
 * 
 * Requirements Addressed:
 * - User Data Management (SYSTEM ARCHITECTURE/Database Server)
 * - Authentication and Authorization (SECURITY CONSIDERATIONS/Authentication and Authorization)
 */
class UserService {
    /**
     * Initializes the UserService with necessary dependencies.
     */
    constructor() {
        // Step 1: Initialize the logger for logging operations.
        // The logger helps in tracking user service operations and errors.
        this.logger = logger;

        // Step 2: Set up dependencies for user model interactions and validation.
        // UserModel is used for database operations related to user data.
    }

    /**
     * Registers a new user by validating input data and creating a user record.
     * 
     * Requirements Addressed:
     * - User Data Management (SYSTEM ARCHITECTURE/Database Server)
     * - Input Validation and Sanitization (SECURITY CONSIDERATIONS/SECURITY PROTOCOLS)
     * - Password Storage (SECURITY CONSIDERATIONS/DATA SECURITY)
     * 
     * @param {object} userData - The user data containing email and password.
     * @returns {Promise<object>} - The created user object and JWT token if successful, otherwise an error response.
     */
    async registerUser(userData) {
        try {
            // Step 1: Validate the user data using validateEmail and validatePassword.
            if (!validateEmail(userData.email)) {
                return sendErrorResponse('Invalid email format.');
            }

            if (!validatePassword(userData.password)) {
                return sendErrorResponse('Password does not meet security requirements.');
            }

            // Step 2: Hash the password before storing it in the database.
            // This addresses 'Password Storage' in 'SECURITY CONSIDERATIONS/DATA SECURITY'.
            const saltRounds = 10; // Number of rounds for hashing
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

            // Step 3: Use UserModel to create a new user record with the provided data.
            const newUser = await UserModel.create({
                email: userData.email,
                password: hashedPassword
            });

            // Step 4: Generate a JWT token for the new user.
            // This addresses 'Authentication and Authorization' in 'SECURITY CONSIDERATIONS/Authentication and Authorization'.
            const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

            // Step 5: Log the registration operation using the logger.
            this.logger.info(`User registered with email: ${newUser.email}`);

            // Step 6: Return the created user object and JWT token.
            return sendSuccessResponse({ user: newUser, token });
        } catch (error) {
            // Log the error
            this.logger.error(`Error in registerUser: ${error.message}`);

            // Return error response
            return sendErrorResponse('Registration failed.');
        }
    }

    /**
     * Authenticates a user by verifying credentials and issuing a JWT token.
     * 
     * Requirements Addressed:
     * - Authentication and Authorization (SECURITY CONSIDERATIONS/Authentication and Authorization)
     * - Data Security (SECURITY CONSIDERATIONS/DATA SECURITY)
     * 
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<object>} - The authenticated user object and JWT token if successful, otherwise an error response.
     */
    async loginUser(email, password) {
        try {
            // Step 1: Validate the email format using validateEmail.
            if (!validateEmail(email)) {
                return sendErrorResponse('Invalid email format.');
            }

            // Step 2: Use UserModel to find the user by email.
            const user = await UserModel.findOne({ where: { email } });

            if (!user) {
                return sendErrorResponse('User not found.');
            }

            // Step 3: Verify the provided password against the stored hash.
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return sendErrorResponse('Incorrect password.');
            }

            // Step 4: Generate a JWT token for the authenticated user.
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

            // Step 5: Log the login operation using the logger.
            this.logger.info(`User logged in with email: ${user.email}`);

            // Step 6: Return the authenticated user object and JWT token.
            return sendSuccessResponse({ user, token });
        } catch (error) {
            // Log the error
            this.logger.error(`Error in loginUser: ${error.message}`);

            // Return error response
            return sendErrorResponse('Login failed.');
        }
    }

    /**
     * Retrieves the profile of the authenticated user.
     * 
     * Requirements Addressed:
     * - User Data Management (SYSTEM ARCHITECTURE/Database Server)
     * 
     * @param {number} userId - The ID of the user whose profile is to be retrieved.
     * @returns {Promise<object>} - The user profile data if found, otherwise an error response.
     */
    async getUserProfile(userId) {
        try {
            // Step 1: Use UserModel to retrieve user profile data by userId.
            const user = await UserModel.findByPk(userId);

            if (!user) {
                return sendErrorResponse('User not found.');
            }

            // Step 2: Log the profile retrieval operation using the logger.
            this.logger.info(`User profile retrieved for userId: ${userId}`);

            // Step 3: Return the user profile data.
            return sendSuccessResponse({ user });
        } catch (error) {
            // Log the error
            this.logger.error(`Error in getUserProfile: ${error.message}`);

            // Return error response
            return sendErrorResponse('Failed to retrieve user profile.');
        }
    }

    /**
     * Updates the profile of the authenticated user.
     * 
     * Requirements Addressed:
     * - User Data Management (SYSTEM ARCHITECTURE/Database Server)
     * - Input Validation and Sanitization (SECURITY CONSIDERATIONS/SECURITY PROTOCOLS)
     * 
     * @param {number} userId - The ID of the user to be updated.
     * @param {object} updateData - The data to update the user's profile with.
     * @returns {Promise<object>} - The updated user profile data if successful, otherwise an error response.
     */
    async updateUserProfile(userId, updateData) {
        try {
            // Step 1: Validate the update data using Validator utilities.
            // For example, validate email if email is being updated.
            if (updateData.email && !validateEmail(updateData.email)) {
                return sendErrorResponse('Invalid email format.');
            }

            if (updateData.password && !validatePassword(updateData.password)) {
                return sendErrorResponse('Password does not meet security requirements.');
            }

            // If password is being updated, hash it before saving.
            if (updateData.password) {
                const saltRounds = 10;
                updateData.password = await bcrypt.hash(updateData.password, saltRounds);
            }

            // Step 2: Use UserModel to update the user profile with the specified userId.
            const [updatedRowsCount, [updatedUser]] = await UserModel.update(updateData, {
                where: { id: userId },
                returning: true
            });

            if (updatedRowsCount === 0) {
                return sendErrorResponse('User not found or no changes made.');
            }

            // Step 3: Log the update operation using the logger.
            this.logger.info(`User profile updated for userId: ${userId}`);

            // Step 4: Return the updated user profile data.
            return sendSuccessResponse({ user: updatedUser });
        } catch (error) {
            // Log the error
            this.logger.error(`Error in updateUserProfile: ${error.message}`);

            // Return error response
            return sendErrorResponse('Failed to update user profile.');
        }
    }
}

export default new UserService();