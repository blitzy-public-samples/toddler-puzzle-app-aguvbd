// Import the necessary modules and middlewares.

// Import Router and Application from express to define routes and types.
// Requirement Addressed: Implementing admin routes for HTTP requests.
// Location: TECHNICAL REQUIREMENTS/Feature 7: Admin Controls (TR-7.1)

import { Router, Application } from 'express'; // express@4.17.1

// Import AdminController which handles administrative actions such as approving or deleting AI-generated images.
// Requirement Addressed: Implementing logic for admin actions.
// Location: TECHNICAL REQUIREMENTS/Feature 7: Admin Controls (TR-7.2)

import { AdminController } from '../controllers/AdminController';

// Import authenticateRequest middleware to ensure only authenticated administrators can access admin routes.
// Requirement Addressed: Secure admin route access.
// Location: TECHNICAL REQUIREMENTS/Feature 7: Admin Controls (TR-7.1)

import { authenticateRequest } from '../middlewares/AuthMiddleware';

// Import rateLimiter middleware to prevent abuse and mitigate denial-of-service (DoS) attacks.
// Requirement Addressed: Implementing rate limiting.
// Location: TECHNICAL REQUIREMENTS/Security Considerations (TR-7.6)

import { rateLimiter } from '../middlewares/RateLimiterMiddleware';

// Import handleError middleware to handle errors during request processing.
// Requirement Addressed: Proper error handling in admin routes.
// Location: TECHNICAL REQUIREMENTS/General Error Handling

import { handleError } from '../middlewares/ErrorMiddleware';

// Create a new Router instance for admin routes.
// Requirement Addressed: Defining admin-specific routes.
// Location: TECHNICAL REQUIREMENTS/Feature 7: Admin Controls (TR-7.1)

const adminRouter = Router();

// Define the route for approving an image.
// Applies authentication and rate limiting middlewares.
// Requirement Addressed: Allow administrators to approve AI-generated images.
// Location: TECHNICAL REQUIREMENTS/Feature 7: Admin Controls (TR-7.2)

adminRouter.post(
  '/images/:id/approve',
  authenticateRequest, // Ensure only authenticated admins can access.
  rateLimiter,         // Prevent abuse and mitigate DoS attacks.
  AdminController.approveImage // Controller method to approve the image.
);

// Define the route for deleting an image.
// Applies authentication and rate limiting middlewares.
// Requirement Addressed: Allow administrators to delete AI-generated images.
// Location: TECHNICAL REQUIREMENTS/Feature 7: Admin Controls (TR-7.2)

adminRouter.delete(
  '/images/:id',
  authenticateRequest, // Ensure only authenticated admins can access.
  rateLimiter,         // Prevent abuse and mitigate DoS attacks.
  AdminController.deleteImage // Controller method to delete the image.
);

// Use the handleError middleware to manage errors for these routes.
// Requirement Addressed: Proper error handling in admin routes.
// Location: TECHNICAL REQUIREMENTS/General Error Handling

adminRouter.use(handleError);

/**
 * Configures the admin routes for handling HTTP requests related to administrative actions.
 * @param {Application} app - The Express app instance.
 * @returns {void} - Sets up the routes on the provided Express app instance.
 *
 * Requirement Addressed: Attach admin routes to the main app.
 * Location: TECHNICAL REQUIREMENTS/Feature 7: Admin Controls (TR-7.1)
 */
export function setupAdminRoutes(app: Application): void {
  // Attach the admin router to the app under the '/admin' path.
  app.use('/admin', adminRouter);
}