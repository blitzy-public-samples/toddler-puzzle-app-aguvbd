// Import internal dependencies
import { PurchaseModel, Purchase } from '../models/PurchaseModel';
import { UserModel } from '../models/UserModel';
import { initializeLogger } from '../utils/Logger';
import { validatePurchaseData } from '../utils/Validator';
import { sendSuccessResponse, sendErrorResponse } from '../utils/ResponseHelper';
import { processPayment } from './PaymentService';

// Import external dependencies
import Stripe from 'stripe'; // Version 8.174.0

// Constants / Globals
const STRIPE_API_KEY = 'your_production_stripe_api_key';

// Initialize the Stripe client with the API key
const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: '2020-08-27' });

// Initialize the logger
const logger = initializeLogger('PurchaseService');

// Interface definitions
interface PurchaseData {
    userId: number;
    amount: number;
    paymentMethodId: string;
    currency: string;
}

interface UpdatePurchaseData {
    amount?: number;
    currency?: string;
}

interface PaymentResult {
    success: boolean;
    paymentIntentId?: string;
    error?: any;
}

/**
 * PurchaseService handles operations related to purchases within the Toddler Puzzle App,
 * including creating, updating, and managing purchase records. It integrates with the
 * PaymentService to process payments and records transactions in the database.
 *
 * Requirements Addressed:
 * - Purchase Processing and Management:
 *   Implements the logic for managing purchase records and integrating with the payment system to handle transactions.
 *   Location: TECHNICAL REQUIREMENTS/Feature 3: One-Time Payment Model
 */
export class PurchaseService {
    /**
     * Creates a new purchase record and processes the payment using the Stripe API.
     *
     * Requirements Addressed:
     * - TR-3.1: Integrate with Stripe for processing one-time payments.
     * - TR-3.2: Securely store and manage payment tokens to comply with PCI-DSS standards.
     * - TR-3.3: Implement a purchase flow that is intuitive for users, especially parents.
     * - TR-3.5: Ensure the payment system gracefully handles failures and provides appropriate feedback to users.
     *   Location: TECHNICAL REQUIREMENTS/Feature 3: One-Time Payment Model
     *
     * @param purchaseData - The data required to create a new purchase.
     * @returns The result of the purchase creation, including transaction details.
     */
    public static async createPurchase(purchaseData: PurchaseData): Promise<any> {
        try {
            // Step 1: Validate the purchase data using validatePurchaseData.
            const validData = validatePurchaseData(purchaseData);

            // Step 2: Initialize the Stripe client with the API key.
            // (Already initialized globally above.)

            // Step 3: Process the payment using processPayment from PaymentService.
            const paymentResult: PaymentResult = await processPayment(validData);

            // Step 4: If the payment is successful, create a new purchase record in the PurchaseModel.
            if (paymentResult.success && paymentResult.paymentIntentId) {
                const purchaseRecord = await PurchaseModel.create({
                    userId: validData.userId,
                    amount: validData.amount,
                    currency: validData.currency,
                    paymentIntentId: paymentResult.paymentIntentId,
                    purchaseDate: new Date(),
                });

                // Step 5: Log the purchase creation operation using initializeLogger.
                logger.info(`Purchase created successfully for userId: ${validData.userId}, purchaseId: ${purchaseRecord.id}`);

                // Step 6: Send a success response using sendSuccessResponse.
                return sendSuccessResponse({
                    message: 'Purchase successful',
                    purchase: purchaseRecord,
                });
            } else {
                // If an error occurs during payment processing, log the error and send an error response.
                // Step 7: Log the error and send an error response using sendErrorResponse.
                logger.error(`Payment failed for userId: ${validData.userId}`, paymentResult.error);
                return sendErrorResponse('Payment processing failed', paymentResult.error);
            }
        } catch (error) {
            // If an error occurs during processing, log and handle it.
            // Step 7 (continued): Log the error and send an error response.
            logger.error(`Error occurred during purchase creation: ${error.message}`, error);
            return sendErrorResponse('An error occurred during purchase creation', error);
        }
    }

    /**
     * Updates an existing purchase record in the database.
     *
     * Requirements Addressed:
     * - Implements the logic to update purchase records.
     *   Location: TECHNICAL REQUIREMENTS/Feature 3: One-Time Payment Model
     *
     * @param purchaseId - The ID of the purchase to update.
     * @param updateData - The data to update the purchase record with.
     * @returns The updated purchase record.
     */
    public static async updatePurchase(purchaseId: number, updateData: UpdatePurchaseData): Promise<Purchase> {
        try {
            // Step 1: Validate the update data using validatePurchaseData.
            const validData = validatePurchaseData(updateData);

            // Step 2: Use PurchaseModel to update the purchase record with the specified ID.
            const updatedPurchase = await PurchaseModel.update(purchaseId, validData);

            if (!updatedPurchase) {
                throw new Error(`Purchase with ID ${purchaseId} not found.`);
            }

            // Step 3: Log the update operation using initializeLogger.
            logger.info(`Purchase updated successfully for purchaseId: ${purchaseId}`);

            // Step 4: Return the updated purchase record.
            return updatedPurchase;
        } catch (error) {
            // Log the error.
            logger.error(`Error occurred during purchase update: ${error.message}`, error);
            throw error;
        }
    }

    /**
     * Deletes a purchase record from the database.
     *
     * Requirements Addressed:
     * - Implements the logic to delete purchase records.
     *   Location: TECHNICAL REQUIREMENTS/Feature 3: One-Time Payment Model
     *
     * @param purchaseId - The ID of the purchase to delete.
     * @returns True if the deletion was successful, otherwise false.
     */
    public static async deletePurchase(purchaseId: number): Promise<boolean> {
        try {
            // Step 1: Use PurchaseModel to delete the purchase record with the specified ID.
            const deletionResult = await PurchaseModel.delete(purchaseId);

            // Step 2: Log the deletion operation using initializeLogger.
            logger.info(`Purchase deleted successfully for purchaseId: ${purchaseId}`);

            // Step 3: Return true if the deletion was successful, otherwise false.
            return deletionResult;
        } catch (error) {
            // Log the error.
            logger.error(`Error occurred during purchase deletion: ${error.message}`, error);
            return false;
        }
    }
}