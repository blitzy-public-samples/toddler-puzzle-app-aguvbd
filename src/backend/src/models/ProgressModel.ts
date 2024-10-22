// Importing Sequelize ORM (version 6.6.5) for interacting with the PostgreSQL database.
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Importing UserModel to associate progress records with specific users.
import UserModel from './UserModel';
// Importing PuzzleModel to associate progress records with specific puzzles.
import PuzzleModel from './PuzzleModel';
// Importing initializeLogger to log progress model operations and errors.
import { initializeLogger } from '../utils/Logger';
// Importing validateProgressData to validate progress data before database operations.
import { validateProgressData } from '../utils/Validator';

const logger = initializeLogger('ProgressModel');

// Interface defining the attributes of a Progress record.
interface ProgressAttributes {
  id: number;
  user_id: number;
  puzzle_id: number;
  completion_date: Date;
}

// Interface for creation attributes, where 'id' and 'completion_date' are optional.
interface ProgressCreationAttributes
  extends Optional<ProgressAttributes, 'id' | 'completion_date'> {}

/**
 * Represents the progress model for interacting with the progress table.
 * Handles CRUD operations and business logic related to user progress data.
 * (Requirement: Progress Data Management, Location: SYSTEM ARCHITECTURE/Database Server)
 */
class Progress
  extends Model<ProgressAttributes, ProgressCreationAttributes>
  implements ProgressAttributes
{
  public id!: number;
  public user_id!: number;
  public puzzle_id!: number;
  public completion_date!: Date;

  // Timestamps for record creation and updates.
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initializing the Progress model with the defined schema.
// ProgressSchema defines the schema for the progress table, including fields like id, user_id, puzzle_id, and completion_date.
Progress.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
    puzzle_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: PuzzleModel,
        key: 'id',
      },
    },
    completion_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'progress',
    sequelize, // Passing the Sequelize instance.
  }
);

// Setting up associations with UserModel and PuzzleModel.
Progress.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
Progress.belongsTo(PuzzleModel, { foreignKey: 'puzzle_id', as: 'puzzle' });

/**
 * Creates a new progress record in the database.
 * Handles CRUD operations and business logic related to user progress data.
 * (Requirement: Progress Data Management, Location: SYSTEM ARCHITECTURE/Database Server)
 * @param {ProgressCreationAttributes} progressData - The data for the new progress record.
 * @returns {Promise<Progress>} - The created progress record.
 */
export async function createProgress(
  progressData: ProgressCreationAttributes
): Promise<Progress> {
  // Validate the progress data using Validator utilities.
  // (Dependency: validateProgressData from src/backend/src/utils/Validator.ts)
  const isValid = validateProgressData(progressData);
  if (!isValid) {
    logger.error('Invalid progress data.');
    throw new Error('Invalid progress data.');
  }

  try {
    // Use Sequelize to create a new progress record with the provided data.
    const progress = await Progress.create(progressData);

    // Log the creation operation using the logger.
    // (Dependency: initializeLogger from src/backend/src/utils/Logger.ts)
    logger.info(`Progress record created with ID: ${progress.id}`);

    // Return the created progress record.
    return progress;
  } catch (error) {
    logger.error('Error creating progress record:', error);
    throw error;
  }
}

/**
 * Finds a progress record by its ID.
 * Handles CRUD operations and business logic related to user progress data.
 * (Requirement: Progress Data Management, Location: SYSTEM ARCHITECTURE/Database Server)
 * @param {number} progressId - The ID of the progress record to find.
 * @returns {Promise<Progress | null>} - The progress record if found, otherwise null.
 */
export async function findProgressById(
  progressId: number
): Promise<Progress | null> {
  try {
    // Use Sequelize to query the database for a progress record with the specified ID.
    const progress = await Progress.findByPk(progressId);

    // Log the query operation using the logger.
    logger.info(`Queried progress record with ID: ${progressId}`);

    // Return the progress record if found, otherwise return null.
    return progress;
  } catch (error) {
    logger.error('Error querying progress record:', error);
    throw error;
  }
}

/**
 * Represents the progress model for interacting with the progress table.
 * Handles CRUD operations and business logic related to user progress data.
 * (Requirement: Progress Data Management, Location: SYSTEM ARCHITECTURE/Database Server)
 */
class ProgressModel {
  /**
   * Initializes the ProgressModel with the defined schema.
   */
  constructor() {
    // Initialization logic if necessary.
  }

  /**
   * Updates an existing progress record in the database.
   * @param {number} progressId - The ID of the progress record to update.
   * @param {Partial<ProgressAttributes>} updateData - The data to update the progress record with.
   * @returns {Promise<Progress | null>} - The updated progress record.
   */
  async updateProgress(
    progressId: number,
    updateData: Partial<ProgressAttributes>
  ): Promise<Progress | null> {
    // Validate the update data using Validator utilities.
    // (Dependency: validateProgressData from src/backend/src/utils/Validator.ts)
    const isValid = validateProgressData(updateData);
    if (!isValid) {
      logger.error('Invalid update data for progress record.');
      throw new Error('Invalid update data for progress record.');
    }

    try {
      // Use Sequelize to update the progress record with the specified ID.
      const [numberOfAffectedRows, [updatedProgress]] = await Progress.update(
        updateData,
        {
          where: { id: progressId },
          returning: true,
        }
      );

      // Log the update operation using the logger.
      logger.info(`Updated progress record with ID: ${progressId}`);

      // Return the updated progress record.
      if (numberOfAffectedRows > 0) {
        return updatedProgress;
      } else {
        return null;
      }
    } catch (error) {
      logger.error('Error updating progress record:', error);
      throw error;
    }
  }

  /**
   * Deletes a progress record from the database.
   * @param {number} progressId - The ID of the progress record to delete.
   * @returns {Promise<boolean>} - True if the deletion was successful, otherwise false.
   */
  async deleteProgress(progressId: number): Promise<boolean> {
    try {
      // Use Sequelize to delete the progress record with the specified ID.
      const numberOfDeletedRows = await Progress.destroy({
        where: { id: progressId },
      });

      // Log the deletion operation using the logger.
      logger.info(`Deleted progress record with ID: ${progressId}`);

      // Return true if the deletion was successful, otherwise false.
      return numberOfDeletedRows > 0;
    } catch (error) {
      logger.error('Error deleting progress record:', error);
      throw error;
    }
  }
}

// Exporting the Progress model and ProgressModel class.
export { Progress, ProgressModel };