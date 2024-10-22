# settings.py
# Configuration settings for the AI integration module, including API keys,
# logging levels, caching options, and content moderation thresholds.

# Requirements Addressed:
# - Provide configuration settings for AI image generation and content moderation.
#   Location: TECHNICAL REQUIREMENTS/Feature 2: AI-Generated Images
#   - TR-2.1: Establish a reliable connection with the DALL-E API for image generation.
#   - TR-2.2: Implement caching mechanisms to store AI-generated images locally.
#   - TR-2.3: Develop a content moderation pipeline to filter and approve images before use.
#   - TR-2.5: Handle API rate limiting and implement retry logic for failed requests.

# Import necessary standard library modules
# No external dependencies are required as per the specification.

# API key for authenticating requests to the AI image generation service (DALL-E API).
# This setting addresses requirement TR-2.1.
AI_IMAGE_API_KEY = '<your-api-key-here>'

# Base URL for the AI image generation API.
# Used to construct API requests.
AI_IMAGE_API_BASE_URL = 'https://api.openai.com/v1/images'

# Logging level for the AI integration module.
# Valid options are 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'.
# This assists in monitoring API interactions and content moderation processes.
# Influenced by overall application requirements for logging and monitoring.
LOG_LEVEL = 'INFO'

# Threshold for determining if an AI-generated image meets content standards.
# The value ranges from 0.0 to 1.0, where higher values impose stricter content moderation.
# This setting addresses requirement TR-2.3.
CONTENT_MODERATION_THRESHOLD = 0.85

# Enable or disable caching of AI-generated images locally.
# This setting addresses requirement TR-2.2.
CACHE_ENABLED = True

# Directory path where cached images are stored.
# Ensure that this directory has appropriate read/write permissions.
CACHE_DIR = '/path/to/cache'

# Maximum number of retries for API requests in case of failures due to rate limiting or network issues.
# This setting addresses requirement TR-2.5.
MAX_API_RETRIES = 3

# Timeout settings for API requests to the AI image generation service.
# Specified in seconds to prevent hanging requests.
API_TIMEOUT = 30

# Rate limit settings for API requests.
# Number of API requests allowed per minute.
API_REQUESTS_PER_MINUTE = 60

# User agent string used when making API requests.
# May be required by the API provider for analytics or rate limiting.
USER_AGENT = 'ToddlerPuzzleApp-AIIntegration/1.0'

# Additional headers to include in API requests.
# Constructs the Authorization header using the provided API key.
API_REQUEST_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {AI_IMAGE_API_KEY}',
    'User-Agent': USER_AGENT,
}

# Note to Developers:
# Ensure that all sensitive information such as API keys are securely stored
# and not hard-coded in production.
# Consider using environment variables or a secure vault for managing secrets.