import { Request, Response } from 'express';
// Stripe version 8.174.0
import Stripe from 'stripe';

// Internal dependencies
import PurchaseService from '../services/PurchaseService';
import UserService from '../services/UserService';
import PaymentService from '../services/PaymentService';
import { sendSuccessResponse, sendErrorResponse } from '../utils/ResponseHelper';

// Note: The authenticateRequest middleware should be applied in the route definitions
// to ensure that only authenticated users can perform purchase operations.

/**
 * Controller for handling purchase-related requests.
 *
 * Addresses:
 * - Feature 3: One-Time Payment Model
 *
 * Location:
 * - TECHNICAL REQUIREMENTS/Feature 3: One-Time Payment Model
 */

/**
 * Handles the creation of a new purchase record and processes payment.
 *
 * Requirements Addressed:
 * - TR-3.1: Integrate with Stripe (or equivalent) for processing one-time payments.
 * - TR-3.2: Securely store and manage payment tokens to comply with PCI-DSS standards.
 * - TR-3.3: Implement a purchase flow that is intuitive for users, especially parents.
 * - TR-3.4: Provide transaction receipts and confirmation messages upon successful payments.
 * - TR-3.5: Ensure the payment system gracefully handles failures and provides appropriate feedback to users.
 *
 * @param req - Express request object containing purchase data.
 * @param res - Express response object for sending responses.
 */
export const createPurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract purchase data from the request body
        const { userId, amount, paymentMethodId, purchaseItems } = req.body;

        // Validate and process the purchase using PurchaseService
        const purchaseData = {
            userId,
            amount,
            purchaseItems
        };

        // Process payment using PaymentService
        // Addresses TR-3.1 by integrating with Stripe for payment processing
        const paymentIntent = await PaymentService.processPayment(userId, amount, paymentMethodId);

        // Securely store payment details to comply with PCI-DSS standards (TR-3.2)
        // PurchaseService handles the storage of paymentIntent.id without sensitive data

        // Create a new purchase record in the database
        const purchaseRecord = await PurchaseService.createPurchaseRecord(purchaseData, paymentIntent.id);

        // Provide transaction receipt and confirmation (TR-3.4)
        sendSuccessResponse(res, {
            message: 'Purchase successful',
            purchase: purchaseRecord,
            receiptUrl: paymentIntent.receipt_url // Assuming PaymentService returns receipt_url
        });
    } catch (error) {
        // Gracefully handle failures and provide feedback (TR-3.5)
        sendErrorResponse(res, error);
    }
};

/**
 * Handles updating an existing purchase record.
 *
 * Requirements Addressed:
 * - Ensures accurate purchase records for auditing and user reference.
 *
 * Location:
 * - TECHNICAL REQUIREMENTS/Feature 3: One-Time Payment Model
 *
 * @param req - Express request object containing update data.
 * @param res - Express response object for sending responses.
 */
export const updatePurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract purchase ID from the request parameters
        const { purchaseId } = req.params;

        // Extract update data from the request body
        const updateData = req.body;

        // Update the purchase record using PurchaseService
        const updatedPurchase = await PurchaseService.updatePurchaseRecord(purchaseId, updateData);

        // Return success response with updated purchase details
        sendSuccessResponse(res, {
            message: 'Purchase updated successfully',
            purchase: updatedPurchase
        });
    } catch (error) {
        // Handle errors and return error response
        sendErrorResponse(res, error);
    }
};

/**
 * Handles deleting a purchase record.
 *
 * Requirements Addressed:
 * - Provides mechanisms for users to manage their purchase history as per data protection regulations.
 *
 * Location:
 * - TECHNICAL REQUIREMENTS/Feature 3: One-Time Payment Model
 *
 * @param req - Express request object containing purchase ID.
 * @param res - Express response object for sending responses.
 */
export const deletePurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract purchase ID from the request parameters
        const { purchaseId } = req.params;

        // Delete the purchase record using PurchaseService
        await PurchaseService.deletePurchaseRecord(purchaseId);

        // Confirm deletion to the client
        sendSuccessResponse(res, {
            message: 'Purchase deleted successfully'
        });
    } catch (error) {
        // Handle errors and return error response
        sendErrorResponse(res, error);
    }
};