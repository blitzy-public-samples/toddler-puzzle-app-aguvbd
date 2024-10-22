// Importing internal dependencies
import { initializeLogger } from '../utils/Logger'; // To log payment operations and errors.
// Located at src/backend/src/utils/Logger.ts

import { validatePurchaseData } from '../utils/Validator'; // To validate purchase data before processing payments.
// Located at src/backend/src/utils/Validator.ts

import { sendSuccessResponse, sendErrorResponse } from '../utils/ResponseHelper'; // To send standardized success and error responses.
// Located at src/backend/src/utils/ResponseHelper.ts

import { PurchaseModel } from '../models/PurchaseModel'; // To interact with the purchases table for recording payment transactions.
// Located at src/backend/src/models/PurchaseModel.ts

// Importing external dependencies
import Stripe from 'stripe'; // To handle secure payment processing and transactions.
// Version: 8.174.0

// Initializing Stripe with the API key
const STRIPE_API_KEY = 'your_production_stripe_api_key';
const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: '2020-08-27' });

// Initializing logger for the PaymentService module
const logger = initializeLogger('PaymentService');

/**
 * Processes a payment using the Stripe API and records the transaction in the database.
 *
 * This function addresses the following requirement:
 * - **Requirement Name:** One-Time Payment Model
 * - **Location:** TECHNICAL REQUIREMENTS/Feature 3: One-Time Payment Model
 * - **Description:** Implement a secure and user-friendly one-time payment system allowing users to unlock additional puzzles without recurring subscriptions.
 *
 * @param paymentData - The payment data object containing details necessary for processing the payment.
 * @returns A promise that resolves to the result of the payment processing, including transaction details.
 */
export async function processPayment(paymentData: any): Promise<any> {
    try {
        // Step 1: Validate the payment data using validatePurchaseData.
        // Ensuring all required fields are present and correctly formatted.
        const isValidData = validatePurchaseData(paymentData);
        if (!isValidData) {
            // Log the error if payment data is invalid.
            logger.error('Invalid payment data received.', { paymentData });

            // Send an error response indicating invalid payment data.
            return sendErrorResponse('Invalid payment data provided. Please check the payment details and try again.');
        }

        // Step 2: Initialize the Stripe client with the API key.
        // (Already initialized above.)

        // Step 3: Create a payment intent using the Stripe API with the provided payment data.
        const paymentIntent = await stripe.paymentIntents.create({
            amount: paymentData.amount, // Amount in the smallest currency unit (e.g., cents).
            currency: paymentData.currency, // Three-letter ISO currency code.
            payment_method: paymentData.paymentMethodId, // Payment method ID from the client.
            confirmation_method: 'manual', // Confirmation method set to manual.
            confirm: true, // Confirm the payment intent immediately.
        });

        // Step 4: Log the payment processing operation using initializeLogger.
        logger.info('Payment intent created successfully.', {
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
            userId: paymentData.userId,
        });

        // Step 5: If the payment is successful, record the transaction in the PurchaseModel.
        if (paymentIntent.status === 'succeeded') {
            // Record the successful transaction in the database.
            const purchaseRecord = await PurchaseModel.create({
                userId: paymentData.userId,
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                paymentMethod: paymentIntent.payment_method,
                status: paymentIntent.status,
                transactionId: paymentIntent.id,
                createdAt: new Date(),
            });

            // Step 6: Send a success response using sendSuccessResponse.
            return sendSuccessResponse({
                message: 'Payment processed successfully. Thank you for your purchase!',
                purchase: purchaseRecord,
                transactionDetails: paymentIntent,
            });
        } else if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
            // Handle cases requiring additional authentication (e.g., 3D Secure).
            logger.warn('Payment requires additional action.', {
                paymentIntentId: paymentIntent.id,
                status: paymentIntent.status,
            });

            // Inform the client that further action is needed.
            return sendSuccessResponse({
                requiresAction: true,
                paymentIntentClientSecret: paymentIntent.client_secret,
            });
        } else {
            // If payment was not successful.
            logger.warn('Payment was not successful.', {
                paymentIntentId: paymentIntent.id,
                status: paymentIntent.status,
            });

            // Send an error response indicating failure.
            return sendErrorResponse('Payment was not successful. Please try again or use a different payment method.');
        }
    } catch (error: any) {
        // Step 7: If an error occurs during payment processing, log the error and send an error response.
        logger.error('Error processing payment.', {
            errorType: error.type,
            errorMessage: error.message,
            paymentData,
        });

        // Determine the error message to return to the client based on error type.
        let errorMessage = 'An unexpected error occurred during payment processing.';

        if (error.type === 'StripeCardError') {
            // Card was declined or had incorrect details.
            // Error message is safe to display to the user.
            errorMessage = error.message;
        } else if (error.type === 'StripeInvalidRequestError') {
            // Invalid parameters were supplied to Stripe's API.
            errorMessage = 'Invalid payment details provided. Please check and try again.';
        } else if (error.type === 'StripeAPIError') {
            // An error occurred internally with Stripe's API.
            errorMessage = 'Payment service is currently unavailable. Please try again later.';
        } else if (error.type === 'StripeConnectionError') {
            // Network communication with Stripe failed.
            errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.type === 'StripeAuthenticationError') {
            // Incorrect API key provided.
            errorMessage = 'Payment processing error. Please contact support.';
        }

        // Send the error response to the client.
        return sendErrorResponse(errorMessage);
    }
}