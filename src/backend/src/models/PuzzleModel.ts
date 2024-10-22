// Import necessary modules and dependencies
import { Sequelize, Model, DataTypes, Optional } from 'sequelize'; // ORM for interacting with the PostgreSQL database.
// Sequelize version: 6.6.5

import initializeLogger from '../utils/Logger'; // To log puzzle model operations and errors.
import validatePuzzleData from '../utils/Validator'; // To validate puzzle data before database operations.

// Initialize logger
const logger = initializeLogger();

// Interface for Puzzle attributes
interface PuzzleAttributes {
  id: number;
  image_url: string;
  theme: string;
  difficulty_level: number;
}

// Interface for Puzzle creation attributes
interface PuzzleCreationAttributes extends Optional<PuzzleAttributes, 'id'> {}

// Puzzle class extending Sequelize Model
class Puzzle extends Model<PuzzleAttributes, PuzzleCreationAttributes> implements PuzzleAttributes {
  public id!: number;
  public image_url!: string;
  public theme!: string;
  public difficulty_level!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Puzzle model with the defined schema.
// This addresses the requirement:
// "Defines the schema for the puzzles table, including fields like id, image_url, theme, and difficulty_level."
// Location: TECHNICAL REQUIREMENTS -> Feature 2: AI-Generated Images -> TR-2.4
function initPuzzleModel(sequelize: Sequelize): typeof Puzzle {
  Puzzle.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[4, 9, 16]],
        },
      },
    },
    {
      tableName: 'puzzles',
      sequelize,
    }
  );

  return Puzzle;
}

// Represents the puzzle model for interacting with the puzzles table.
// Addresses "Puzzle Data Management" in SYSTEM ARCHITECTURE/Database Server.
class PuzzleModel {
  private puzzleModel: typeof Puzzle;

  // Initializes the PuzzleModel with the defined schema.
  constructor(private sequelize: Sequelize) {
    // Define the PuzzleSchema with fields and constraints.
    // Initialize the Sequelize model with the PuzzleSchema.
    this.puzzleModel = initPuzzleModel(this.sequelize);
  }

  /**
   * Creates a new puzzle record in the database.
   * Requirements Addressed:
   * - "Create a new puzzle record in the database."
   * - Location: TECHNICAL REQUIREMENTS -> Feature 2: AI-Generated Images -> TR-2.1
   * @param puzzleData - The data for the new puzzle.
   * @returns The created puzzle record.
   */
  async createPuzzle(puzzleData: Partial<PuzzleAttributes>): Promise<Puzzle> {
    try {
      // Validate the puzzle data using Validator utilities.
      validatePuzzleData(puzzleData);

      // Use Sequelize to create a new puzzle record with the provided data.
      const puzzle = await this.puzzleModel.create(puzzleData);

      // Log the creation operation using the logger.
      logger.info(`Created puzzle with ID: ${puzzle.id}`);

      // Return the created puzzle record.
      return puzzle;
    } catch (error) {
      logger.error('Error creating puzzle:', error);
      throw error;
    }
  }

  /**
   * Finds a puzzle record by its ID.
   * Requirements Addressed:
   * - "Finds a puzzle record by its ID."
   * - Location: TECHNICAL REQUIREMENTS -> Feature 1: Puzzle Difficulty Levels -> TR-1.4
   * @param puzzleId - The ID of the puzzle to find.
   * @returns The puzzle record if found, otherwise null.
   */
  async findPuzzleById(puzzleId: number): Promise<Puzzle | null> {
    try {
      // Use Sequelize to query the database for a puzzle with the specified ID.
      const puzzle = await this.puzzleModel.findByPk(puzzleId);

      // Log the query operation using the logger.
      logger.info(`Queried puzzle with ID: ${puzzleId}`);

      // Return the puzzle record if found, otherwise return null.
      return puzzle;
    } catch (error) {
      logger.error('Error finding puzzle by ID:', error);
      throw error;
    }
  }

  /**
   * Updates an existing puzzle record in the database.
   * Requirements Addressed:
   * - "Updates an existing puzzle record in the database."
   * - Location: TECHNICAL REQUIREMENTS -> Feature 5: Parental Controls -> TR-5.1
   * @param puzzleId - The ID of the puzzle to update.
   * @param updateData - The data to update the puzzle with.
   * @returns The updated puzzle record.
   */
  async updatePuzzle(puzzleId: number, updateData: Partial<PuzzleAttributes>): Promise<Puzzle> {
    try {
      // Validate the update data using Validator utilities.
      validatePuzzleData(updateData);

      // Use Sequelize to update the puzzle record with the specified ID.
      const puzzle = await this.findPuzzleById(puzzleId);
      if (!puzzle) {
        throw new Error(`Puzzle with ID ${puzzleId} not found.`);
      }
      await puzzle.update(updateData);

      // Log the update operation using the logger.
      logger.info(`Updated puzzle with ID: ${puzzleId}`);

      // Return the updated puzzle record.
      return puzzle;
    } catch (error) {
      logger.error('Error updating puzzle:', error);
      throw error;
    }
  }

  /**
   * Deletes a puzzle record from the database.
   * Requirements Addressed:
   * - "Deletes a puzzle record from the database."
   * - Location: TECHNICAL REQUIREMENTS -> Feature 7: Admin Controls -> TR-7.2
   * @param puzzleId - The ID of the puzzle to delete.
   * @returns True if the deletion was successful, otherwise false.
   */
  async deletePuzzle(puzzleId: number): Promise<boolean> {
    try {
      // Use Sequelize to delete the puzzle record with the specified ID.
      const deletionCount = await this.puzzleModel.destroy({ where: { id: puzzleId } });

      // Log the deletion operation using the logger.
      logger.info(`Deleted puzzle with ID: ${puzzleId}`);

      // Return true if the deletion was successful, otherwise false.
      return deletionCount > 0;
    } catch (error) {
      logger.error('Error deleting puzzle:', error);
      throw error;
    }
  }
}

export { PuzzleModel, Puzzle, initPuzzleModel };