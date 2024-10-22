// External Dependencies
import jwt from 'jsonwebtoken'; // Version 8.5.1
import bcrypt from 'bcrypt'; // Version 5.0.1

// Internal Dependencies
import { initializeLogger } from '../utils/Logger';
import { validateEmail, validatePassword } from '../utils/Validator';
import { sendErrorResponse, sendSuccessResponse } from '../utils/ResponseHelper';
import { UserModel } from '../models/UserModel';

// Initialize Logger
const logger = initializeLogger();

/**
 * Registers a new user by validating input data and creating a user record.
 *
 * Requirements Addressed:
 * - Ensures secure user authentication and management of access tokens.
 *   (SECURITY CONSIDERATIONS/Authentication and Authorization)
 * - Passwords are hashed using bcrypt with a salt to prevent brute-force attacks.
 *   (SECURITY CONSIDERATIONS/Data Security)
 *
 * @param {Object} userData - The user data containing email and password.
 * @returns {Promise<Object>} - The created user record and JWT token.
 */
export async function registerUser(userData: { email: string; password: string }): Promise<any> {
    try {
        // Step 1: Validate the email and password using Validator utilities.
        if (!validateEmail(userData.email)) {
            logger.error('Invalid email format during registration.');
            return sendErrorResponse('Invalid email format.');
        }

        if (!validatePassword(userData.password)) {
            logger.error('Password does not meet strength requirements.');
            return sendErrorResponse('Password does not meet strength requirements.');
        }

        // Check if the email already exists to prevent duplicate accounts.
        // (Requirement: Implement validation to ensure uniqueness of user accounts.)
        const existingUser = await UserModel.findOne({ email: userData.email });
        if (existingUser) {
            logger.error('Email already exists during registration.');
            return sendErrorResponse('Email already exists.');
        }

        // Step 2: Hash the password before storing it in the database.
        const saltRounds = 10; // Using bcrypt recommendations for salt rounds.
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        // Step 3: Create a new user record using UserModel.
        const newUser = new UserModel({
            email: userData.email,
            password: hashedPassword,
            role: 'parent' // Default role assigned as per system design.
        });

        await newUser.save();

        // Step 4: Generate a JWT token for the user.
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' } // Tokens have an expiration time to enhance security (SECURITY CONSIDERATIONS/Authentication and Authorization).
        );

        // Step 5: Log the registration operation using initializeLogger.
        logger.info(`User registered with email: ${userData.email}`);

        // Step 6: Return the created user record and JWT token.
        return sendSuccessResponse({
            user: {
                id: newUser._id,
                email: newUser.email
            },
            token
        });

    } catch (error: any) {
        // Handle errors and send standardized error response.
        logger.error(`Registration error: ${error.message}`);
        return sendErrorResponse('Registration failed. Please try again later.');
    }
}

/**
 * Logs in a user by verifying credentials and issuing a JWT token.
 *
 * Requirements Addressed:
 * - Ensures secure user authentication and management of access tokens.
 *   (SECURITY CONSIDERATIONS/Authentication and Authorization)
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The user record and JWT token if login is successful, otherwise an error message.
 */
export async function loginUser(email: string, password: string): Promise<any> {
    try {
        // Step 1: Validate the email format using Validator utilities.
        if (!validateEmail(email)) {
            logger.error('Invalid email format during login.');
            return sendErrorResponse('Invalid email format.');
        }

        // Step 2: Retrieve the user record using UserModel.
        const user = await UserModel.findOne({ email });
        if (!user) {
            logger.error('User not found during login.');
            return sendErrorResponse('User not found.');
        }

        // Step 3: Verify the password against the stored hash.
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            logger.error('Incorrect password during login.');
            return sendErrorResponse('Incorrect password.');
        }

        // Step 4: Generate a JWT token for the user.
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' } // Tokens have an expiration time to enhance security (SECURITY CONSIDERATIONS/Authentication and Authorization).
        );

        // Step 5: Log the login operation using initializeLogger.
        logger.info(`User logged in with email: ${email}`);

        // Step 6: Return the user record and JWT token.
        return sendSuccessResponse({
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error: any) {
        // Handle errors and send standardized error response.
        logger.error(`Login error: ${error.message}`);
        return sendErrorResponse('Login failed. Please try again later.');
    }
}