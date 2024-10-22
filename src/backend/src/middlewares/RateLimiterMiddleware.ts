// Import necessary modules

// Import express-rate-limit module (version 5.2.6)
// Purpose: To provide rate limiting middleware for Express applications.
// Requirement Addressed: Implements rate limiting to prevent abuse and mitigate denial-of-service (DoS) attacks.
// Location: SECURITY CONSIDERATIONS/Rate Limiting and Throttling
import rateLimit from 'express-rate-limit'; // express-rate-limit version 5.2.6

// Import internal dependencies

// initializeLogger from src/backend/src/utils/Logger.ts
// Purpose: To log rate limiting operations and violations.
import { initializeLogger } from '../utils/Logger';

// sendErrorResponse from src/backend/src/utils/ResponseHelper.ts
// Purpose: To send standardized error responses when rate limits are exceeded.
import { sendErrorResponse } from '../utils/ResponseHelper';

// Initialize logger
const logger = initializeLogger('RateLimiterMiddleware');

// Global constants
// RATE_LIMIT_WINDOW_MS: 60000
// MAX_REQUESTS_PER_WINDOW: 100

// Setting the rate limit window in milliseconds and maximum requests per window
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100;

// Middleware function to limit the number of requests a client can make within a specified time window.
// Requirement Addressed: Implements rate limiting to prevent abuse and mitigate denial-of-service (DoS) attacks.
// Location: SECURITY CONSIDERATIONS/Rate Limiting and Throttling
const rateLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS, // Time window in milliseconds
    max: MAX_REQUESTS_PER_WINDOW, // Maximum number of requests per IP per window

    // Custom handler when the rate limit is exceeded
    handler: (req, res) => {
        // Log rate limiting actions using initializeLogger
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);

        // If a request exceeds the limit, use sendErrorResponse to notify the client
        // Purpose: To send standardized error responses when rate limits are exceeded.
        sendErrorResponse(res, 429, 'Too many requests, please try again later.');

        // Requirement Addressed: Implements rate limiting to prevent abuse and mitigate denial-of-service (DoS) attacks.
        // Location: SECURITY CONSIDERATIONS/Rate Limiting and Throttling
    },
});

// Export the rateLimiter middleware to apply it to incoming requests
export default rateLimiter;