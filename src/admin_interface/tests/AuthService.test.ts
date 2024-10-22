/**
 * Unit tests for AuthService.
 * Requirements addressed:
 * - Authentication Testing (Technical Specification/System Components/Testing)
 *   Ensures that the authentication services are thoroughly tested for reliability and correctness.
 */

// Internal dependencies
import AuthService from '../src/services/AuthService';
import { API_BASE_URL } from '../src/utils/Constants';
import logger from '../src/utils/Logger';
import validateInput from '../src/utils/Validator';

// External dependencies
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // version 1.18.2

// Initialize MockAdapter instance to mock AuthService's HTTP client requests
let mock: MockAdapter;

beforeAll(() => {
  // Create a new instance of MockAdapter attached to AuthService's HTTP client
  mock = new MockAdapter(AuthService.authClient);
});

afterEach(() => {
  // Reset mock after each test to ensure isolation between tests
  mock.reset();
});

afterAll(() => {
  // Restore the original HTTP client after all tests are completed
  mock.restore();
});

describe('AuthService', () => {
  /**
   * Tests the login functionality of AuthService.
   * Requirements addressed:
   * - Authentication Testing (Technical Specification/System Components/Testing)
   * Steps:
   * 1. Set up mock response for successful login.
   * 2. Call AuthService.login with valid credentials.
   * 3. Assert that the login function returns the expected authentication token.
   * 4. Verify that the correct API endpoint was called.
   */
  test('testLogin', async () => {
    // Valid credentials for testing
    const validCredentials = {
      username: 'adminUser',
      password: 'SecurePassword123!'
    };

    // Ensure test data is valid before being used in tests
    validateInput(validCredentials);

    // Expected authentication token returned from the API
    const expectedToken = 'mocked-jwt-token';

    // Step 1: Set up mock response for successful login
    mock.onPost(`${API_BASE_URL}/auth/login`).reply(200, {
      token: expectedToken
    });

    // Step 2: Call AuthService.login with valid credentials
    const token = await AuthService.login(validCredentials.username, validCredentials.password);

    // Step 3: Assert that the login function returns the expected authentication token
    expect(token).toBe(expectedToken);

    // Step 4: Verify that the correct API endpoint was called
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe(`${API_BASE_URL}/auth/login`);

    // Log test execution details
    logger.info('testLogin passed successfully.');
  });

  /**
   * Tests the logout functionality of AuthService.
   * Requirements addressed:
   * - Authentication Testing (Technical Specification/System Components/Testing)
   * Steps:
   * 1. Set up mock response for successful logout.
   * 2. Call AuthService.logout with a valid token.
   * 3. Assert that the logout function completes without errors.
   * 4. Verify that the correct API endpoint was called.
   */
  test('testLogout', async () => {
    // Valid token for testing logout functionality
    const validToken = 'mocked-jwt-token';

    // Step 1: Set up mock response for successful logout
    mock.onPost(`${API_BASE_URL}/auth/logout`).reply(200);

    // Step 2: Call AuthService.logout with a valid token
    await AuthService.logout(validToken);

    // Step 3: Assert that the logout function completes without errors
    // Since logout may not return a value, we check that no exceptions are thrown
    expect(mock.history.post.length).toBe(1);

    // Step 4: Verify that the correct API endpoint was called
    expect(mock.history.post[0].url).toBe(`${API_BASE_URL}/auth/logout`);

    // Log test execution details
    logger.info('testLogout passed successfully.');
  });
});