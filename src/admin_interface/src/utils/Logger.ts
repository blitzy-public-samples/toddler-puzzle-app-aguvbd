// Importing the winston logging library (version 3.3.3) for logging functionalities
import winston from 'winston'; // version 3.3.3

// Importing API_BASE_URL from Constants for constructing log messages related to API interactions
import { API_BASE_URL } from './Constants';

// Creating a logger instance with 'info' level and JSON format, outputting logs to the console
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ],
});

// Function to log informational messages
/**
 * Logs informational messages for monitoring and debugging purposes.
 * Addresses Requirement: 'Logging and Monitoring'
 * Location: Technical Specification/System Components/Monitoring and Logging
 * @param message - The informational message to log.
 */
export function logInfo(message: string): void {
    // Format the message with a timestamp and API_BASE_URL
    const logMessage = {
        timestamp: new Date().toISOString(),
        apiUrl: API_BASE_URL,
        message: message,
    };

    // Log the message at the 'info' level using the logger
    logger.info(logMessage);
}

// Function to log error messages
/**
 * Logs error messages with details for error monitoring and debugging.
 * Addresses Requirement: 'Logging and Monitoring'
 * Location: Technical Specification/System Components/Monitoring and Logging
 * @param message - The error message to log.
 * @param error - The error object containing stack trace information.
 */
export function logError(message: string, error: Error): void {
    // Format the message with a timestamp, error details, and API_BASE_URL
    const logMessage = {
        timestamp: new Date().toISOString(),
        apiUrl: API_BASE_URL,
        message: message,
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
        },
    };

    // Log the message at the 'error' level using the logger
    logger.error(logMessage);
}