// src/admin_interface/src/pages/LoginPage.tsx

// External Dependencies
import React, { useState } from 'react'; // React version 17.0.2
import styled from 'styled-components';  // styled-components version 5.3.3

// Internal Dependencies
import AuthService from '../services/AuthService';          // Handles user login and session management.
import { validateInput } from '../utils/Validator';         // Validates user input for the login form.
import logger from '../utils/Logger';                       // Logs login attempts and errors.
import GlobalStyles from '../styles/GlobalStyles';          // Applies consistent styling to the login page.

// Description:
// This file defines the LoginPage component for the admin interface, providing a user interface for administrators to log in.
// It integrates authentication services and handles user input validation.

// Requirements Addressed:
// - Authentication Management
//   Location: Technical Specification > System Components > Security Management
//   Description: Ensures secure authentication processes for admin users, including login, logout, and session management.

// Apply global styles using GlobalStyles.
const GlobalStyle = GlobalStyles;

// Styled Components for the Login Page.
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginForm = styled.form`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 320px;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  color: #333333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 8px;
  margin-bottom: 16px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 8px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

// LoginPage Component
const LoginPage: React.FC = () => {
  // Define state variables for managing username, password, and error messages.
  const [username, setUsername] = useState<string>('');       // Manages username input state.
  const [password, setPassword] = useState<string>('');       // Manages password input state.
  const [errorMessage, setErrorMessage] = useState<string>(''); // Stores error messages for display.

  // Event handler for form submission.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Step: Validate user input using validateInput utility.
    // Addresses input validation as per TR-7.1 in Technical Specification > System Components > Security Management.
    const isUsernameValid = validateInput(username);
    const isPasswordValid = validateInput(password);

    if (!isUsernameValid || !isPasswordValid) {
      setErrorMessage('Please enter a valid username and password.');

      // Log invalid login attempt due to input validation failure.
      // Addresses logging requirements in Authentication Management.
      logger.warn('Invalid login attempt due to input validation failure.');
      return;
    }

    try {
      // Step: Use AuthService to authenticate the user upon form submission.
      // Addresses secure authentication processes as per TR-7.1.
      const response = await AuthService.login(username, password);

      if (response.success) {
        // Successful authentication; redirect to DashboardPage.
        window.location.href = '/dashboard';
      } else {
        // Failed authentication; display error message.
        setErrorMessage('Invalid username or password.');

        // Log failed login attempt with invalid credentials.
        logger.warn(`Failed login attempt for username: ${username}`);
      }
    } catch (error) {
      // Handle errors during authentication process.
      setErrorMessage('An error occurred during login. Please try again later.');

      // Log error details for auditing purposes.
      logger.error('Error during login attempt:', error);
    }
  };

  // Event handler for username input changes.
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // Event handler for password input changes.
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Render the login page interface.
  return (
    <>
      {/* Apply global styles to the page. */}
      <GlobalStyle />

      {/* Login container holding the form. */}
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Admin Login</Title>

          {/* Display error message if present. */}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

          {/* Username input field with validation. */}
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />

          {/* Password input field with validation. */}
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          {/* Submit button to initiate authentication. */}
          <SubmitButton type="submit">Login</SubmitButton>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

// Export the LoginPage component for use in the application.
export default LoginPage;