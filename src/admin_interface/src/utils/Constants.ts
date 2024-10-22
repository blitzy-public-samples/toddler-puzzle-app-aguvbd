/**
 * Constants.ts
 *
 * This file defines constant values used throughout the admin interface,
 * ensuring consistency and ease of maintenance.
 *
 * Requirements Addressed:
 * - Consistent Configuration
 *   - Location: Technical Specification/System Components/Configuration Management
 *   - Description: Provides a centralized location for defining constant values
 *     used across the admin interface, ensuring consistency and ease of updates.
 */

/**
 * API base URL for the admin interface requests.
 * Ensures all API requests are directed to the correct endpoint.
 */
export const API_BASE_URL = 'https://api.example.com/admin';

/**
 * Default number of items per page for pagination.
 * Used across the admin interface to maintain consistent pagination behavior.
 */
export const DEFAULT_PAGE_SIZE = 20;

/**
 * Maximum allowed image upload size in bytes.
 * Restricts image uploads to prevent excessive server load and ensures optimal performance.
 * Calculation: 5 * 1024 * 1024 bytes = 5 MB
 */
export const MAX_IMAGE_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB