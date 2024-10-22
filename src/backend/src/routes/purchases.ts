// src/backend/src/routes/purchases.ts

import express from 'express'; // Importing Express framework (version 4.17.1) for setting up HTTP routes.
import { PurchaseController } from '../controllers/PurchaseController'; // Handles HTTP requests related to purchase operations.
import { authenticateRequest } from '../middlewares/AuthMiddleware'; // Ensures that only authenticated users can perform purchase operations.
import { handleError } from '../middlewares/ErrorMiddleware'; // Handles errors and sends standardized error responses.
import { rateLimiter } from '../middlewares/RateLimiterMiddleware'; // Limits the number of requests a client can make to prevent abuse.

/**
 * Configures the Express router with routes for purchase operations.
 * 
 * @param router - Express.Router object to which the purchase routes will be attached.
 * 
 * Requirements Addressed:
 * - Implement a secure and user-friendly one-time payment system allowing users to unlock additional puzzles without recurring subscriptions.
 *   - Location: TECHNICAL REQUIREMENTS/Feature 3: One-Time Payment Model
 */
export function setupPurchaseRoutes(router: express.Router): void {
    // Initialize an Express router instance for purchase routes.
    const purchaseRouter = express.Router();

    // Define a POST route for creating purchases.
    // Middlewares:
    // - authenticateRequest: Ensures only authenticated users can create a purchase.
    // - rateLimiter: Prevents abuse by limiting the number of purchase requests.
    // Controller:
    // - PurchaseController.createPurchase: Handles the creation of a new purchase record.
    purchaseRouter.post(
        '/',
        authenticateRequest,
        rateLimiter,
        PurchaseController.createPurchase
    );

    // Define a PUT route for updating purchases.
    // Middleware:
    // - authenticateRequest: Ensures only authenticated users can update a purchase.
    // Controller:
    // - PurchaseController.updatePurchase: Handles updating an existing purchase record.
    purchaseRouter.put(
        '/:purchaseId',
        authenticateRequest,
        PurchaseController.updatePurchase
    );

    // Define a DELETE route for deleting purchases.
    // Middleware:
    // - authenticateRequest: Ensures only authenticated users can delete a purchase.
    // Controller:
    // - PurchaseController.deletePurchase: Handles deletion of a purchase record.
    purchaseRouter.delete(
        '/:purchaseId',
        authenticateRequest,
        PurchaseController.deletePurchase
    );

    // Apply handleError middleware to handle any errors that occur during request processing.
    purchaseRouter.use(handleError);

    // Mount the purchase router onto the main router at the '/purchases' path.
    router.use('/purchases', purchaseRouter);
}