// src/backend/src/models/PurchaseModel.ts

/**
 * PurchaseModel - Defines the Purchase model for interacting with the purchases table in the database.
 * Addresses Requirement: Purchase Data Management
 * Location: SYSTEM ARCHITECTURE/Database Server
 * Description: Handles CRUD operations and business logic related to purchase data.
 */

import {
  Sequelize,
  DataTypes,
  Model,
  Optional
} from 'sequelize'; // sequelize version 6.6.5

import { initializeLogger } from '../utils/Logger'; // To log purchase model operations and errors.
import { validatePurchaseData } from '../utils/Validator'; // To validate purchase data before database operations.
import { User } from './UserModel'; // To associate purchase records with specific users.
import { Puzzle } from './PuzzleModel'; // To associate purchase records with specific puzzles.

const logger = initializeLogger('PurchaseModel');

/**
 * Interface representing the attributes of a Purchase.
 */
interface PurchaseAttributes {
  id: number;
  user_id: number;
  puzzle_id: number;
  purchase_date: Date;
  amount: number;
}

/**
 * Interface for Purchase creation attributes.
 */
interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'id' | 'purchase_date'> {}

/**
 * Represents the purchase model for interacting with the purchases table.
 * Addresses Requirement: Purchase Data Management
 * Location: SYSTEM ARCHITECTURE/Database Server
 * Description: Handles CRUD operations and business logic related to purchase data.
 */
export class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
  public id!: number;
  public user_id!: number;
  public puzzle_id!: number;
  public purchase_date!: Date;
  public amount!: number;

  // Timestamps for Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Initializes the PurchaseModel with the defined schema.
   * Steps:
   * 1. Define the PurchaseSchema with fields and constraints.
   * 2. Initialize the Sequelize model with the PurchaseSchema.
   * @param sequelize - The Sequelize instance to initialize the model with.
   */
  static initialize(sequelize: Sequelize) {
    Purchase.init(
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
            model: User,
            key: 'id',
          },
        },
        puzzle_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: Puzzle,
            key: 'id',
          },
        },
        purchase_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'purchases',
        modelName: 'Purchase',
      }
    );
  }

  /**
   * Creates a new purchase record in the database.
   * Addresses Requirement: Purchase Data Management
   * Location: SYSTEM ARCHITECTURE/Database Server
   * Steps:
   * 1. Validate the purchase data using Validator utilities.
   * 2. Use Sequelize to create a new purchase record with the provided data.
   * 3. Log the creation operation using the logger.
   * 4. Return the created purchase record.
   * @param purchaseData - The data for the new purchase.
   * @returns The created purchase record.
   */
  static async createPurchase(purchaseData: PurchaseCreationAttributes): Promise<Purchase> {
    try {
      // Validate the purchase data using Validator utilities.
      validatePurchaseData(purchaseData);

      // Use Sequelize to create a new purchase record with the provided data.
      const purchase = await Purchase.create(purchaseData);

      // Log the creation operation using the logger.
      logger.info(`Created purchase with ID: ${purchase.id}`);

      // Return the created purchase record.
      return purchase;
    } catch (error) {
      logger.error('Error creating purchase:', error);
      throw error;
    }
  }

  /**
   * Finds a purchase record by its ID.
   * Addresses Requirement: Purchase Data Management
   * Location: SYSTEM ARCHITECTURE/Database Server
   * Steps:
   * 1. Use Sequelize to query the database for a purchase with the specified ID.
   * 2. Log the query operation using the logger.
   * 3. Return the purchase record if found, otherwise return null.
   * @param purchaseId - The ID of the purchase to find.
   * @returns The purchase record if found, otherwise null.
   */
  static async findPurchaseById(purchaseId: number): Promise<Purchase | null> {
    try {
      // Use Sequelize to query the database for a purchase with the specified ID.
      const purchase = await Purchase.findByPk(purchaseId);

      // Log the query operation using the logger.
      if (purchase) {
        logger.info(`Found purchase with ID: ${purchase.id}`);
      } else {
        logger.info(`No purchase found with ID: ${purchaseId}`);
      }

      // Return the purchase record if found, otherwise return null.
      return purchase;
    } catch (error) {
      logger.error('Error finding purchase:', error);
      throw error;
    }
  }

  /**
   * Updates an existing purchase record in the database.
   * Addresses Requirement: Purchase Data Management
   * Location: SYSTEM ARCHITECTURE/Database Server
   * Steps:
   * 1. Validate the update data using Validator utilities.
   * 2. Use Sequelize to update the purchase record with the specified ID.
   * 3. Log the update operation using the logger.
   * 4. Return the updated purchase record.
   * @param purchaseId - The ID of the purchase to update.
   * @param updateData - The data to update the purchase with.
   * @returns The updated purchase record.
   */
  static async updatePurchase(purchaseId: number, updateData: Partial<PurchaseAttributes>): Promise<Purchase> {
    try {
      // Validate the update data using Validator utilities.
      validatePurchaseData(updateData);

      // Use Sequelize to update the purchase record with the specified ID.
      const purchase = await Purchase.findByPk(purchaseId);
      if (!purchase) {
        throw new Error(`Purchase with ID ${purchaseId} not found`);
      }
      await purchase.update(updateData);

      // Log the update operation using the logger.
      logger.info(`Updated purchase with ID: ${purchase.id}`);

      // Return the updated purchase record.
      return purchase;
    } catch (error) {
      logger.error('Error updating purchase:', error);
      throw error;
    }
  }

  /**
   * Deletes a purchase record from the database.
   * Addresses Requirement: Purchase Data Management
   * Location: SYSTEM ARCHITECTURE/Database Server
   * Steps:
   * 1. Use Sequelize to delete the purchase record with the specified ID.
   * 2. Log the deletion operation using the logger.
   * 3. Return true if the deletion was successful, otherwise false.
   * @param purchaseId - The ID of the purchase to delete.
   * @returns True if the deletion was successful, otherwise false.
   */
  static async deletePurchase(purchaseId: number): Promise<boolean> {
    try {
      // Use Sequelize to delete the purchase record with the specified ID.
      const deletedCount = await Purchase.destroy({
        where: { id: purchaseId },
      });

      // Log the deletion operation using the logger.
      if (deletedCount > 0) {
        logger.info(`Deleted purchase with ID: ${purchaseId}`);
        // Return true if the deletion was successful.
        return true;
      } else {
        logger.info(`No purchase found to delete with ID: ${purchaseId}`);
        // Return false if no records were deleted.
        return false;
      }
    } catch (error) {
      logger.error('Error deleting purchase:', error);
      throw error;
    }
  }
}

/**
 * Initializes associations for the Purchase model.
 * Should be called after all models have been initialized.
 */
export function initPurchaseAssociations() {
  // Associate Purchase with User
  Purchase.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
  });

  // Associate Purchase with Puzzle
  Purchase.belongsTo(Puzzle, {
    foreignKey: 'puzzle_id',
    as: 'puzzle',
  });
}