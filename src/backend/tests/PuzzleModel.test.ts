// src/backend/tests/PuzzleModel.test.ts

// Unit tests for the PuzzleModel, ensuring that all CRUD operations and business logic functions perform as expected.
// This file addresses the 'Puzzle Data Management Testing' requirement located in 'SYSTEM ARCHITECTURE/Database Server' in the technical specification.
// It ensures that the PuzzleModel's CRUD operations and business logic are correctly implemented and reliable.

// External Dependencies

// Note: Jest (version 26.6.3) functions are available globally in the test environment.
// Sequelize for mocking database interactions during tests (version 6.6.5)
import { Sequelize } from 'sequelize';

// Internal Dependencies

// Importing PuzzleModel to test CRUD operations and business logic related to puzzles.
import PuzzleModel from '../src/models/PuzzleModel';

// Importing initializeLogger to log test operations and errors.
import { initializeLogger } from '../src/utils/Logger';

// Importing validatePuzzleData to ensure test data conforms to expected formats.
import { validatePuzzleData } from '../src/utils/Validator';

// Initializing the logger for logging test operations and errors.
const logger = initializeLogger();

// Setting up the Sequelize instance for testing.
let sequelize: Sequelize;

// Mock data for testing.
const testPuzzleData = {
  title: 'Test Puzzle',
  imageUrl: 'https://example.com/test-puzzle.png',
  difficultyLevel: 4,
  theme: 'Animals',
};

describe('PuzzleModel Tests', () => {
  // Before each test, mock the database connection and PuzzleModel.
  beforeEach(async () => {
    // Initializing an in-memory SQLite database for testing purposes.
    sequelize = new Sequelize('sqlite::memory:', { logging: false });

    // Adding the PuzzleModel to the Sequelize instance.
    sequelize.addModels([PuzzleModel]);

    // Synchronizing all models with the database.
    await sequelize.sync({ force: true });
  });

  // After each test, close the database connection.
  afterEach(async () => {
    await sequelize.close();
  });

  // Test to create a new puzzle record in the database.
  it('testCreatePuzzle: should create a new puzzle', async () => {
    // This test addresses 'Puzzle Data Management Testing' located in 'SYSTEM ARCHITECTURE/Database Server'.
    // Steps:
    // 1. Mock the database connection and PuzzleModel.
    // (Done in beforeEach)

    // 2. Define valid puzzle data for testing.
    const validPuzzleData = testPuzzleData;

    // Validate the puzzle data to ensure it conforms to expected formats.
    validatePuzzleData(validPuzzleData);

    // 3. Call PuzzleModel.create with the test data.
    const createdPuzzle = await PuzzleModel.create(validPuzzleData);

    // 4. Assert that the puzzle is created successfully and the returned object matches expectations.
    expect(createdPuzzle).toBeDefined();
    expect(createdPuzzle.title).toBe(validPuzzleData.title);
    expect(createdPuzzle.imageUrl).toBe(validPuzzleData.imageUrl);
    expect(createdPuzzle.difficultyLevel).toBe(validPuzzleData.difficultyLevel);
    expect(createdPuzzle.theme).toBe(validPuzzleData.theme);

    // 5. Log the test result using initializeLogger.
    logger.info('testCreatePuzzle passed.');
  });

  // Test to find a puzzle record by its ID.
  it('testFindPuzzleById: should find a puzzle by ID', async () => {
    // This test addresses 'Puzzle Data Management Testing' located in 'SYSTEM ARCHITECTURE/Database Server'.
    // Steps:
    // 1. Mock the database connection and PuzzleModel.
    // (Done in beforeEach)

    // 2. Define a puzzle ID for testing.
    const puzzle = await PuzzleModel.create(testPuzzleData);
    const testPuzzleId = puzzle.id;

    // 3. Call PuzzleModel.findByPk with the test ID.
    const foundPuzzle = await PuzzleModel.findByPk(testPuzzleId);

    // 4. Assert that the correct puzzle object is returned or null if not found.
    expect(foundPuzzle).not.toBeNull();
    expect(foundPuzzle?.id).toBe(testPuzzleId);
    expect(foundPuzzle?.title).toBe(testPuzzleData.title);

    // 5. Log the test result using initializeLogger.
    logger.info('testFindPuzzleById passed.');
  });

  // Test to update an existing puzzle record in the database.
  it('testUpdatePuzzle: should update an existing puzzle', async () => {
    // This test addresses 'Puzzle Data Management Testing' located in 'SYSTEM ARCHITECTURE/Database Server'.
    // Steps:
    // 1. Mock the database connection and PuzzleModel.
    // (Done in beforeEach)

    // 2. Define a puzzle ID and update data for testing.
    const puzzle = await PuzzleModel.create(testPuzzleData);
    const testPuzzleId = puzzle.id;
    const updateData = { title: 'Updated Puzzle Title' };

    // 3. Call PuzzleModel.update with the test ID and data.
    await PuzzleModel.update(updateData, { where: { id: testPuzzleId } });

    // 4. Assert that the puzzle is updated successfully and the returned object matches expectations.
    const updatedPuzzle = await PuzzleModel.findByPk(testPuzzleId);
    expect(updatedPuzzle).not.toBeNull();
    expect(updatedPuzzle?.title).toBe(updateData.title);

    // 5. Log the test result using initializeLogger.
    logger.info('testUpdatePuzzle passed.');
  });

  // Test to delete a puzzle record from the database.
  it('testDeletePuzzle: should delete a puzzle', async () => {
    // This test addresses 'Puzzle Data Management Testing' located in 'SYSTEM ARCHITECTURE/Database Server'.
    // Steps:
    // 1. Mock the database connection and PuzzleModel.
    // (Done in beforeEach)

    // 2. Define a puzzle ID for testing.
    const puzzle = await PuzzleModel.create(testPuzzleData);
    const testPuzzleId = puzzle.id;

    // 3. Call PuzzleModel.destroy with the test ID.
    const deletedRows = await PuzzleModel.destroy({ where: { id: testPuzzleId } });

    // 4. Assert that the puzzle is deleted successfully and the return value is true.
    expect(deletedRows).toBe(1);

    const deletedPuzzle = await PuzzleModel.findByPk(testPuzzleId);
    expect(deletedPuzzle).toBeNull();

    // 5. Log the test result using initializeLogger.
    logger.info('testDeletePuzzle passed.');
  });
});