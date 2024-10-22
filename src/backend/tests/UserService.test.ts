/**
 * Unit tests for UserService class.
 * 
 * This test suite verifies the correctness of user-related operations such as registration,
 * login, and profile management. It ensures that the business logic in UserService is functioning
 * as expected and handles various edge cases.
 * 
 * Requirements Addressed:
 * - Testing Framework Configuration (Technical Requirements/Feature 11: Performance Optimization/TR-11.6)
 *   - Conduct automated and manual testing to ensure the quality and stability of each update before release.
 */

import jwt from 'jsonwebtoken'; // Version 8.5.1

// Internal dependencies
import UserService from '../src/services/UserService';
import UserModel from '../src/models/UserModel';
import { initializeLogger } from '../src/utils/Logger';
import { validateEmail, validatePassword } from '../src/utils/Validator';

// Mocking internal modules and functions
jest.mock('../src/models/UserModel');
jest.mock('../src/utils/Logger');
jest.mock('jsonwebtoken');

const logger = initializeLogger();

describe('UserService', () => {
  let userService: UserService;
  let userModelMock: jest.Mocked<typeof UserModel>;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Instantiate UserService
    userService = new UserService();

    // Mock UserModel
    userModelMock = UserModel as jest.Mocked<typeof UserModel>;
  });

  /**
   * Test case for registering a new user.
   * 
   * Steps:
   * 1. Mock the UserModel to simulate database interactions.
   * 2. Validate input data using validateEmail and validatePassword.
   * 3. Call UserService.registerUser with mock data.
   * 4. Assert that a new user is created and a JWT token is returned.
   * 5. Verify that the logger logs the registration operation.
   */
  describe('registerUser', () => {
    it('should register a new user and return a JWT token', async () => {
      // Step 1: Mock the UserModel.create method
      const mockUserData = {
        username: 'testUser',
        email: 'test@example.com',
        password: 'SecurePass123!',
      };
      const mockCreatedUser = {
        id: 1,
        username: 'testUser',
        email: 'test@example.com',
        password: 'hashedPassword', // Assume password is hashed
      };
      userModelMock.create = jest.fn().mockResolvedValue(mockCreatedUser);

      // Step 2: Mock validateEmail and validatePassword functions
      const validateEmailMock = jest.spyOn(require('../src/utils/Validator'), 'validateEmail').mockReturnValue(true);
      const validatePasswordMock = jest.spyOn(require('../src/utils/Validator'), 'validatePassword').mockReturnValue(true);

      // Step 3: Call UserService.registerUser with mock data
      const result = await userService.registerUser(mockUserData);

      // Step 4: Assert that a new user is created and a JWT token is returned
      expect(userModelMock.create).toHaveBeenCalledWith({
        username: mockUserData.username,
        email: mockUserData.email,
        password: expect.any(String), // Password should be hashed
      });
      expect(result).toHaveProperty('token');
      expect(typeof result.token).toBe('string');

      // Step 5: Verify that logger logs the registration operation
      expect(logger.info).toHaveBeenCalledWith('User registered successfully', { userId: mockCreatedUser.id });

      // Clean up mocks
      validateEmailMock.mockRestore();
      validatePasswordMock.mockRestore();
    });
  });

  /**
   * Test case for authenticating a user during login.
   * 
   * Steps:
   * 1. Mock the UserModel to simulate database interactions.
   * 2. Validate input data using validateEmail.
   * 3. Call UserService.loginUser with mock credentials.
   * 4. Assert that the user is authenticated and a JWT token is returned.
   * 5. Verify that the logger logs the login operation.
   */
  describe('loginUser', () => {
    it('should authenticate user and return a JWT token', async () => {
      // Step 1: Mock UserModel.findOne method
      const mockCredentials = {
        email: 'test@example.com',
        password: 'SecurePass123!',
      };
      const mockUser = {
        id: 1,
        username: 'testUser',
        email: 'test@example.com',
        password: 'hashedPassword', // Assume actual hashed password
        comparePassword: jest.fn().mockResolvedValue(true), // Mock password comparison
      };
      userModelMock.findOne = jest.fn().mockResolvedValue(mockUser);

      // Step 2: Mock validateEmail function
      const validateEmailMock = jest.spyOn(require('../src/utils/Validator'), 'validateEmail').mockReturnValue(true);

      // Step 3: Call UserService.loginUser with mock credentials
      const result = await userService.loginUser(mockCredentials);

      // Step 4: Assert that the user is authenticated and a JWT token is returned
      expect(userModelMock.findOne).toHaveBeenCalledWith({ email: mockCredentials.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith(mockCredentials.password);
      expect(result).toHaveProperty('token');
      expect(typeof result.token).toBe('string');

      // Step 5: Verify that logger logs the login operation
      expect(logger.info).toHaveBeenCalledWith('User logged in successfully', { userId: mockUser.id });

      // Clean up mocks
      validateEmailMock.mockRestore();
    });
  });

  /**
   * Test case for retrieving user profile data.
   * 
   * Steps:
   * 1. Mock the UserModel to simulate database interactions.
   * 2. Call UserService.getUserProfile with a mock user ID.
   * 3. Assert that the correct user profile data is returned.
   * 4. Verify that the logger logs the profile retrieval operation.
   */
  describe('getUserProfile', () => {
    it('should retrieve user profile data correctly', async () => {
      // Step 1: Mock UserModel.findById method
      const mockUserId = 1;
      const mockUserProfile = {
        id: mockUserId,
        username: 'testUser',
        email: 'test@example.com',
      };
      userModelMock.findById = jest.fn().mockResolvedValue(mockUserProfile);

      // Step 2: Call UserService.getUserProfile with mock user ID
      const result = await userService.getUserProfile(mockUserId);

      // Step 3: Assert that the correct user profile data is returned
      expect(userModelMock.findById).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual(mockUserProfile);

      // Step 4: Verify that logger logs the profile retrieval operation
      expect(logger.info).toHaveBeenCalledWith('User profile retrieved successfully', { userId: mockUserId });
    });
  });

  /**
   * Test case for updating user profile data.
   * 
   * Steps:
   * 1. Mock the UserModel to simulate database interactions.
   * 2. Validate input data using Validator utilities.
   * 3. Call UserService.updateUserProfile with mock data.
   * 4. Assert that the user profile is updated correctly.
   * 5. Verify that the logger logs the update operation.
   */
  describe('updateUserProfile', () => {
    it('should update user profile data correctly', async () => {
      // Step 1: Mock UserModel.findByIdAndUpdate method
      const mockUserId = 1;
      const mockUpdateData = {
        username: 'updatedUser',
        email: 'updated@example.com',
      };
      const mockUpdatedUserProfile = {
        id: mockUserId,
        username: 'updatedUser',
        email: 'updated@example.com',
      };
      userModelMock.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedUserProfile);

      // Step 2: Validate input data using Validator utilities
      const validateEmailMock = jest.spyOn(require('../src/utils/Validator'), 'validateEmail').mockReturnValue(true);

      // Step 3: Call UserService.updateUserProfile with mock data
      const result = await userService.updateUserProfile(mockUserId, mockUpdateData);

      // Step 4: Assert that the user profile is updated correctly
      expect(userModelMock.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, mockUpdateData, { new: true });
      expect(result).toEqual(mockUpdatedUserProfile);

      // Step 5: Verify that logger logs the update operation
      expect(logger.info).toHaveBeenCalledWith('User profile updated successfully', { userId: mockUserId });

      // Clean up mocks
      validateEmailMock.mockRestore();
    });
  });
});