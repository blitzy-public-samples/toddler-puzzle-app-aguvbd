# Import the built-in logging module (Python 3.x standard library)
import logging  # version: Python 3.x built-in module

def setup_logger(log_level: str) -> logging.Logger:
    """
    Configures and returns a logger instance with specified logging level.

    Addresses:
    - Requirement: Implement logging mechanisms to monitor AI image generation and content moderation activities.
    - Location: TECHNICAL REQUIREMENTS/Feature 2: AI-Generated Images

    Parameters:
        log_level (str): Logging level as a string (e.g., 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL').

    Returns:
        logging.Logger: Configured logger instance.
    """
    # Create a logger instance with a predefined name for AI integration components
    logger = logging.getLogger('ai_integration_logger')

    # Set the logging level based on the provided log_level parameter
    # Default to INFO level if the provided level is invalid
    level = getattr(logging, log_level.upper(), logging.INFO)
    logger.setLevel(level)

    # Create a console handler and set its logging level
    console_handler = logging.StreamHandler()
    console_handler.setLevel(level)

    # Define a logging format and set it for the console handler
    # Format includes timestamp, logger name, log level, and message
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    console_handler.setFormatter(formatter)

    # Add the console handler to the logger instance if not already added
    if not logger.handlers:
        logger.addHandler(console_handler)

    # Return the configured logger instance
    return logger