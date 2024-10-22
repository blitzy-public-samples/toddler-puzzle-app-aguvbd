// Winston logging library (version 3.3.3)
// Imported as per 'Import the winston library' in function steps
import winston from 'winston';

// Global log level
const LOG_LEVEL = 'info';

/**
 * Initializes and configures the logger with specified settings.
 *
 * Requirements addressed:
 * - Logging and Monitoring
 *   - Location: SECURITY CONSIDERATIONS/Regular Security Audits
 *   - Description: Ensures that all significant events and errors are logged for monitoring and auditing purposes.
 *
 * @returns {winston.Logger} A configured logger instance.
 */
function initializeLogger(): winston.Logger {
  // Step 1: The winston library is imported at the top of the file

  // Step 2: Define custom log levels and their colors
  // Categorizes logs by severity and assigns colors for easy identification
  const customLevels = {
    levels: {
      error: 0, // Critical errors requiring immediate attention
      warn: 1,  // Warnings about potential issues
      info: 2,  // General informational messages
      http: 3,  // HTTP request logs
      debug: 4, // Detailed debug information
    },
    colors: {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'blue',
    },
  };

  // Apply custom colors to winston
  winston.addColors(customLevels.colors);

  // Step 3: Create a winston logger instance with console and file transports
  // Transports determine where the logs are output (console and file)
  const logger = winston.createLogger({
    level: LOG_LEVEL, // Sets the minimum level of messages to log
    levels: customLevels.levels,
    format: winston.format.combine(
      // Include a timestamp in the log message
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      // Apply colorization based on log level
      winston.format.colorize(),
      // Define the log message format
      winston.format.printf((info) => {
        return `${info.timestamp} [${info.level}]: ${info.message}`;
      })
    ),
    transports: [
      // Output logs to the console
      new winston.transports.Console(),
      // Output logs to a file for persistent storage and auditing
      new winston.transports.File({ filename: 'logs/app.log' }),
    ],
    exitOnError: false, // Prevents the logger from exiting the application on error
  });

  // Step 4: Return the configured logger instance for use throughout the application
  return logger;
}

// Export the initializeLogger function for use in other modules
export { initializeLogger };