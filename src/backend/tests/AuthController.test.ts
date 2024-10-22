/**
 * Unit tests for the AuthController class, specifically testing the registration and login functionalities.
 * 
 * This file ensures that the AuthController correctly handles input validation, interacts with the AuthService,
 * and returns appropriate responses.
 * 
 * Addresses requirement:
 * - **Authentication and Authorization**: Ensures secure user authentication and management of access tokens.
 *   - Location: SECURITY CONSIDERATIONS/Authentication and Authorization
 */

// External dependencies
import request from 'supertest'; // For testing HTTP requests and responses (supertest v6.1.3)
import { jest } from '@jest/globals'; // For running unit tests and assertions (jest v26.6.3)

// Internal dependencies
import app from '../src/app'; // Express app instance
import AuthService from '../src/services/AuthService'; // Mocking authentication logic
import { validateEmail, validatePassword } from '../src/utils/Validator'; // For input validation
import { sendErrorResponse, sendSuccessResponse } from '../src/utils/ResponseHelper'; // For response handling

// Mocking the AuthService module
jest.mock('../src/services/AuthService');

describe('AuthController Tests', () => {
  /**
   * Tests the register function of AuthController for successful and failed registration scenarios.
   * 
   * Addresses requirement:
   * - **Authentication and Authorization**: Ensures secure user authentication and management of access tokens.
   *   - Location: SECURITY CONSIDERATIONS/Authentication and Authorization
   * 
   * Steps:
   * 1. Mock AuthService.registerUser to simulate user registration.
   * 2. Use supertest to send a POST request to the register endpoint.
   * 3. Assert that the response status and body match expected outcomes for both success and failure cases.
   */
  describe('POST /auth/register', () => {
    beforeEach(() => {
      // Clear mocks before each test to ensure isolation
      jest.clearAllMocks();
    });

    it('should register a new user successfully', async () => {
      // Arrange
      const mockUser = { id: 1, email: 'test@example.com' };

      // Mock input validation functions to return true, simulating valid inputs
      jest.spyOn(validateEmail, 'validateEmail').mockReturnValue(true);
      jest.spyOn(validatePassword, 'validatePassword').mockReturnValue(true);

      // Mock AuthService.registerUser to resolve with a user object
      (AuthService.registerUser as jest.Mock).mockResolvedValue(mockUser);

      // Act
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'SecurePassword123!'
        });

      // Assert
      expect(response.status).toBe(201); // HTTP 201 Created
      expect(response.body).toHaveProperty('message', 'Registration successful.');
      expect(response.body).toHaveProperty('user', mockUser);
    });

    it('should fail to register with invalid email', async () => {
      // Arrange
      // Mock validateEmail to return false, simulating invalid email format
      jest.spyOn(validateEmail, 'validateEmail').mockReturnValue(false);

      // Act
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'invalid-email',
          password: 'SecurePassword123!'
        });

      // Assert
      expect(response.status).toBe(400); // HTTP 400 Bad Request
      expect(response.body).toHaveProperty('error', 'Invalid email format.');
    });

    it('should fail to register with weak password', async () => {
      // Arrange
      // Mock validatePassword to return false, simulating weak password
      jest.spyOn(validatePassword, 'validatePassword').mockReturnValue(false);

      // Act
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: '123' // Weak password
        });

      // Assert
      expect(response.status).toBe(400); // HTTP 400 Bad Request
      expect(response.body).toHaveProperty('error', 'Password does not meet strength requirements.');
    });

    it('should handle registration errors from AuthService', async () => {
      // Arrange
      const errorMessage = 'User already exists';

      // Mock input validations to pass
      jest.spyOn(validateEmail, 'validateEmail').mockReturnValue(true);
      jest.spyOn(validatePassword, 'validatePassword').mockReturnValue(true);

      // Mock AuthService.registerUser to reject with an error
      (AuthService.registerUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'existing@example.com',
          password: 'SecurePassword123!'
        });

      // Assert
      expect(response.status).toBe(500); // HTTP 500 Internal Server Error
      expect(response.body).toHaveProperty('error', 'Registration failed.');
    });
  });

  /**
   * Tests the login function of AuthController for successful and failed login scenarios.
   * 
   * Addresses requirement:
   * - **Authentication and Authorization**: Ensures secure user authentication and management of access tokens.
   *   - Location: SECURITY CONSIDERATIONS/Authentication and Authorization
   * 
   * Steps:
   * 1. Mock AuthService.loginUser to simulate user login.
   * 2. Use supertest to send a POST request to the login endpoint.
   * 3. Assert that the response status and body match expected outcomes for both success and failure cases.
   */
  describe('POST /auth/login', () => {
    beforeEach(() => {
      // Clear mocks before each test
      jest.clearAllMocks();
    });

    it('should login a user successfully', async () => {
      // Arrange
      const mockToken = 'jwt-token';

      // Mock AuthService.loginUser to resolve with a token
      (AuthService.loginUser as jest.Mock).mockResolvedValue({ token: mockToken });

      // Act
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'SecurePassword123!'
        });

      // Assert
      expect(response.status).toBe(200); // HTTP 200 OK
      expect(response.body).toHaveProperty('message', 'Login successful.');
      expect(response.body).toHaveProperty('token', mockToken);
    });

    it('should fail to login with incorrect credentials', async () => {
      // Arrange
      const errorMessage = 'Invalid credentials';

      // Mock AuthService.loginUser to reject with an error
      (AuthService.loginUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword'
        });

      // Assert
      expect(response.status).toBe(401); // HTTP 401 Unauthorized
      expect(response.body).toHaveProperty('error', 'Invalid email or password.');
    });

    it('should handle login errors from AuthService', async () => {
      // Arrange
      const errorMessage = 'User account locked';

      // Mock AuthService.loginUser to reject with an error
      (AuthService.loginUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'locked@example.com',
          password: 'SecurePassword123!'
        });

      // Assert
      expect(response.status).toBe(403); // HTTP 403 Forbidden
      expect(response.body).toHaveProperty('error', 'User account locked.');
    });
  });
});