// AuthService.ts
// This file provides authentication services for the admin interface, handling user login, logout, and session management.

// Requirements Addressed:
// - Authentication Management
//   - Location: Technical Specification/System Components/Security Management
//   - Description: Ensures secure authentication processes for admin users, including login, logout, and session management.

// External Dependencies:
// - 'axios' (version 0.21.1): Handles HTTP requests to the backend server.
import axios from 'axios'; // axios version 0.21.1

// Internal Dependencies:
// - 'API_BASE_URL' from '../utils/Constants.ts':
//   Defines the base URL for constructing authentication API requests.
import { API_BASE_URL } from '../utils/Constants';

// - 'logger' from '../utils/Logger.ts':
//   Logs authentication-related events and errors for monitoring and debugging.
import logger from '../utils/Logger';

// - 'validateInput' from '../utils/Validator.ts':
//   Validates input data for authentication requests.
import { validateInput } from '../utils/Validator';

// - 'apiClient' from './ApiService.ts':
//   Handles HTTP requests to the authentication endpoints.
import apiClient from './ApiService';

// Global Variable:
// 'authClient' is an axios instance configured for authentication API calls.
// It uses the base URL combined with '/auth' and has a timeout of 10000ms.
const authClient = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  timeout: 10000,
});

// Function: login
/**
 * Handles user login by sending credentials to the authentication endpoint.
 *
 * Requirements Addressed:
 * - Authentication Management
 *   - Location: Technical Specification/System Components/Security Management
 *   - Ensures secure authentication processes for admin users, including login, logout, and session management.
 *
 * Steps:
 * 1. Validate the username and password using 'validateInput'.
 * 2. Log the login attempt using 'logger'.
 * 3. Send a POST request to the '/login' endpoint with the username and password using 'authClient'.
 * 4. Log the response or error using 'logger'.
 * 5. Return the authentication token or throw an error.
 *
 * @param username - The username of the admin user.
 * @param password - The password of the admin user.
 * @returns Promise<string> - Resolves with the authentication token or rejects with an error.
 */
export async function login(username: string, password: string): Promise<string> {
  try {
    // Step 1: Validate the username and password using 'validateInput'.
    validateInput({ username, password });

    // Step 2: Log the login attempt using 'logger'.
    logger.info(`Login attempt for user: ${username}`);

    // Step 3: Send a POST request to the '/login' endpoint with the username and password using 'authClient'.
    const response = await authClient.post('/login', { username, password });

    // Step 4: Log the response using 'logger'.
    logger.info(`Login successful for user: ${username}`);

    // Step 5: Return the authentication token.
    return response.data.token;
  } catch (error) {
    // Step 4 (Error Handling): Log the error using 'logger'.
    logger.error(`Login failed for user: ${username}`, error);

    // Throw the error to be handled by the caller.
    throw error;
  }
}

// Function: logout
/**
 * Handles user logout by invalidating the session token.
 *
 * Requirements Addressed:
 * - Authentication Management
 *   - Location: Technical Specification/System Components/Security Management
 *   - Ensures secure authentication processes for admin users, including login, logout, and session management.
 *
 * Steps:
 * 1. Validate the token using 'validateInput'.
 * 2. Log the logout attempt using 'logger'.
 * 3. Send a POST request to the '/logout' endpoint with the token using 'authClient'.
 * 4. Log the response or error using 'logger'.
 * 5. Resolve the promise if successful or throw an error.
 *
 * @param token - The authentication token of the admin user.
 * @returns Promise<void> - Resolves when the logout is successful or rejects with an error.
 */
export async function logout(token: string): Promise<void> {
  try {
    // Step 1: Validate the token using 'validateInput'.
    validateInput({ token });

    // Step 2: Log the logout attempt using 'logger'.
    logger.info(`Logout attempt with token: ${token}`);

    // Step 3: Send a POST request to the '/logout' endpoint with the token using 'authClient'.
    await authClient.post('/logout', { token });

    // Step 5: Log the successful logout using 'logger'.
    logger.info(`Logout successful with token: ${token}`);
  } catch (error) {
    // Step 4 (Error Handling): Log the error using 'logger'.
    logger.error(`Logout failed with token: ${token}`, error);

    // Throw the error to be handled by the caller.
    throw error;
  }
}