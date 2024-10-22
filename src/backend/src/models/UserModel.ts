// This file defines the UserModel for interacting with the users table in the database.
// It includes methods for creating, reading, updating, and deleting user records,
// as well as handling user-specific business logic.
//
// Requirements Addressed:
// - User Data Management
//   Location: SYSTEM ARCHITECTURE/Database Server
//   Description: Handles CRUD operations and business logic related to user data.

// External Dependencies
// ORM for interacting with the PostgreSQL database.
// Version: sequelize 6.6.5
import { Sequelize, DataTypes, Model, Optional } from 'sequelize'; // Sequelize v6.6.5

// Internal Dependencies
// To log user model operations and errors.
import { initializeLogger } from '../utils/Logger';
// To validate email addresses before processing user data.
import { validateEmail, validatePassword } from '../utils/Validator';

// Initialize the logger specific to UserModel operations.
const logger = initializeLogger('UserModel');

// Interface defining the attributes of the User.
interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
}

// Interface for User creation attributes, making 'id' optional during creation.
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Defines the User model extending Sequelize's Model class.
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public role!: string;

  // Timestamps for the record.
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// UserModel class for interacting with the users table.
class UserModel {
  private sequelize: Sequelize;

  constructor(sequelizeInstance: Sequelize) {
    // Initializes the UserModel with the defined schema.
    // Requirements Addressed:
    // - User Data Management
    //   Location: SYSTEM ARCHITECTURE/Database Server
    this.sequelize = sequelizeInstance;
    this.initializeModel();
  }

  private initializeModel(): void {
    // Defines the UserSchema with fields and constraints.
    // Globals:
    // - UserSchema: Includes fields like id, username, password, email, and role.
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'users',
        sequelize: this.sequelize,
      }
    );
  }

  // Creates a new user record in the database.
  // Requirements Addressed:
  // - User Data Management
  //   Location: SYSTEM ARCHITECTURE/Database Server
  public async createUser(userData: Partial<UserAttributes>): Promise<User> {
    try {
      // Validate the user data using Validator utilities.
      if (!validateEmail(userData.email)) {
        throw new Error('Invalid email address.');
      }
      if (!validatePassword(userData.password)) {
        throw new Error('Invalid password.');
      }

      // Hash the password before storing it in the database.
      const hashedPassword = this.hashPassword(userData.password);

      // Use Sequelize to create a new user record with the provided data.
      const user = await User.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'parent',
      });

      // Log the creation operation using the logger.
      logger.info(`User created with ID: ${user.id}`);

      // Return the created user record.
      return user;
    } catch (error) {
      // Log any errors encountered during user creation.
      logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  // Finds a user record by its ID.
  // Requirements Addressed:
  // - User Data Management
  //   Location: SYSTEM ARCHITECTURE/Database Server
  public async findUserById(userId: number): Promise<User | null> {
    try {
      // Use Sequelize to query the database for a user with the specified ID.
      const user = await User.findByPk(userId);

      // Log the query operation using the logger.
      logger.info(`Queried user with ID: ${userId}`);

      // Return the user record if found, otherwise return null.
      return user;
    } catch (error) {
      // Log any errors encountered during the query.
      logger.error(`Error finding user by ID: ${error.message}`);
      throw error;
    }
  }

  // Updates an existing user record in the database.
  // Requirements Addressed:
  // - User Data Management
  //   Location: SYSTEM ARCHITECTURE/Database Server
  public async updateUser(userId: number, updateData: Partial<UserAttributes>): Promise<User> {
    try {
      // Validate the update data using Validator utilities.
      if (updateData.email && !validateEmail(updateData.email)) {
        throw new Error('Invalid email address.');
      }
      if (updateData.password && !validatePassword(updateData.password)) {
        throw new Error('Invalid password.');
      }

      // Hash the new password if it's being updated.
      if (updateData.password) {
        updateData.password = this.hashPassword(updateData.password);
      }

      // Use Sequelize to update the user record with the specified ID.
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found.');
      }
      await user.update(updateData);

      // Log the update operation using the logger.
      logger.info(`User updated with ID: ${userId}`);

      // Return the updated user record.
      return user;
    } catch (error) {
      // Log any errors encountered during the update.
      logger.error(`Error updating user: ${error.message}`);
      throw error;
    }
  }

  // Deletes a user record from the database.
  // Requirements Addressed:
  // - User Data Management
  //   Location: SYSTEM ARCHITECTURE/Database Server
  public async deleteUser(userId: number): Promise<boolean> {
    try {
      // Use Sequelize to delete the user record with the specified ID.
      const deletedCount = await User.destroy({
        where: { id: userId },
      });

      // Log the deletion operation using the logger.
      logger.info(`User deleted with ID: ${userId}`);

      // Return true if the deletion was successful, otherwise false.
      return deletedCount > 0;
    } catch (error) {
      // Log any errors encountered during the deletion.
      logger.error(`Error deleting user: ${error.message}`);
      throw error;
    }
  }

  // Private method to hash passwords.
  private hashPassword(password: string): string {
    // Hash the password before storing it in the database.
    // This is a placeholder for actual hashing logic (e.g., using bcrypt).
    // Requirements Addressed:
    // - Secure password handling as per best practices.
    return password; // Replace with actual hashing implementation.
  }
}

export default UserModel;
export { User };