// src/admin_interface/src/utils/Validator.ts

// Description:
// This file provides validation utilities for the admin interface, ensuring data integrity and correctness across various components.

// Requirements Addressed:
// - Data Validation (Technical Specification/System Components/Data Management)
//   - Ensures that input data is validated for correctness and integrity before being processed by other components or services.

import { API_BASE_URL } from './Constants';
// Importing 'API_BASE_URL' from Constants.ts
// Purpose: May be used for validation related to API endpoints.

import { logger } from './Logger';
// Importing the logger utility from Logger.ts
// Purpose: Logs validation operations and errors.

/**
 * Validates input data against predefined rules to ensure data integrity.
 *
 * Requirement Addressed:
 * - Data Validation (Technical Specification/System Components/Data Management)
 *
 * @param data - The input data object to be validated.
 * @returns Returns true if the data is valid, otherwise throws an error.
 */
export function validateInput(data: Record<string, unknown>): boolean {
  // Step 1: Receive the input data to be validated.
  // The 'data' parameter is expected to be an object containing key-value pairs representing the input data.

  try {
    // Step 2: Check the data against predefined validation rules.
    // Perform necessary checks such as type validation, required fields, and value constraints.
    // This ensures data integrity before being processed by other components or services.

    // Example validation logic (to be expanded based on actual validation rules):

    // Check if 'data' is not null or undefined.
    if (data == null) {
      throw new Error('Input data is null or undefined.');
    }

    // Check for required fields.
    // For instance, verify that essential properties exist in the data object.
    const requiredFields = ['username', 'email']; // Example required fields.
    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate property types.
    // Ensure that properties have the correct data types.
    if (typeof data['username'] !== 'string') {
      throw new Error('Invalid type for username; expected a string.');
    }
    if (typeof data['email'] !== 'string') {
      throw new Error('Invalid type for email; expected a string.');
    }

    // Ensure values meet expected formats or patterns.
    // For example, validate email format using a regular expression.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data['email'] as string)) {
      throw new Error('Invalid email format.');
    }

    // Step 3: Log the validation process using logger.
    // Log that the input data has passed all validation checks.
    logger.info('Input data validation successful.', { data });

    // Step 4: Return true if all checks pass.
    return true;
  } catch (error) {
    // If validation fails, log the error details.
    logger.error('Input data validation failed.', {
      data,
      error: (error as Error).message,
    });

    // Throw an error with details to be handled by calling components.
    throw new Error(`Validation Error: ${(error as Error).message}`);
  }
}