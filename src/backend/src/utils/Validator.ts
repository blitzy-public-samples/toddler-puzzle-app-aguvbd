// Import the logger from Logger.ts
import { initializeLogger } from './Logger'; // initializeLogger; See internal dependency from 'src/backend/src/utils/Logger.ts'
// Logger.ts is used to log validation operations and errors.

// Initialize the logger instance
const logger = initializeLogger();

/**
 * Interface representing the structure of PuzzleData.
 * 
 * This interface corresponds to the Puzzle data model defined in:
 * - Database Design / Data Models / Puzzle Table
 *   Ensures that puzzle data contains all the required fields before being processed or stored.
 */
interface PuzzleData {
    puzzle_id: number;
    image_url: string;
    theme: string;
    difficulty_level: number;
}

/**
 * Validates the format of an email address.
 * 
 * Requirements Addressed:
 * - Data Validation (API Design/Authentication APIs)
 *   - Ensures that all input data is validated for correctness and security before being processed or stored.
 * 
 * @param email - The email address to validate.
 * @returns True if the email format is valid, otherwise false.
 */
export function validateEmail(email: string): boolean {
    // Regular expression to validate email address format.
    // This regex checks for the general format of an email address.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regex pattern.
    const isValid = emailRegex.test(email);

    // Log the validation result.
    if (isValid) {
        logger.info(`Email validation passed for: ${email}`);
    } else {
        logger.warn(`Email validation failed for: ${email}`);
    }

    // Return the validation result.
    return isValid;
}

/**
 * Validates the strength of a password.
 * 
 * Requirements Addressed:
 * - Data Validation (API Design/Authentication APIs)
 *   - Ensures that all input data is validated for correctness and security before being processed or stored.
 * 
 * @param password - The password string to validate.
 * @returns True if the password meets strength requirements, otherwise false.
 */
export function validatePassword(password: string): boolean {
    // Password strength requirements:
    // - Minimum 8 characters
    // - At least one letter and one number
    // - Optionally, include special characters for additional strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Test the password against the regex pattern.
    const isValid = passwordRegex.test(password);

    // Log the validation result.
    if (isValid) {
        logger.info(`Password validation passed.`);
    } else {
        logger.warn(`Password validation failed. Password does not meet strength requirements.`);
    }

    // Return the validation result.
    return isValid;
}

/**
 * Validates the data for creating or updating a puzzle.
 * 
 * Requirements Addressed:
 * - Data Validation (API Design/Authentication APIs)
 *   - Ensures that all input data is validated for correctness and security before being processed or stored.
 * 
 * @param puzzleData - The puzzle data object to validate.
 * @returns True if the puzzle data is valid, otherwise false.
 */
export function validatePuzzleData(puzzleData: PuzzleData): boolean {
    let isValid = true;

    // Required fields as per the Puzzle data model.
    const requiredFields: Array<keyof PuzzleData> = ['puzzle_id', 'image_url', 'theme', 'difficulty_level'];

    // Check that all required fields are present.
    for (const field of requiredFields) {
        if (puzzleData[field] === undefined || puzzleData[field] === null) {
            logger.warn(`Puzzle data validation failed. Missing or null field: ${field}`);
            isValid = false;
            break;
        }
    }

    // Check that the difficulty_level is one of the allowed values (4, 9, 16).
    if (![4, 9, 16].includes(puzzleData.difficulty_level)) {
        logger.warn(`Puzzle data validation failed. Invalid difficulty_level: ${puzzleData.difficulty_level}`);
        isValid = false;
    }

    // Additional format checks for 'image_url'.
    // Ensure 'image_url' is a valid URL.
    const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    if (!urlRegex.test(puzzleData.image_url)) {
        logger.warn(`Puzzle data validation failed. Invalid image_url: ${puzzleData.image_url}`);
        isValid = false;
    }

    // If all checks passed, log the success.
    if (isValid) {
        logger.info(`Puzzle data validation passed for puzzle_id: ${puzzleData.puzzle_id}`);
    }

    // Return the validation result.
    return isValid;
}