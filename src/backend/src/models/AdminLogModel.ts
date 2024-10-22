// src/backend/src/models/AdminLogModel.ts
// This file defines the AdminLogModel for interacting with the admin_logs table in the database.
// It includes methods for creating and querying log entries related to administrative actions,
// ensuring that all significant admin operations are recorded for auditing purposes.

// Requirements Addressed:
// - Admin Controls (TECHNICAL REQUIREMENTS/Feature 7: Admin Controls)
//   Provides administrators with tools to manage AI-generated content, including approving or deleting images
//   to maintain quality and appropriateness.

// External Dependencies:
// ORM for interacting with the PostgreSQL database.
// Sequelize version 6.6.5
import { Sequelize, DataTypes, Model, Optional } from 'sequelize'; // v6.6.5

// Internal Dependencies:
// To log operations and errors related to admin logs.
import { initializeLogger } from '../utils/Logger';

// Validator utilities for input validation.
import { Validator } from '../utils/Validator';

// Initialize the logger for AdminLogModel operations.
const logger = initializeLogger('AdminLogModel');

// Interface for AdminLog attributes.
interface AdminLogAttributes {
  id: number;
  admin_id: number;
  action: string;
  timestamp: Date;
}

// Interface for AdminLog creation attributes.
interface AdminLogCreationAttributes extends Optional<AdminLogAttributes, 'id' | 'timestamp'> {}

// AdminLogSchema:
// Defines the schema for the admin_logs table, including fields like id, admin_id, action, and timestamp.
class AdminLog
  extends Model<AdminLogAttributes, AdminLogCreationAttributes>
  implements AdminLogAttributes {
  public id!: number;
  public admin_id!: number;
  public action!: string;
  public timestamp!: Date;

  // Timestamps.
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// AdminLogModel:
// Represents the admin log model for interacting with the admin_logs table.
export class AdminLogModel {
  // Sequelize instance.
  private sequelize: Sequelize;

  // Sequelize model for AdminLog.
  private AdminLogModel: typeof AdminLog;

  // Constructor:
  // Initializes the AdminLogModel with the defined schema.
  // - Defines the AdminLogSchema with fields and constraints.
  // - Initializes the Sequelize model with the AdminLogSchema.
  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;

    // Initialize AdminLog model.
    this.AdminLogModel = AdminLog.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        admin_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        action: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        timestamp: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'admin_logs',
        sequelize: this.sequelize,
        timestamps: false,
      }
    );

    logger.info('AdminLogModel initialized.');
  }

  // createLogEntry:
  // Creates a new log entry in the admin_logs table.
  // Parameters:
  // - logData: object containing admin_id and action.
  // Returns:
  // - The created log entry.
  // Steps:
  // 1. Validate the logData using Validator utilities.
  // 2. Use Sequelize to create a new log entry with the provided data.
  // 3. Log the creation operation using the logger.
  // 4. Return the created log entry.
  async createLogEntry(logData: { admin_id: number; action: string }): Promise<AdminLog> {
    try {
      // Step 1: Validate the logData using Validator utilities.
      Validator.validateAdminLogData(logData);

      // Step 2: Use Sequelize to create a new log entry with the provided data.
      const newLog = await this.AdminLogModel.create(logData);

      // Step 3: Log the creation operation using the logger.
      logger.info(`Created log entry for admin_id: ${logData.admin_id}, action: ${logData.action}`);

      // Step 4: Return the created log entry.
      return newLog;
    } catch (error) {
      logger.error('Error creating log entry:', error);
      throw error;
    }
  }

  // findLogsByAdminId:
  // Finds log entries by admin ID.
  // Parameters:
  // - adminId: number representing the admin's ID.
  // Returns:
  // - An array of log entries associated with the specified admin ID.
  // Steps:
  // 1. Use Sequelize to query the database for log entries with the specified admin ID.
  // 2. Log the query operation using the logger.
  // 3. Return the list of log entries.
  async findLogsByAdminId(adminId: number): Promise<AdminLog[]> {
    try {
      // Step 1: Use Sequelize to query the database for log entries with the specified admin ID.
      const logs = await this.AdminLogModel.findAll({
        where: { admin_id: adminId },
        order: [['timestamp', 'DESC']],
      });

      // Step 2: Log the query operation using the logger.
      logger.info(`Retrieved ${logs.length} logs for admin_id: ${adminId}`);

      // Step 3: Return the list of log entries.
      return logs;
    } catch (error) {
      logger.error('Error retrieving logs by admin ID:', error);
      throw error;
    }
  }

  // deleteLogEntry:
  // Deletes a log entry from the admin_logs table.
  // Parameters:
  // - logId: number representing the log entry's ID.
  // Returns:
  // - True if the deletion was successful, otherwise false.
  // Steps:
  // 1. Use Sequelize to delete the log entry with the specified ID.
  // 2. Log the deletion operation using the logger.
  // 3. Return true if the deletion was successful, otherwise false.
  async deleteLogEntry(logId: number): Promise<boolean> {
    try {
      // Step 1: Use Sequelize to delete the log entry with the specified ID.
      const deletedCount = await this.AdminLogModel.destroy({
        where: { id: logId },
      });

      // Step 2: Log the deletion operation using the logger.
      if (deletedCount > 0) {
        logger.info(`Deleted log entry with id: ${logId}`);
      } else {
        logger.warn(`No log entry found with id: ${logId}`);
      }

      // Step 3: Return true if the deletion was successful, otherwise false.
      return deletedCount > 0;
    } catch (error) {
      logger.error('Error deleting log entry:', error);
      throw error;
    }
  }
}