// Importing necessary modules and dependencies

// Importing express to handle HTTP request and response objects
import { Request, Response, NextFunction, Router } from 'express'; // express version 4.17.1

// Internal dependencies
import { PuzzleService } from '../services/PuzzleService';
import { sendSuccessResponse, sendErrorResponse } from '../utils/ResponseHelper';
import { authenticateRequest } from '../middlewares/AuthMiddleware';
import { handleError } from '../middlewares/ErrorMiddleware';

// This controller manages HTTP requests for puzzle-related operations.
// It interacts with the PuzzleService for business logic and utilizes various middlewares for authentication and error handling.

export class PuzzleController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    // Initialize all puzzle-related routes
    private initializeRoutes(): void {
        // Route to create a new puzzle
        this.router.post('/puzzles', authenticateRequest, this.createPuzzle.bind(this));
        // Route to get a puzzle by ID
        this.router.get('/puzzles/:id', authenticateRequest, this.getPuzzleById.bind(this));
        // Route to update an existing puzzle
        this.router.put('/puzzles/:id', authenticateRequest, this.updatePuzzle.bind(this));
        // Route to delete a puzzle
        this.router.delete('/puzzles/:id', authenticateRequest, this.deletePuzzle.bind(this));
    }

    /**
     * Handles the creation of a new puzzle.
     * 
     * Addresses Requirement: Puzzle Data Management
     * - Location: SYSTEM ARCHITECTURE/Database Server
     * - Description: Handles CRUD operations and business logic related to puzzle data.
     * 
     * Steps:
     * 1. Extract puzzle data from the request body.
     * 2. Call PuzzleService.createPuzzle with the extracted data.
     * 3. If successful, send a success response using sendSuccessResponse.
     * 4. If an error occurs, send an error response using sendErrorResponse.
     * 
     * @param req - Express request object containing puzzle data in the body.
     * @param res - Express response object for sending responses.
     * @param next - Next function for passing control to the error handling middleware.
     */
    private async createPuzzle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Step 1: Extract puzzle data from the request body.
            const puzzleData = req.body;

            // Step 2: Call PuzzleService.createPuzzle with the extracted data.
            const newPuzzle = await PuzzleService.createPuzzle(puzzleData);

            // Step 3: If successful, send a success response using sendSuccessResponse.
            sendSuccessResponse(res, newPuzzle);
        } catch (error) {
            // Step 4: If an error occurs, send an error response using sendErrorResponse.
            sendErrorResponse(res, error);
            next(error);
        }
    }

    /**
     * Retrieves a puzzle by its ID.
     * 
     * Addresses Requirement: Puzzle Data Management
     * - Location: SYSTEM ARCHITECTURE/Database Server
     * - Description: Handles CRUD operations and business logic related to puzzle data.
     * 
     * Steps:
     * 1. Extract puzzle ID from the request parameters.
     * 2. Call PuzzleService.getPuzzleById with the extracted ID.
     * 3. If the puzzle is found, send a success response with the puzzle data.
     * 4. If not found, send an error response indicating the puzzle was not found.
     * 
     * @param req - Express request object containing the puzzle ID in params.
     * @param res - Express response object for sending responses.
     * @param next - Next function for passing control to the error handling middleware.
     */
    private async getPuzzleById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Step 1: Extract puzzle ID from the request parameters.
            const puzzleId = req.params.id;

            // Step 2: Call PuzzleService.getPuzzleById with the extracted ID.
            const puzzle = await PuzzleService.getPuzzleById(puzzleId);

            if (puzzle) {
                // Step 3: If the puzzle is found, send a success response with the puzzle data.
                sendSuccessResponse(res, puzzle);
            } else {
                // Step 4: If not found, send an error response indicating the puzzle was not found.
                sendErrorResponse(res, { message: 'Puzzle not found', statusCode: 404 });
            }
        } catch (error) {
            sendErrorResponse(res, error);
            next(error);
        }
    }

    /**
     * Updates an existing puzzle's information.
     * 
     * Addresses Requirement: Puzzle Data Management
     * - Location: SYSTEM ARCHITECTURE/Database Server
     * - Description: Handles CRUD operations and business logic related to puzzle data.
     * 
     * Steps:
     * 1. Extract puzzle ID and update data from the request.
     * 2. Call PuzzleService.updatePuzzle with the extracted ID and data.
     * 3. If successful, send a success response with the updated puzzle data.
     * 4. If an error occurs, send an error response using sendErrorResponse.
     * 
     * @param req - Express request object containing the puzzle ID in params and update data in body.
     * @param res - Express response object for sending responses.
     * @param next - Next function for passing control to the error handling middleware.
     */
    private async updatePuzzle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Step 1: Extract puzzle ID and update data from the request.
            const puzzleId = req.params.id;
            const updateData = req.body;

            // Step 2: Call PuzzleService.updatePuzzle with the extracted ID and data.
            const updatedPuzzle = await PuzzleService.updatePuzzle(puzzleId, updateData);

            // Step 3: If successful, send a success response with the updated puzzle data.
            sendSuccessResponse(res, updatedPuzzle);
        } catch (error) {
            // Step 4: If an error occurs, send an error response using sendErrorResponse.
            sendErrorResponse(res, error);
            next(error);
        }
    }

    /**
     * Deletes a puzzle from the database.
     * 
     * Addresses Requirement: Puzzle Data Management
     * - Location: SYSTEM ARCHITECTURE/Database Server
     * - Description: Handles CRUD operations and business logic related to puzzle data.
     * 
     * Steps:
     * 1. Extract puzzle ID from the request parameters.
     * 2. Call PuzzleService.deletePuzzle with the extracted ID.
     * 3. If successful, send a success response indicating the puzzle was deleted.
     * 4. If an error occurs, send an error response using sendErrorResponse.
     * 
     * @param req - Express request object containing the puzzle ID in params.
     * @param res - Express response object for sending responses.
     * @param next - Next function for passing control to the error handling middleware.
     */
    private async deletePuzzle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Step 1: Extract puzzle ID from the request parameters.
            const puzzleId = req.params.id;

            // Step 2: Call PuzzleService.deletePuzzle with the extracted ID.
            await PuzzleService.deletePuzzle(puzzleId);

            // Step 3: If successful, send a success response indicating the puzzle was deleted.
            sendSuccessResponse(res, { message: 'Puzzle deleted successfully' });
        } catch (error) {
            // Step 4: If an error occurs, send an error response using sendErrorResponse.
            sendErrorResponse(res, error);
            next(error);
        }
    }
}

// Export an instance of PuzzleController with initialized routes
export const puzzleController = new PuzzleController();