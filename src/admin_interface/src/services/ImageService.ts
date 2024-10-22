// Importing axios for making HTTP requests
import axios from 'axios'; // axios version: 0.21.1

// Importing constants
import { API_BASE_URL } from '../utils/Constants';

// Importing logger for logging operations and errors
import { logger } from '../utils/Logger';

// Importing validateInput for input validation
import { validateInput } from '../utils/Validator';

// Importing apiClient to handle HTTP requests (if needed for shared configurations)
import { apiClient } from './ApiService';

/**
 * ImageService provides services for managing AI-generated images within the admin interface.
 *
 * Requirements Addressed:
 * - Image Management: Facilitates the management of AI-generated images, including fetching, approving, and deleting images within the admin interface.
 *   Refer to Technical Specification -> Technical Requirements -> Feature 7: Admin Controls (TR-7.2).
 */

// Create a specialized axios instance for image-related API calls
const imageClient = axios.create({
  baseURL: `${API_BASE_URL}/images`,
  timeout: 10000,
});

/**
 * Fetches a list of AI-generated images pending approval.
 *
 * Requirements Addressed:
 * - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
 *   Location: Technical Specification -> Technical Requirements -> Feature 7: Admin Controls.
 *
 * @returns {Promise<any[]>} Resolves with the list of images or rejects with an error.
 */
export const fetchImages = async (): Promise<any[]> => {
  // Log the fetch attempt using logger
  logger.info('Fetching pending AI-generated images.');

  try {
    // Send a GET request to the '/pending' endpoint using imageClient
    const response = await imageClient.get('/pending');

    // Log the successful response using logger
    logger.info('Successfully fetched pending images.', { data: response.data });

    // Return the list of images
    return response.data;
  } catch (error) {
    // Log the error using logger
    logger.error('Error fetching pending images.', { error });

    // Throw the error to be handled by the caller
    throw error;
  }
};

/**
 * Approves a specific AI-generated image.
 *
 * Requirements Addressed:
 * - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
 *   Location: Technical Specification -> Technical Requirements -> Feature 7: Admin Controls.
 *
 * @param {string} imageId - The ID of the image to approve.
 * @returns {Promise<void>} Resolves when the image is approved or rejects with an error.
 */
export const approveImage = async (imageId: string): Promise<void> => {
  // Validate the imageId using validateInput
  if (!validateInput(imageId)) {
    const validationError = new Error('Invalid image ID provided.');
    logger.error('Validation error in approveImage.', { imageId, error: validationError });
    throw validationError;
  }

  // Log the approval attempt using logger
  logger.info(`Approving image with ID: ${imageId}.`);

  try {
    // Send a POST request to the '/approve' endpoint with the imageId using imageClient
    const response = await imageClient.post('/approve', { imageId });

    // Log the successful response using logger
    logger.info('Image approved successfully.', { imageId, data: response.data });

    // Resolve the promise if successful
    return;
  } catch (error) {
    // Log the error using logger
    logger.error('Error approving image.', { imageId, error });

    // Throw the error to be handled by the caller
    throw error;
  }
};

/**
 * Deletes a specific AI-generated image.
 *
 * Requirements Addressed:
 * - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
 *   Location: Technical Specification -> Technical Requirements -> Feature 7: Admin Controls.
 *
 * @param {string} imageId - The ID of the image to delete.
 * @returns {Promise<void>} Resolves when the image is deleted or rejects with an error.
 */
export const deleteImage = async (imageId: string): Promise<void> => {
  // Validate the imageId using validateInput
  if (!validateInput(imageId)) {
    const validationError = new Error('Invalid image ID provided.');
    logger.error('Validation error in deleteImage.', { imageId, error: validationError });
    throw validationError;
  }

  // Log the deletion attempt using logger
  logger.info(`Deleting image with ID: ${imageId}.`);

  try {
    // Send a DELETE request to the '/delete' endpoint with the imageId using imageClient
    const response = await imageClient.delete('/delete', { data: { imageId } });

    // Log the successful response using logger
    logger.info('Image deleted successfully.', { imageId, data: response.data });

    // Resolve the promise if successful
    return;
  } catch (error) {
    // Log the error using logger
    logger.error('Error deleting image.', { imageId, error });

    // Throw the error to be handled by the caller
    throw error;
  }
};