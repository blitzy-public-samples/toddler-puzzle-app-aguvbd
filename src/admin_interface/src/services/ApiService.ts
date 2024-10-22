// Importing Axios for HTTP requests (axios version 0.21.1)
import axios from 'axios'; // Version 0.21.1

// Importing internal utilities
import { API_BASE_URL } from '../utils/Constants';
// Purpose: Defines the base URL for constructing API requests.

import { logger } from '../utils/Logger';
// Purpose: Logs API request and response details for monitoring and debugging.

import { validateInput } from '../utils/Validator';
// Purpose: Validates data before sending API requests.

// Creating a global axios instance with default configurations
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});
// 'apiClient' is a global instance for making HTTP requests
// Purpose: Centralizes API communication settings within the admin interface.

/**
 * ApiService class provides methods for API communication with the backend server.
 * Requirements Addressed:
 * - API Communication
 *   Location: Technical Specification/System Components/Communication Management
 *   Description: Facilitates communication with the backend server, handling all API requests and responses within the admin interface.
 */
class ApiService {
    /**
     * Sends a GET request to the specified endpoint.
     *
     * @param endpoint - The API endpoint to send the GET request to.
     * @param params - Optional query parameters for the request.
     * @returns A Promise that resolves with the response data or rejects with an error.
     *
     * Steps:
     * 1. Validate the endpoint and params using validateInput.
     * 2. Log the GET request details using logger.
     * 3. Send a GET request using apiClient with the provided endpoint and params.
     * 4. Log the response or error using logger.
     * 5. Return the response data or throw an error.
     */
    public static async get(endpoint: string, params?: object): Promise<any> {
        try {
            // Step 1: Validate the endpoint and params using validateInput.
            validateInput('endpoint', endpoint);
            if (params) {
                validateInput('params', params);
            }

            // Step 2: Log the GET request details using logger.
            logger.info(`GET Request to ${endpoint} with params: ${JSON.stringify(params)}`);

            // Step 3: Send a GET request using apiClient with the provided endpoint and params.
            const response = await apiClient.get(endpoint, { params });

            // Step 4: Log the response using logger.
            logger.info(`Response from GET ${endpoint}: ${JSON.stringify(response.data)}`);

            // Step 5: Return the response data.
            return response.data;
        } catch (error) {
            // Step 4 (Error): Log the error using logger.
            logger.error(`Error in GET ${endpoint}: ${error}`);

            // Step 5 (Error): Throw the error to be handled by the calling function.
            throw error;
        }
    }

    /**
     * Sends a POST request to the specified endpoint.
     *
     * @param endpoint - The API endpoint to send the POST request to.
     * @param data - The data to be sent in the request body.
     * @returns A Promise that resolves with the response data or rejects with an error.
     *
     * Steps:
     * 1. Validate the endpoint and data using validateInput.
     * 2. Log the POST request details using logger.
     * 3. Send a POST request using apiClient with the provided endpoint and data.
     * 4. Log the response or error using logger.
     * 5. Return the response data or throw an error.
     */
    public static async post(endpoint: string, data: object): Promise<any> {
        try {
            // Step 1: Validate the endpoint and data using validateInput.
            validateInput('endpoint', endpoint);
            validateInput('data', data);

            // Step 2: Log the POST request details using logger.
            logger.info(`POST Request to ${endpoint} with data: ${JSON.stringify(data)}`);

            // Step 3: Send a POST request using apiClient with the provided endpoint and data.
            const response = await apiClient.post(endpoint, data);

            // Step 4: Log the response using logger.
            logger.info(`Response from POST ${endpoint}: ${JSON.stringify(response.data)}`);

            // Step 5: Return the response data.
            return response.data;
        } catch (error) {
            // Step 4 (Error): Log the error using logger.
            logger.error(`Error in POST ${endpoint}: ${error}`);

            // Step 5 (Error): Throw the error to be handled by the calling function.
            throw error;
        }
    }

    /**
     * Sends a PUT request to the specified endpoint.
     *
     * @param endpoint - The API endpoint to send the PUT request to.
     * @param data - The data to be sent in the request body.
     * @returns A Promise that resolves with the response data or rejects with an error.
     *
     * Steps:
     * 1. Validate the endpoint and data using validateInput.
     * 2. Log the PUT request details using logger.
     * 3. Send a PUT request using apiClient with the provided endpoint and data.
     * 4. Log the response or error using logger.
     * 5. Return the response data or throw an error.
     */
    public static async put(endpoint: string, data: object): Promise<any> {
        try {
            // Step 1: Validate the endpoint and data using validateInput.
            validateInput('endpoint', endpoint);
            validateInput('data', data);

            // Step 2: Log the PUT request details using logger.
            logger.info(`PUT Request to ${endpoint} with data: ${JSON.stringify(data)}`);

            // Step 3: Send a PUT request using apiClient with the provided endpoint and data.
            const response = await apiClient.put(endpoint, data);

            // Step 4: Log the response using logger.
            logger.info(`Response from PUT ${endpoint}: ${JSON.stringify(response.data)}`);

            // Step 5: Return the response data.
            return response.data;
        } catch (error) {
            // Step 4 (Error): Log the error using logger.
            logger.error(`Error in PUT ${endpoint}: ${error}`);

            // Step 5 (Error): Throw the error to be handled by the calling function.
            throw error;
        }
    }

    /**
     * Sends a DELETE request to the specified endpoint.
     *
     * @param endpoint - The API endpoint to send the DELETE request to.
     * @returns A Promise that resolves with the response data or rejects with an error.
     *
     * Steps:
     * 1. Validate the endpoint using validateInput.
     * 2. Log the DELETE request details using logger.
     * 3. Send a DELETE request using apiClient with the provided endpoint.
     * 4. Log the response or error using logger.
     * 5. Return the response data or throw an error.
     */
    public static async delete(endpoint: string): Promise<any> {
        try {
            // Step 1: Validate the endpoint using validateInput.
            validateInput('endpoint', endpoint);

            // Step 2: Log the DELETE request details using logger.
            logger.info(`DELETE Request to ${endpoint}`);

            // Step 3: Send a DELETE request using apiClient with the provided endpoint.
            const response = await apiClient.delete(endpoint);

            // Step 4: Log the response using logger.
            logger.info(`Response from DELETE ${endpoint}: ${JSON.stringify(response.data)}`);

            // Step 5: Return the response data.
            return response.data;
        } catch (error) {
            // Step 4 (Error): Log the error using logger.
            logger.error(`Error in DELETE ${endpoint}: ${error}`);

            // Step 5 (Error): Throw the error to be handled by the calling function.
            throw error;
        }
    }
}

// Exporting ApiService for use in other modules
export default ApiService;